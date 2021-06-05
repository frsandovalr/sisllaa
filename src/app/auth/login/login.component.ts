import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent  {

  public formSubmitted = false;

  public loginForm = this.fb.group({
    username: [localStorage.getItem('username') || '', Validators.required],
    password: ['', Validators.required],
    remember: [false]
  });

  constructor(private router: Router,
              private fb: FormBuilder,
             private usuarioService: UsuarioService) { }
  
  login() {

    console.log(this.loginForm.value);
  if (this.loginForm.value['username'] == '' || this.loginForm.value['password'] == '' ) {
    Swal.fire('Error Login', `Usuario o password vacios` , 'error');
    return;
  } else {

    if (this.loginForm.value['remember']) {
      localStorage.setItem('username', this.loginForm.value['username']);
     } else {
       localStorage.removeItem('username');
    }
 
     this.usuarioService.login(this.loginForm.value).subscribe((data: any) => {
       let payload = JSON.parse(atob(data.access_token.split(".")[1]));
     //  console.log(data);
     //  console.log( payload);
       Swal.fire('Login', `Bienvenido ${payload.user_name}, ha iniciado sesion con exito` , 'success');
       this.router.navigateByUrl('/');
     }, err => {
      console.log(err);
      if (err.status == 400) {
        Swal.fire('Error Login', `Usuario o password incorrectos!` , 'error');
      }
    });
  }

  
  }
    // gracias cristian
   // queda
    


    /* this.usuarioService.login(this.loginForm.value)
      .subscribe(resp => {

       if (this.loginForm.get('remember').value) {
          localStorage.setItem('username', this.loginForm.get('username').value);
        }else {
          localStorage.removeItem('username');
        }


        //  Swal.fire('Login', 'Bienvenido','success');
        // this.router.navigateByUrl('/');

      }, err => {
        if (err.status == 400) {
          Swal.fire('Error de Login', 'Datos incorrectos', 'error');
        }
      }); */

  
  
}


