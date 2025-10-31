import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from '../../../../models/empleados/empleado.model';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private apiUrl = 'http://localhost:8005/api/empleados'; // Cambia al puerto y path correcto

  constructor(private http: HttpClient) { }

  // Obtener todos los empleados
  getAll(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.apiUrl);
  }

  // Obtener empleado por ID
  getById(id: number): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.apiUrl}/${id}`);
  }

  // Crear nuevo empleado
  create(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(this.apiUrl, empleado);
  }

  // Actualizar empleado existente
  update(id: number, empleado: Empleado): Observable<Empleado> {
    return this.http.put<Empleado>(`${this.apiUrl}/${id}`, empleado);
  }

  // Eliminar empleado
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
