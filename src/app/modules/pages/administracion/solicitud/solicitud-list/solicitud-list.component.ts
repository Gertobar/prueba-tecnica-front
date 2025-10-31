import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { Solicitud } from '../../../../../../models/solicitudes/solicitud.model';
import { ModalSolicitudComponent } from '../modal-solicitud/modal-solicitud.component';
import { SolicitudService } from '../../../../../core/services/solicitud/solicitud.service';

@Component({
  selector: 'app-solicitud-list',
  templateUrl: './solicitud-list.component.html',
  styleUrls: ['./solicitud-list.component.css']
})
export class SolicitudListComponent implements OnInit {

  solicitudes: Solicitud[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private solicitudService: SolicitudService) {}

  ngOnInit(): void {
    this.loadSolicitudes();
  }

  loadSolicitudes(): void {
    this.isLoading = true;
    this.solicitudService.getAll().subscribe({
      next: (data) => {
        this.solicitudes = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar las solicitudes';
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  aprobarSolicitud(id: number): void {
    this.solicitudService.aprobar(id, 'Administrador').subscribe({
      next: () => this.loadSolicitudes(),
      error: (err) => console.error(err)
    });
  }

  rechazarSolicitud(id: number): void {
    this.solicitudService.rechazar(id, 'Administrador').subscribe({
      next: () => this.loadSolicitudes(),
      error: (err) => console.error(err)
    });
  }

  verDetalles(solicitud: Solicitud): void {
  console.log('Ver detalles de solicitud:', solicitud);
  // Puedes abrir un modal o navegar a otra ruta
}

  eliminarSolicitud(id: number): void {
    if (confirm('¿Deseas eliminar esta solicitud?')) {
      this.solicitudService.delete(id).subscribe({
        next: () => this.loadSolicitudes(),
        error: (err) => console.error(err)
      });
    }
  }
}
