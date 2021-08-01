import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
  constructor (private authService: AuthService, 
               private router: Router,
              private usuarioService: UsuarioService) {

  }
 
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
     // console.log(' paso el canActive del Guard');
    

    if (this.authService.isAuthenticated()) {
      this.usuarioService.guardarUsuarioLogueado();
      return true;
    } else {
      
      this.router.navigateByUrl('/login');
      return false;
    }

  }
  
}
