import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
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
  public username: string | undefined ;
  public imgUrl: string | undefined ;

  constructor( private sidebarService: SidebarService,
               private authService: AuthService,
               private usuarioService: UsuarioService) { 

    this.menuItems = sidebarService.menu;

    usuarioService.usuario.subscribe(data=>{
      //this.usuario = data;
      this.username = data.username;
      this.imgUrl = data.fotoUrl;
    //  console.log(this.imgUrl);
    })
  }


  ngOnInit(): void {
  }

  logout() {

    const user = localStorage.getItem('token');
    if (user) {
      let payload = JSON.parse(atob(user.split(".")[1]));
       Swal.fire('Adios',`Bye:  ${payload.User}, has cerrado sesion con exito`,'info');
       this.authService.logout();
    }

  }
}
