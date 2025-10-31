import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, retry, tap, timeout } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { AppConstants } from '../../../../constants/app.constants';
import { Circular } from '../../../../models/coactivas/circular.model';



interface ApiErrorResponse {
  message: string;
  error: string;
  status: string;
  code?: string;
  details?: any;
}

@Injectable({
  providedIn: 'root'
})
export class CircularService {

  private apiUrl = `${environment.rooturl}${AppConstants.PDF_ANALYSIS_API_URL}`;
  private apiUrl2 = `${environment.rooturl}${AppConstants.CIRCULAR_API_URL}`;
  private readonly cache = new Map<number, Circular>();


  constructor(private http: HttpClient) { }

  // Analizar y guardar el PDF
  analyzeAndSavePdf(file: File, fecha: string, userId: number): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('fecha', fecha);
    formData.append('userId', userId.toString());

    return this.http.post<any>(this.apiUrl, formData).pipe(
      catchError(error => this.handleError(error))
    );
  }

  // Obtener circulares con paginación y filtros
  getCirculares(page: number, size: number, searchTerm?: string, fechaSeps?: string): Observable<{ content: Circular[], totalElements: number }> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (searchTerm) {
      params = params.set('searchTerm', searchTerm);
    }

    if (fechaSeps) {
      params = params.set('fechaSeps', fechaSeps);
    }

    return this.http.get<{ content: Circular[], totalElements: number }>(`${this.apiUrl2}/search`, { params }).pipe(
      catchError(error => {
        // Aquí manejamos el error y devolvemos un observable de error adecuado
        return this.handleError(error);
      })
    );
  }

  /**
   * Obtiene una circular por su ID con manejo de errores y caché
   * @param id ID de la circular a buscar
   * @param forceRefresh Si true, ignora la caché y fuerza una nueva solicitud
   * @returns Observable con la circular o error
   */
  getCircularById(id: number, forceRefresh = false): Observable<Circular> {
    // Validación básica del ID
    if (!id || isNaN(id) || id <= 0) {
      return throwError(() => new Error('ID de circular inválido'));
    }

    // Verificar caché si no se fuerza refresco
    if (!forceRefresh && this.cache.has(id)) {
      return of(this.cache.get(id)!);
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    return this.http.get<Circular>(`${this.apiUrl2}/find/${id}`, {
      headers,
      context: new HttpContext(), // Para almacenar metadata adicional si es necesario
      responseType: 'json'
    }).pipe(
      timeout(30000), // Timeout de 30 segundos
      retry(2), // Reintentar hasta 2 veces en caso de error
      tap(circular => {
        // Almacenar en caché
        this.cache.set(id, circular);
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'Error desconocido';
    let errorCode = 'UNKNOWN';

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
      errorCode = 'CLIENT_ERROR';
    } else {
      // Error del servidor
      errorMessage = `Código: ${error.status}\nMensaje: ${error.message}`;
      errorCode = error.status || 'SERVER_ERROR';

      // Manejo específico para errores comunes
      switch (error.status) {
        case 404:
          errorMessage = 'La circular solicitada no fue encontrada';
          break;
        case 403:
          errorMessage = 'No tiene permisos para acceder a esta circular';
          break;
        case 500:
          errorMessage = 'Error interno del servidor';
          break;
      }
    }

    console.error('Error en CircularService:', errorMessage);
    return throwError(() => ({
      code: errorCode,
      message: errorMessage,
      originalError: error
    }));
  }

  /**
   * Limpia la caché de circulares
   * @param id Si se provee, limpia solo esa circular, de lo contrario limpia toda la caché
   */
  clearCache(id?: number): void {
    if (id) {
      this.cache.delete(id);
    } else {
      this.cache.clear();
    }
  }


}
