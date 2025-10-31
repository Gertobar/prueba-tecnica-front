import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-header-form',
  templateUrl: './modal-header-form.component.html',
  styleUrls: ['./modal-header-form.component.css']
})
export class ModalHeaderFormComponent {
  @Input() titulo: string = '';
  @Input() tamanoTitulo: 'h3' | 'h4' | 'h5' | 'h6' = 'h4'; // Incluye h3 como opción
  @Input() mostrarCerrar: boolean = true;
  @Input() estiloPersonalizado: string = ''; // Para clases CSS adicionales

  @Output() dismiss = new EventEmitter<void>();

  dismissEvent(): void {
    this.dismiss.emit();
  }
}
