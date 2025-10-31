import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Solicitud } from '../../../../models/solicitudes/solicitud.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  private baseUrl = 'http://localhost:8005/api/solicitudes'; // Ajusta si tu backend tiene otro endpoint

  constructor(private http: HttpClient) { }

  // Obtener todas las solicitudes
  getAll(): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(this.baseUrl);
  }

  // Obtener una solicitud por ID
  getById(id: number): Observable<Solicitud> {
    return this.http.get<Solicitud>(`${this.baseUrl}/${id}`);
  }

  // Crear nueva solicitud
  create(solicitud: Solicitud): Observable<Solicitud> {
    return this.http.post<Solicitud>(this.baseUrl, solicitud);
  }

  // Actualizar solicitud
  update(id: number, solicitud: Solicitud): Observable<Solicitud> {
    return this.http.put<Solicitud>(`${this.baseUrl}/${id}`, solicitud);
  }

  // Eliminar solicitud
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Aprobar solicitud
  aprobar(id: number, aprobadoPor: string): Observable<Solicitud> {
    return this.http.put<Solicitud>(`${this.baseUrl}/${id}/aprobar?aprobadoPor=${aprobadoPor}`, {});
  }

  // Rechazar solicitud
  rechazar(id: number, aprobadoPor: string): Observable<Solicitud> {
    return this.http.put<Solicitud>(`${this.baseUrl}/${id}/rechazar?aprobadoPor=${aprobadoPor}`, {});
  }
}
