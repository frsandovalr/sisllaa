import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
//Modulos
import { SharedModule } from '../shared/shared.module';

//Componentes
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistarExperienciaComponent } from './registro/registar-experiencia/registar-experiencia.component';
import { RevisarExperienciaComponent } from './registro/revisar-experiencia/revisar-experiencia.component';
import { UsuarioComponent } from './mantenimiento/usuario/usuario.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';




@NgModule({
  declarations: [
    DashboardComponent,
    RegistarExperienciaComponent,
    RevisarExperienciaComponent,
    UsuarioComponent,
    PagesComponent,
    AccountSettingsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    DashboardComponent,
    RegistarExperienciaComponent,
    RevisarExperienciaComponent,
    UsuarioComponent,
    PagesComponent,
    AccountSettingsComponent,
  ]
})
export class PagesModule { }
