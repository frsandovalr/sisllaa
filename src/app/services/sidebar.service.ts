import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {


  menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        {titulo: 'Bienvenida', url:'/'},
        {titulo: 'Registra Experiencia', url:'registraExperiencia'},
        {titulo: 'Revisa Experiencia', url:'revisaExperiencia'},
      ]
    },
    {
      titulo: 'Mantenimiento',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        {titulo: 'Usuarios', url:'usuario'},
        {titulo: 'Perfil', url:'perfil'},
      ]
    }
  ]
  constructor() { }
}
