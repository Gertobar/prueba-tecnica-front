import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { CoactivaListComponent } from './administracion/coactivas/coactiva-list/coactiva-list.component';
import { CircularPageComponent } from './administracion/circular/create-coactiva/circular-page/circular-page.component';
import { SolicitudListComponent } from './administracion/solicitud/solicitud-list/solicitud-list.component';



const routes: Routes = [
  {
    path: 'dashboard', component: PagesComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: {
          titulo: 'Dashboard'
        }
      },
      {
        path: 'administracion/coactivas',
        component: CoactivaListComponent,
        data: {
          titulo: 'coactivas'
        }
      },
      {
        path: 'administracion/solicitud',
        component: SolicitudListComponent,
        data: {
          titulo: 'solicitud'
        }
      },
      // {
      //   path: 'administracion/solicitud/solicitudPage/:id',
      //   component: CircularPageComponent,
      //   data: {
      //     titulo: 'Solicitud Detalle'
      //   }
      // }
    ]
  }

];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
