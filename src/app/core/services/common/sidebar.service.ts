import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private readonly menuBase: any[] = [
    {
      titulo: 'Dashboard',
      url: '/dashboard',
      icono: 'nav-icon fas fa-tachometer-alt',
      // Este ítem no tiene submenú ni la propiedad isOpen
    },
    {
      titulo: 'Funciones Solicitud',
      url: '/dashboard/administracion',
      icono: 'fa fa-file-pen',
      isOpen: false, // Aquí sí agregamos isOpen porque tiene submenú
      submenu: [
        { titulo: 'Solicitudes', url: 'solicitud', icono: 'fa fa-cubes' },
      ]
    },
  ];

  menu: any[] = [];

  constructor() {
    this.menu = [...this.menuBase];
  }

}
