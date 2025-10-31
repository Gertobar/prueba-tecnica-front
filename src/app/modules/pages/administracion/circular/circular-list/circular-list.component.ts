import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Solicitud } from '../../../../../../models/solicitudes/solicitud.model';
import { SolicitudService } from '../../../../../core/services/solicitud/solicitud.service';

@Component({
  selector: 'app-solicitud-list',
  templateUrl: './solicitud-list.component.html',
  styleUrls: ['./solicitud-list.component.css']
})
export class SolicitudListComponent implements OnInit, OnDestroy {

  etiquetabtn: string = '+ Nueva Solicitud';
  solicitudes: Solicitud[] = [];
  paginador: any;
  private subscriptions: Subscription[] = [];
  page: number = 0;

  constructor(
    private solicitudService: SolicitudService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const sub = this.activatedRoute.paramMap.subscribe(params => {
      let page = +params.get('page')!;
      if (isNaN(page)) page = 0;
      this.page = page;
      this.loadSolicitudes();
    });
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  loadSolicitudes(): void {
    const sub = this.solicitudService.getSolicitudes(this.page)
      .pipe(tap(resp => resp.content as Solicitud[]))
      .subscribe(response => {
        this.solicitudes = response.content;
        this.paginador = response;
      });
    this.subscriptions.push(sub);
  }

  openModal(solicitud?: Solicitud): void {
    const dialogRef = this.dialog.open(ModalSolicitudComponent, {
      width: '40%',
      data: { solicitud: solicitud ?? null },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadSolicitudes();
    });
  }

  eliminarSolicitud(id: number): void {
    if (confirm('¿Está seguro de eliminar esta solicitud?')) {
      this.solicitudService.eliminarSolicitud(id).subscribe(() => {
        this.loadSolicitudes();
      });
    }
  }
}
