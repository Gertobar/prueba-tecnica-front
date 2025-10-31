import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoactivaListComponent } from './administracion/coactivas/coactiva-list/coactiva-list.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalCircularComponent } from './administracion/circular/modal-circular/modal-circular.component';
import { CircularPageComponent } from './administracion/circular/create-coactiva/circular-page/circular-page.component';
import { CircularListComponent } from './administracion/circular/circular-list/circular-list.component';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    CircularListComponent,
    CoactivaListComponent,
    CircularPageComponent,
    DashboardComponent,
    ModalCircularComponent,
    PagesComponent,
  ],
  imports: [
    NgbModule,
    NgbDatepickerModule,
    NgbAlertModule,
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserModule,
  ],
  exports: [
    CircularListComponent,
    CoactivaListComponent,
    CircularPageComponent,
    ModalCircularComponent,
    DashboardComponent,
  ]
})
export class PagesModule { }
