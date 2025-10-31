import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent }  // Ruta predeterminada para el LoginComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)  // Configuración de rutas del módulo secundario
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
