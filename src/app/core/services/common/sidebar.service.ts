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
        { titulo: 'Circular', url: 'circular', icono: 'fa fa-cubes' },
        { titulo: 'Solicitudes', url: 'solicitides', icono: 'fa fa-cubes' },
      ]
    },
    {
      titulo: 'Configuracion',
      url: '/dashboard/configuracion',
      icono: 'fa fa-gear',
      isOpen: false, // Aquí también tiene isOpen por el submenú
      submenu: [
        { titulo: 'Tags', url: 'tags', icono: 'fa fa-cubes' },
        { titulo: 'Recursos', url: 'resources', icono: 'fa fa-cubes' },
        { titulo: 'Repositorios', url: 'repositories', icono: 'fa fa-cubes' },
        { titulo: 'Juegos', url: 'games', icono: 'fa fa-cubes' },
      ]
    },
    {
      titulo: 'Seguridad',
      url: '/dashboard/seguridad',
      icono: 'fa fa-unlock-keyhole',
      isOpen: false, // Aquí también tiene isOpen por el submenú
      submenu: [
        { titulo: 'Tags', url: 'tags', icono: 'fa fa-cubes' },
        { titulo: 'Recursos', url: 'resources', icono: 'fa fa-cubes' },
        { titulo: 'Repositorios', url: 'repositories', icono: 'fa fa-cubes' },
        { titulo: 'Juegos', url: 'games', icono: 'fa fa-cubes' },
      ]
    }
  ];

  menu: any[] = [];

  constructor() {
    this.menu = [...this.menuBase]; // Inicializa el menú
  }

}
