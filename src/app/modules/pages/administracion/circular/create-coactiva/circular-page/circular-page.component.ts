import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Circular } from '../../../../../../../models/coactivas/circular.model';
import { Location } from '@angular/common'; // ⬅️ Importar Location
import { CircularService } from '../../../../../../core/services/coactivas/circular.service';

@Component({
  selector: 'app-circular-page',
  templateUrl: './circular-page.component.html',
  styleUrl: './circular-page.component.css'
})
export class CircularPageComponent implements OnInit, OnDestroy {

  circular: Circular | null = null;
  isLoading = true;
  errorMessage: string | null = null;
  notFound = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private circularService: CircularService,
    private activatedRoute: ActivatedRoute,
    private location: Location // ⬅️ Inyectar Location
  ) { }

  ngOnInit(): void {
    this.loadCircular();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private loadCircular(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (!id || isNaN(+id)) {
      this.handleError('ID de circular inválido');
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;
    this.notFound = false;

    const sub = this.circularService.getCircularById(+id).subscribe({
      next: (circular) => {
        this.circular = circular;
        this.isLoading = false;
      },
      error: (err) => {
        if (err.status === 404) {
          this.notFound = true;
          this.errorMessage = 'La circular solicitada no fue encontrada';
        } else {
          this.errorMessage = err.message || 'Error al cargar la circular';
        }
        this.isLoading = false;
        console.error('Error:', err);
      }
    });

    this.subscriptions.push(sub);
  }

  private handleError(message: string): void {
    this.errorMessage = message;
    this.isLoading = false;
  }

  retry(): void {
    this.loadCircular();
  }

  // ⬅️ Nuevo método para volver atrás
  goBack(): void {
    this.location.back();
  }
}
