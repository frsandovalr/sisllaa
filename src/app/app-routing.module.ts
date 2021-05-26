import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsuarioComponent } from './pages/mantenimiento/usuario/usuario.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';
import { RegistarExperienciaComponent } from './pages/registro/registar-experiencia/registar-experiencia.component';
import { RevisarExperienciaComponent } from './pages/registro/revisar-experiencia/revisar-experiencia.component';


const routes: Routes =[
   
  {
    path: '', 
    component: PagesComponent,
    children: [
      {path: 'principal', component: DashboardComponent},
      {path: 'usuario', component: UsuarioComponent},
      {path: 'registraExperiencia', component: RegistarExperienciaComponent},
      {path: 'revisaExperiencia', component: RevisarExperienciaComponent},
      {path: '', redirectTo: '/principal', pathMatch: 'full'},

    ]
  },
   
   
   {path: 'login', component: LoginComponent},
   {path: '**', component: NopagefoundComponent},
];


@NgModule({
  declarations: [],
  imports: [   
    RouterModule.forRoot ( routes ) 
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
