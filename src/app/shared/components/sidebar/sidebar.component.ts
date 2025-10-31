import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SidebarService } from '../../../core/services/common/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  menuItems: any[] = [];

  constructor(private sideBarService: SidebarService, private router: Router) {
  }

  ngOnInit(): void {
    this.loadMenu();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadMenu(): void {
    this.menuItems = this.sideBarService.menu;
    console.log(this.menuItems);
  }
  toggleMenu(item: any, event: MouseEvent): void {
    event.preventDefault(); // Evita que el enlace se active inmediatamente

    if (item.submenu?.length) {
      // Cierra otros menús antes de abrir uno nuevo
      this.menuItems.forEach(menu => {
        if (menu !== item) {
          menu.isOpen = false;
        }
      });

      // Alterna el estado del menú actual
      item.isOpen = !item.isOpen;
    } else {
      // Redirige a la URL si no tiene submenú
      this.router.navigate([item.url]);
    }
  }
}
