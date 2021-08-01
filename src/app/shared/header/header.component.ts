import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

//  public usuario: Usuario = new Usuario(0);
  public nombre: string | undefined ;
  public username: string | undefined ;
  public imgUrl: string | undefined ;

  constructor( private authService: AuthService, private usuarioService: UsuarioService ) {
    
   usuarioService.usuario.subscribe(data=>{
      //this.usuario = data;
      this.nombre = data.apellidosNombres;
      this.username = data.username;
      this.imgUrl = data.fotoUrl;
     console.log(this.imgUrl);
    })

   }


  ngOnInit(): void {

  }
 
  logout() {

   const user = this.authService.token;
    if (user) {
      let payload = JSON.parse(atob(user.split(".")[1]));
       Swal.fire('Adios',`Bye :  ${payload.User}, has cerrado sesion con exito`,'info');
       this.authService.logout();
    }
  }

}
