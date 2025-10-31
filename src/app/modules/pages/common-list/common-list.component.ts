import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, of, Subject, takeUntil } from 'rxjs';
import { AbstractCommonListService } from '../../../core/services/common/abstract-common-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlingService } from '../../../core/services/common/error-handling.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponse } from '../../../../models/common/errorResponse';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-common-list',
  templateUrl: './common-list.component.html',
  styleUrl: './common-list.component.css'
})
export abstract class CommonListComponent<T> implements OnInit, OnDestroy {

  private readonly PAGE_SIZE = 10;
  protected modalWidth: string = '30%';
  private readonly ANIMATION_DURATION = '500ms';

  page: number = 0;
  pageSize = this.PAGE_SIZE;
  items: T[] = [];
  paginador: any;
  selectedItem?: T;
  nombre: string = '';
  etiquetabtn: string = '+ Crear Nuevo';
  searchValue: string = '';
  sortColumn: string = '';
  sortDirection: string = 'asc';
  url: string = '';
  errorMessage: string = '';

  private destroy$ = new Subject<void>();

  protected abstract getModalComponent(): any;

  constructor(
    protected dialog: MatDialog,
    protected service: AbstractCommonListService<T>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private errorHandlingService: ErrorHandlingService
  ) {
    const segments = this.activatedRoute.snapshot.pathFromRoot.map(r => r.url.map(u => u.path));
    const stringSegments = segments.map(s => s.join('/'));
    stringSegments.pop();
    this.url = stringSegments.join('/');
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.page = +params.get('page')! || 0;
      this.page = isNaN(this.page) || this.page < 0 ? 0 : this.page;
      this.obtenerListaNoEliminadaOrdenada(this.sortColumn, this.sortDirection);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private handleFetchError(error: HttpErrorResponse): void {
    this.errorHandlingService.handleError(error).subscribe({
      next: (errorResponse: ErrorResponse) => {
        this.errorMessage = errorResponse.error;
        console.error(`Error ${errorResponse.statusCode}: ${errorResponse.error}`);
      }
    });
  }

  protected fetchItems(sortColumn: string, sortDirection: string, searchValue?: string): void {
    const fetch$ = searchValue
      ? this.service.searchList(searchValue, this.page, this.pageSize)
      : this.service.getNotDeletedOrdered(this.pageSize, this.page, sortColumn, sortDirection);

    fetch$.pipe(
      takeUntil(this.destroy$),
      catchError((error: HttpErrorResponse) => {
        this.handleFetchError(error);
        return of({ content: [], statusCode: error.status }); // Incluye el código de estado en la respuesta
      })
    ).subscribe({
      next: (response: any) => {
        this.items = response?.content || []; // Protege contra respuesta vacía
        if (this.items.length === 0) {
          this.errorMessage = `Lista vacía: no se encontraron elementos. Código de error: ${response.statusCode || 'Desconocido'}`;
        } else {
          this.errorMessage = '';
        }
        this.paginador = response;
      }
    });
  }



  obtenerListaNoEliminadaOrdenada(sortColumn: string, sortDirection: string): void {
    this.fetchItems(sortColumn, sortDirection);
  }

  // searchList(): void {
  //   this.page = 0;
  //   const normalizedSearchValue = this.searchValue.trim().toLocaleUpperCase();
  //   this.fetchItems(this.sortColumn, this.sortDirection, normalizedSearchValue || undefined);
  // }

  // clearSearchField(): void {
  //   if (this.searchValue.trim() === '') {
  //     this.obtenerListaNoEliminadaOrdenada(this.sortColumn, this.sortDirection);
  //   }
  // }

  // delete(item: T): void {
  //   Swal.fire({
  //     title: '¿Está seguro?',
  //     text: `¿Está seguro que desea eliminar ${this.getItemName(item)}?`,
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Sí, eliminar',
  //     cancelButtonText: 'No, cancelar',
  //     customClass: {
  //       confirmButton: 'btn btn-success me-2',
  //       cancelButton: 'btn btn-danger me-2'
  //     },
  //     buttonsStyling: false
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.service.statusEliminado(this.getItemCode(item)).pipe(takeUntil(this.destroy$)).subscribe({
  //         next: () => {
  //           this.items = this.items.filter(i => i !== item);
  //           Swal.fire('Elemento eliminado', `Elemento ${this.getItemName(item)} marcado como eliminado con éxito.`, 'success');
  //         },
  //         error: (err: HttpErrorResponse) => {
  //           this.handleFetchError(err); // Usa el mismo método para manejar errores
  //         }
  //       });
  //     }
  //   });
  // }

  public openModal(item?: T): void {
    const dialogRef = this.dialog.open(this.getModalComponent(), {
      width: this.modalWidth,
      enterAnimationDuration: this.ANIMATION_DURATION,
      exitAnimationDuration: this.ANIMATION_DURATION,
      disableClose: true,
      data: { item }
    });

    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe({
      next: result => {
        if (result) {
          this.obtenerListaNoEliminadaOrdenada(this.sortColumn, this.sortDirection);
        }
      },
      error: (error: HttpErrorResponse) => {
        this.handleFetchError(error); // Usa el mismo método para manejar errores
      }
    });
  }

  // protected getItemName(item: T): string {
  //   return (item as any).nombre; // Cambia esto según el campo adecuado
  // }

  // protected getItemCode(item: T): any {
  //   return (item as any).codigo; // Cambia esto según el campo adecuado
  // }

  // protected abstract getModalComponent(): any;

  // toUpperCase(): void {
  //   this.searchValue = this.searchValue.toUpperCase();
  // }

  // onKeyPress(event: KeyboardEvent): void {
  //   const char = event.key;
  //   const isValidCharacter = /^[a-zA-Z0-9\s]+$/.test(char);
  //   if (!isValidCharacter) {
  //     event.preventDefault();
  //   }
  // }

  sortList(column: string): void {
    this.sortDirection = column === this.sortColumn ? (this.sortDirection === 'asc' ? 'desc' : 'asc') : 'asc';
    this.sortColumn = column;
    this.obtenerListaNoEliminadaOrdenada(this.sortColumn, this.sortDirection);
  }

  onPageSizeChange(newPageSize: number): void {
    this.pageSize = newPageSize;
    this.obtenerListaNoEliminadaOrdenada(this.sortColumn, this.sortDirection);
  }

  clearErrorMessage(): void {
    this.errorMessage = '';
  }
}

