import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../guards/auth.guard";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { UsuarioComponent } from "./mantenimiento/usuario/usuario.component";
import { PagesComponent } from "./pages.component";
import { RegistarExperienciaComponent } from "./registro/registar-experiencia/registar-experiencia.component";
import { RevisarExperienciaComponent } from "./registro/revisar-experiencia/revisar-experiencia.component";

const routes: Routes = [
    {
    path: 'principal', 
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', component: DashboardComponent, data: {titulo: 'Bienvenida'}},
      {path: 'registraExperiencia', component: RegistarExperienciaComponent, data: {titulo: 'Registra Experiencia'}},
      {path: 'revisaExperiencia', component: RevisarExperienciaComponent, data: {titulo: 'Revisa Experiencia'}},
      {path: 'usuario', component: UsuarioComponent, data: {titulo: 'Usuarios'}},
      {path: 'temaUsuario', component: AccountSettingsComponent, data: {titulo: 'Ajuste de Tema'}},
      //
    ]
},

];

@NgModule({
    imports: [ RouterModule.forChild ( routes) ],
    exports: [ RouterModule]
  })
  export class PagesRoutingModule { }