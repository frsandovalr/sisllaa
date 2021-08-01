import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Modulos
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

//Componentes
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistarExperienciaComponent } from './registro/registar-experiencia/registar-experiencia.component';
import { RevisarExperienciaComponent } from './registro/revisar-experiencia/revisar-experiencia.component';
import { UsuarioComponent } from './mantenimiento/usuario/usuario.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { FormUsuarioComponent } from './mantenimiento/usuario/form-usuario.component';
import { TokenInterceptor } from '../interceptors/token.interceptor';
import { PerfilComponent } from './perfil/perfil.component';





@NgModule({
  declarations: [
    DashboardComponent,
    RegistarExperienciaComponent,
    RevisarExperienciaComponent,
    UsuarioComponent,
    PagesComponent,
    AccountSettingsComponent,
    FormUsuarioComponent,
    PerfilComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    HttpClientModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot()
    
  ],
  exports: [
    DashboardComponent,
    RegistarExperienciaComponent,
    RevisarExperienciaComponent,
    UsuarioComponent,
    PagesComponent,
    AccountSettingsComponent,
  ],
  providers: [
   
    
  ],
})

export class PagesModule { }
