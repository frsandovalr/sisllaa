import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [
  ]
})
export class UsuarioComponent implements OnInit {


  public usuarios: Usuario[] = [];
  public cargando: boolean = true;
  paginador: any;

  constructor(private usuarioService: UsuarioService,
    private activateRoute: ActivatedRoute, 
    private authService: AuthService) { }

  ngOnInit(): void {

    this.cargarUsuarios();



  }

  cargarUsuarios() {

    this.cargando = true;
    this.activateRoute.paramMap.subscribe(params => {

      let page: number = Number(params.get('page'));

      if (!page) {
        page = 0;
      }
      this.usuarioService.cargarUsuarios(page)
        .subscribe(resp => {
          // console.log(resp);
          this.usuarios = resp.content as Usuario[];
          this.paginador = resp;
         // console.log(resp);
          this.cargando = false;
        })

    }
    );

  }

  cambioPag(pagina: number) {
    this.usuarioService.cargarUsuarios(pagina)
      .subscribe(resp => {
        this.usuarios = resp.content as Usuario[];
        this.paginador = resp;
      })

  }

  eliminarUsuario(usuario: Usuario) {
    let user = JSON.parse(atob(this.authService.token.split(".")[1]));
    
  if (usuario.id === user.Id) {
     Swal.fire('Error','No te puedes eliminar a ti mismo','error');
  } else {
    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta a punto de borrar a ${ usuario.username}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {
        console.log(usuario.id);
       this.usuarioService.eliminarUsuario(usuario.id)
        .subscribe(resp => {

          this.cargarUsuarios();
          Swal.fire('Usuario borrado',
          `${ usuario.username} ha sido borrado`,
          'success' )
        });
      }
    })
  }

  }
}
