import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { Observable, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UsuarioForm } from '../interface/usuario-form.interface';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';
import { ChangePasswordForm } from '../interface/changePassword-form.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //public usuarioDto: Usuario = new Usuario();

  usuario: Subject<Usuario> = new Subject<Usuario>()
  mensaje: Subject<String> = new Subject<String>()

  //private httpHeaders = new HttpHeaders ({'Content-Type':'application/json'});

  constructor(private http: HttpClient,
    private router: Router,
    private authService: AuthService) { }


  /*
  private agregarAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
       return this.httpHeaders.append('Authorization','Bearer ' + token);
    }
    return this.httpHeaders;
  }
    */
  private isNoAutorizado(e: any): boolean {
    if (e.status == 401) {
      if (this.authService.isAuthenticated()) {
        this.authService.logout();
      }
      this.router.navigate(['/login'])
      return true;
    }
    if (e.status == 403) {

      this.router.navigate(['/principal'])
      return true;
    }
    return false
  }

  cargarUsuarios(page: number = 0) {
    const url = `http://localhost:8080/sisllaa/usuariosDTOs/page/${page}`;

    return this.http.get(url)
      .pipe(
        map((resp: any) => {
          (resp.content as Usuario[]).map(usuario => {
            //  usuario.username = usuario.username.toUpperCase();
            return usuario;
          });
          return resp;
        })
      )
      .pipe(
        catchError(e => {
          if (this.isNoAutorizado(e)) {
            return throwError(e);
          }
          if (e.status == 400) {
            return throwError(e);
          }
          console.error(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })


      );
  }


  cargarUsuarios1() {
    const url = `http://localhost:8080/sisllaa/usuarios`;
    return this.http.get(url).pipe(
      map(resp => resp as Usuario[]
      )
    )
  }



  getUsuario(id: number) {

    const url = `http://localhost:8080/sisllaa/usuario`
    return this.http.get(`${url}/${id}`)
      .pipe(
        catchError(e => {
          if (this.isNoAutorizado(e)) {
            return throwError(e);
          }
          if (e.status == 400) {
            return throwError(e);
          }
          console.error(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })

      );

  }

  //http://localhost:8080/sisllaa/usuarioDTO/541
  getUsuarioDto(id: number) {

    const url = `http://localhost:8080/sisllaa`
    return this.http.get<Usuario>(`${url}/usuarioDTO/${id}`)
      .pipe(
        catchError(e => {
          if (this.isNoAutorizado(e)) {
            return throwError(e);
          }
          if (e.status == 400) {
            return throwError(e);
          }
          console.error(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })

      );

  }

  crearUsuario(formData: UsuarioForm) {

    //http://localhost:8080/sisllaa/usuario    
    console.log('creando usuario');
    return this.http.post(`${base_url}/usuario`, formData)
      .pipe(
        catchError(e => {
          if (this.isNoAutorizado(e)) {
            return throwError(e);
          }
          if (e.status == 400) {
            return throwError(e);
          }
          console.error(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })


      );
  }

  actualizarUsuario(formData: UsuarioForm) {
    // console.log('actualizando usuario');
    const id = formData.id;
    formData.cargo.toUpperCase
    return this.http.put(`${base_url}/usuario/${id}`, formData)
      .pipe(
        catchError(e => {
          if (this.isNoAutorizado(e)) {
            return throwError(e);
          }
          if (e.status == 400) {
            return throwError(e);
          }
          console.error(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })


      );
  }

  
  actualizarPassword(formData: ChangePasswordForm) {
    // console.log('actualizando usuario');
    const id = formData.id;
    
    return this.http.put(`${base_url}/usuario/password/${id}`, formData)
      .pipe(
        catchError(e => {
          if (this.isNoAutorizado(e)) {
            return throwError(e);
          }
          if (e.status == 400) {
            return throwError(e);
          }
          console.error(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })


      );
  }

  eliminarUsuario(id: number) {
    return this.http.delete(`${base_url}/usuario/${id}`)
      .pipe(
        catchError(e => {
          if (this.isNoAutorizado(e)) {
            return throwError(e);
          }
          if (e.status == 400) {
            return throwError(e);
          }
          console.error(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  guardarUsuarioLogueado() {
    let payload = JSON.parse(atob(this.authService.token.split(".")[1]));
    //console.log(payload);
    this.getUsuarioDto(payload.Id).subscribe((resp: any) => {
      // console.log(resp);
      const { apellidosNombres, arma, brigada, cargo, cip, dependencia, foto = '', grado, id, nucleo, username } = resp;
      //this.usuarioDto = new Usuario(nucleo, brigada, dependencia, payload.authorities, id, apellidosNombres, grado, '', cargo, arma, foto, cip, true, '', username, '');
      //console.log(this.usuarioDto);
      this.usuario.next(new Usuario(id,nucleo, brigada, dependencia, payload.authorities,  apellidosNombres, grado, '', cargo, arma, foto, cip, true, '', username, ''));
      this.mensaje.next('En el otro compponete')
    }), catchError(error => {
      return throwError(error);
    });

    //console.log(User);
  }


 

}
