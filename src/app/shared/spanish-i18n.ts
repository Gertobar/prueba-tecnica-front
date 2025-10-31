import { Injectable } from '@angular/core';
import { NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


@Injectable()
export class NgbDatepickerI18nES extends NgbDatepickerI18n {

  private weekdaysShort = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb','Dom'];
  private monthsShort = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  private monthsFull = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  getWeekdayShortName(weekday: number): string {
    return this.weekdaysShort[weekday - 1]; // Ajuste de índice para que empiece en Domingo
  }

  getMonthShortName(month: number): string {
    return this.monthsShort[month - 1];
  }

  getMonthFullName(month: number): string {
    return this.monthsFull[month - 1];
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day} de ${this.getMonthFullName(date.month)} de ${date.year}`;
  }

  getWeekdayLabel(weekday: number): string {
    return this.weekdaysShort[weekday - 1];
  }
}
