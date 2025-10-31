import { Component, inject, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { HttpErrorResponse } from '@angular/common/http';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Circular } from '../../../../../../models/coactivas/circular.model';
import { CircularService } from '../../../../../core/services/coactivas/circular.service';

@Component({
  selector: 'app-modal-circular',
  templateUrl: './modal-circular.component.html',
  styleUrls: ['./modal-circular.component.css']
})
export class ModalCircularComponent implements OnDestroy {
  public titulo: string = 'Circular';
  form!: FormGroup;
  fileState = {
    selectedFile: null as File | null,
    isDragging: false
  };
  dateState = {
    minDate: { year: 1900, month: 1, day: 1 } as NgbDateStruct,
    selectedDate: null as NgbDateStruct | null,
    today: inject(NgbCalendar).getToday()
  };
  messages = {
    success: '',
    error: ''
  };
  readonly userId = 1; // Should come from auth service

  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private circularService: CircularService,
    @Inject(MAT_DIALOG_DATA) public data: { circular: Circular | null },
    private dialogRef: MatDialogRef<ModalCircularComponent>
  ) {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      // Add your form controls here if needed
    });
  }

  onSubmit(): void {
    if (!this.isFormValid()) {
      this.messages.error = '⚠️ Por favor, seleccione un archivo válido y una fecha.';
      return;
    }

    const fechaString = this.formatDate(this.dateState.selectedDate!);
    const subscription = this.circularService
      .analyzeAndSavePdf(this.fileState.selectedFile!, fechaString, this.userId)
      .subscribe({
        next: () => this.handleSuccess(),
        error: (error) => this.handleError(error)
      });

    this.subscriptions.push(subscription);
  }

  private isFormValid(): boolean {
    return !!this.fileState.selectedFile &&
           !!this.dateState.selectedDate &&
           this.isValidDate(this.dateState.selectedDate);
  }

  private handleSuccess(): void {
    this.messages = {
      success: '✅ PDF procesado y guardado correctamente.',
      error: ''
    };
    this.resetForm();
    setTimeout(() => this.messages.success = '', 2000);
  }

  private handleError(error: HttpErrorResponse): void {
    const errorCode = error.status || '9999';
    this.messages = {
      success: '',
      error: `⚠️ Código ${errorCode}: ${error.message || 'Error inesperado'}`
    };
    setTimeout(() => this.messages.error = '', 7000);
  }

  private resetForm(): void {
    this.fileState = {
      selectedFile: null,
      isDragging: false
    };
    this.dateState.selectedDate = null;
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  // File handling methods
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.fileState.selectedFile = input.files?.[0] || null;
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.fileState.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.fileState.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.fileState.isDragging = false;
    this.fileState.selectedFile = event.dataTransfer?.files?.[0] || null;
  }

  // Date handling
  private formatDate(date: NgbDateStruct): string {
    const day = date.day.toString().padStart(2, '0');
    const month = date.month.toString().padStart(2, '0');
    return `${day}/${month}/${date.year}`;
  }

  private isValidDate(date: NgbDateStruct | null): boolean {
    if (!date) return false;
    const { year, month, day } = date;

    if (year < 1925 || month < 1 || month > 12 || day < 1 || day > 31) return false;

    const maxDays = new Date(year, month, 0).getDate();
    return day <= maxDays;
  }

  public dismiss() {
    this.dialogRef.close('Closed');
  }

  // Dialog controls
  closeDialog(confirm: boolean): void {
    this.dialogRef.close(confirm);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
