import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';
import { LoginForm } from '../interface/login-form.interface';
import { tap } from 'rxjs/operators';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _token!: string | null;

  constructor (private http: HttpClient, 
               private router: Router) { }

  
  public get token() : string {
   // console.log(localStorage.getItem('token')); 
    if (this._token != null) {
      return this._token;
    } else if ( this._token == null && localStorage.getItem('token') != null) {
      this._token = localStorage.getItem('token')|| '';
      return this._token;
    }
    return 'No existe Token'; 
  }
  

  login(formData: LoginForm) {
       
    const urlEndpoint = 'http://localhost:8080/oauth/token';
    const credenciales = btoa( 'angularapp'+ ':' + '12345');
    const httpHeaders = new HttpHeaders ({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization':'Basic '+ credenciales
  });
    let params = new URLSearchParams();
    params.set('grant_type','password');
    params.set('username', formData.username.toUpperCase());
    params.set('password', formData.password);
  
    return  this.http.post(urlEndpoint, params.toString(), {headers: httpHeaders})
                   //   .pipe(
                     //   tap( (resp: any) => {
                     //     console.log(resp);
                          //localStorage.setItem('token', resp.access_token);
                    //    })
                  //    )
    }

    logout(){
      this._token = null;
      localStorage.removeItem('token');
      this.router.navigateByUrl('login');
    }

    guardarToken(accessToken: string) {
      this._token = accessToken;
      localStorage.setItem('token', accessToken);
    }

   

    obtenerDatosToken(accessToken: string) {
      if (accessToken != null) {
          return JSON.parse(atob(accessToken.split(".")[1]));
      }
      return null;
    }


    isAuthenticated(): boolean {
    
      if (this.token == 'No existe Token'){
        return false 
      }
      let payload = this.obtenerDatosToken(this.token);
      //console.log(payload);
      if (payload != null && payload.user_name ) {
        return true
      } 
      return false  }    
    
  
}


