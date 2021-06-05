import { Component, OnInit } from '@angular/core';
//Service
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems: any[];

  constructor( private sidebarService: SidebarService,
               private usuarioService: UsuarioService) { 

    this.menuItems = sidebarService.menu;
  }

  ngOnInit(): void {
  }

  logout() {
    this.usuarioService.logout();
    Swal.fire('Bye','Ha cerrado sesion','info');
  }

}
