import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
  constructor (private usuarioService: UsuarioService, 
               private router: Router) {

  }
 
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
     // console.log(' paso el canActive del Guard');
    

    if (this.usuarioService.isAuthenticated()) {
      return true;
    } else {
      
      this.router.navigateByUrl('/login');
      return false;
    }

  }
  
}
