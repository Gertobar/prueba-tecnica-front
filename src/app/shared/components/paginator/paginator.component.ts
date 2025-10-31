import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'paginator-nav',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Input() paginador: any;
  @Input() nombre?: string;
  paginas?: number[];
  desde?: number;
  hasta?: number;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['paginador'] && this.paginador) {
      console.log(this.paginador);
      this.initPaginator();
    }
  }
  private initPaginator(): void {
    const total = this.paginador.totalPages;
    const actual = this.paginador.number + 1; // Si `number` es índice base 0

    const rango = 5;
    const mitad = Math.floor(rango / 2);

    this.desde = Math.max(1, actual - mitad);
    this.hasta = Math.min(total, actual + mitad);

    if (total > rango) {
      if (this.hasta - this.desde < rango - 1) {
        if (this.desde === 1) {
          this.hasta = rango;
        } else if (this.hasta === total) {
          this.desde = total - (rango - 1);
        }
      }
    } else {
      this.desde = 1;
      this.hasta = total;
    }

    this.paginas = new Array(this.hasta! - this.desde + 1).fill(0).map((_v, i) => this.desde! + i);
  }
}
