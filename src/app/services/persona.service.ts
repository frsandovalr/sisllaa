
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Persona } from '../models/persona.model';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  
  private urlEndPoint: string = 'http://localhost:8080/sisllaa/personas';

  constructor(private http: HttpClient, private authService: AuthService) { }

  filtrarPersonas(term:string): Observable<Persona[]> {

    return this.http.get<Persona[]>(`${this.urlEndPoint}/filtar-personas/${term}`);

  }


  getPersona(cip: number) {
    return this.http.get(`http://localhost:8080/sisllaa/persona/${cip}`);
  }
}
