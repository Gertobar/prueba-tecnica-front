import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Importamos todos los componentes desde el index.ts
import { BreadcrumbsComponent, FooterComponent, HeaderComponent, ModalHeaderFormComponent, PaginatorComponent, SidebarComponent,} from './components';
import { ModalFooterFormComponent } from './components/modal-footer-form/modal-footer-form.component';



@NgModule({
  declarations: [
    BreadcrumbsComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    PaginatorComponent,
    ModalHeaderFormComponent,
    ModalFooterFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    BreadcrumbsComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    PaginatorComponent,
    ModalHeaderFormComponent,
    ModalFooterFormComponent,
  ]
})
export class SharedModule { }
