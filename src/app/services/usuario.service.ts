import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginForm } from '../interface/login-form.interface';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient,
    private router: Router,) { }


    get token(): string{
      return localStorage.getItem('token') || '';
    }


  login( formData: LoginForm) {

    // http://localhost:8080/oauth/token
    const urlEndpoint = 'http://localhost:8080/oauth/token';
    const credenciales = btoa( 'angularapp'+ ':' + '12345');
    const httpHeaders = new HttpHeaders ({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization':'Basic '+ credenciales
  });
    let params = new URLSearchParams();
    params.set('grant_type','password');
    params.set('username', formData.username);
    params.set('password', formData.password);
   // console.log(params.toString());
  //  console.log(httpHeaders);
   // console.log(credenciales);
    return  this.http.post(urlEndpoint, params.toString(), {headers: httpHeaders})
                      .pipe(
                        tap( (resp: any) => {
                          localStorage.setItem('token', resp.access_token);
                        })
                      )
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('login');
      
  }

  isAuthenticated(): boolean {

    let payload = this.token
    console.log(payload.length);
    if (payload.length > 0) {

      return true
    } else {
      return false
    }
    

  }

}
