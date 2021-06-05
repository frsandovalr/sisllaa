import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Modulo
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

//Componentes
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

const routes: Routes =[
  // path: '/principal' PagesRouting
  // path: '/auth' AuthRouting
  {path: '', redirectTo: '/principal', pathMatch: 'full'},
  {path: '**', component: NopagefoundComponent},
];

@NgModule({
  imports: [   
    RouterModule.forRoot ( routes ),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule ]
})
export class AppRoutingModule { }
