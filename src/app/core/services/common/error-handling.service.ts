import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor() {}

  handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage: string = 'Ha ocurrido un error en el servidor';

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      switch (error.status) {
        case 400:
          errorMessage = error.error.mensaje || 'Solicitud incorrecta';
          break;
        case 404:
          errorMessage = error.error.mensaje || 'Recurso no encontrado';
          break;
        case 500:
          errorMessage = error.error.mensaje || 'Error interno del servidor';
          break;
        default:
          errorMessage = `Error ${error.status}: ${error.message}`;
      }
    }
    // Devolver un Observable con un error
    return throwError(() => new Error(errorMessage));
  }
}
