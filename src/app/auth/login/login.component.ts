import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{

  public formSubmitted = false;

  public loginForm = this.fb.group({
    username: [localStorage.getItem('username') || '', Validators.required],
    password: ['', Validators.required],
    remember: [false]
  });

  constructor(private router: Router, private fb: FormBuilder,private authService: AuthService) { }
 
  ngOnInit() {
    if(this.authService.isAuthenticated()) {
    this.router.navigateByUrl('/');
    Swal.fire('Info', `Ya has iniciado sesion.`, 'info');
    } 
   
  }
  
  login() {

    if (this.loginForm.value['username'] == '' || this.loginForm.value['password'] == '') {
      Swal.fire('Error Login', `Usuario o password vacios`, 'error');
      return;
    } else {

      if (this.loginForm.value['remember']) {
        localStorage.setItem('username', this.loginForm.value['username']);
      } else {
        localStorage.removeItem('username');
      }

      this.authService.login(this.loginForm.value).subscribe((data: any) => {
       // console.log(data);
       this.authService.guardarToken(data.access_token);
      
       // let payload = JSON.parse(atob(data.access_token.split(".")[1]));
        Swal.fire('Login', `Bienvenido:  ${data.User}, has iniciado sesion con éxito`, 'success');
        this.router.navigateByUrl('/');
      }, err => {
        if (err.status == 400) {
          Swal.fire('Error Login', `Usuario o password incorrectos!`, 'error');
        }
      });
    }
  }


}


