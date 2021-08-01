import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';


@Component({
  selector: 'paginador-nav',
  templateUrl: './paginador.component.html',
  styles: [
  ]
})
export class PaginadorComponent implements OnInit, OnChanges {

  @Input() paginador: any;
  @Output() nroPagina: EventEmitter<number> = new EventEmitter();

  paginas!: number[];
  pagina: number | undefined;

  desde: number = 0;
  hasta: number = 0;

  constructor() { }

  ngOnInit(): void {


  }

  ngOnChanges() {

    if (this.paginador.totalPages > 10) {

      this.rangoPaginas();
    } else {     
      this.obtenerTotasPag();
    }
  }

  rangoPaginas() {

    this.desde = Math.min( Math.max (1, this.paginador.number - 9), this.paginador.totalPages-10);
    this.hasta = Math.max(Math.min(this.paginador.totalPages, this.paginador.number+9),11);
   // console.log (this.desde);
   // console.log (this.hasta);

    this.paginas = new Array(this.hasta - this.desde +1).fill(0).map((_valor, indice) => indice + this.desde );
  }

  obtenerTotasPag() {

    this.paginas = new Array(this.paginador.totalPages).fill(0).map(
      (_valor, indice) => indice + 1);
    // console.log(this.paginas);

  }

  obtenerPag(pagina: number) {

    const indice = this.paginas.indexOf(pagina);
    this.nroPagina.emit(indice);
    //  console.log(indice);
  }


  sigPag(pagina: number) {

    //  console.log(pagina);
    this.nroPagina.emit(pagina);
  }


  antPag(pagina: number) {

    // console.log(pagina);
    this.nroPagina.emit(pagina);

  }

  primeraPag(pagina: number) {

    //console.log(pagina);
    this.nroPagina.emit(pagina);
  }

  ultimaPag(pagina: number) {
    // console.log(pagina);
    this.nroPagina.emit(pagina);

  }
}
