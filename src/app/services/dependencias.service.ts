import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Nucleo } from '../models/nucleo.model';
import { Brigada } from '../models/brigada.model';
import { Dependencia } from '../models/dependencia.model';
import { Role } from '../models/rol.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DependenciasService {

  public url = 'http://localhost:8080/sisllaa/';

  constructor(private http: HttpClient,
    private router: Router,
    private authService: AuthService) { }

    

getNucleos() {
  return this.http.get<Nucleo[]>(this.url+`dependencia/nucleos`);
}


getRoles(){
  return this.http.get<Role[]>(this.url+`roles`);
}

getBrigada(idNucleo: string) {
  return this.http.get<Brigada[]>(this.url+`dependencia/brigadas/${ idNucleo }`);
}

getDependencia(idBrigada: string) {
  return this.http.get<Dependencia[]>(this.url+`dependencia/dependencias/${ idBrigada }`);
}

}

