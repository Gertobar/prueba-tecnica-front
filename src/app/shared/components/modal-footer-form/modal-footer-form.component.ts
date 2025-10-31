import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-footer-form',
  templateUrl: './modal-footer-form.component.html',
  styleUrls: ['./modal-footer-form.component.css']
})
export class ModalFooterFormComponent {
  @Output() agregar = new EventEmitter<void>();
  @Output() close = new EventEmitter<boolean>();

  @Input() disabled = false;
  @Input() textoGuardar = 'Guardar';
  @Input() textoCerrar = 'Cerrar';

  agregarEvent(): void {
    this.agregar.emit();
  }

  closeEvent(conf: boolean): void {
    this.close.emit(conf);
  }
}
