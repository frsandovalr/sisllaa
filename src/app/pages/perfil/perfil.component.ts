import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from 'src/app/models/rol.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public formSubmitted = false;
  public changePasswordForm!: FormGroup;
  public usuario: Usuario = new Usuario(0);
  public nucleo: string | undefined;
  public brigada: string | undefined;
  public dependencia: string | undefined;
  public roles: Role[] | undefined;
  public imagenSubir!: File;
  public imgTemp: any = null;
  
  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private authService: AuthService,
               private fileUploadService: FileUploadService) {
  
   }

  ngOnInit(): void {
    this.usuarioService.guardarUsuarioLogueado();
    this.cargaDatos();

    this.changePasswordForm = this.fb.group({
      id: this.usuario.id,
      password: ['',[ Validators.required, Validators.minLength(8)]],
      password2: ['', Validators.required],
      usuarioRegistro: this.nucleo,
    },{
      validators: this.passwordsIguales('password','password2')
    });

      }

  cargaDatos() {

    this.usuarioService.usuario.subscribe((data:Usuario)=>{ 
      this.usuario = data;  
      this.nucleo = this.usuario.nucleo?.nombreCorto;
      this.brigada = this.usuario.brigada?.nombreCorto;
      this.dependencia = this.usuario.dependencia?.nombreCorto;
      this.roles = this.usuario.roles
      this.changePasswordForm.setValue({
        id: this.usuario.id,
        password:'',
        password2:'',
        usuarioRegistro: this.usuario.username
      })
    });

      
  }

  cambiarPassword() {
    this.formSubmitted = true;
    if (this.changePasswordForm.invalid) {
      return
    } 
    //console.log('Enviando formulario');

    this.usuarioService.actualizarPassword(this.changePasswordForm.value)
    .subscribe( (resp: any) => {
      //console.log('cambiado contraseña')
      Swal.fire('Actualizado, inicie sesion nuevamente',resp.msj,'success');
      //console.log(resp);
      this.authService.logout();
    }, (err) => {
      //SI SUCEDE UN ERROR
      Swal.fire('error',err.error.msg,'error');
    })
  }
  
  passwordsNoValidos() {
    const pass1 = this.changePasswordForm.value['password'];
    const pass2 = this.changePasswordForm.value['password2'];

    if ( (pass1 !== pass2 && this.formSubmitted)  ) {
        return true;
    }else {
      return false;
    }
  }

  passwordsIguales( pass1Name: string, pass2Name: string){

    return ( formGroup: FormGroup ) =>{

      const pass1Control = formGroup.get(pass1Name) ;
      const pass2Control = formGroup.get(pass2Name) ;
   //   const pass1Control = formGroup.value['pass1Name'];
   //   const pass2Control = formGroup.value['pass2Name'];

   

      if (pass1Control?.value === pass2Control?.value){

        pass2Control?.setErrors(null)
      }else {

        pass2Control?.setErrors( {noEsIgual : true})
      }

    }
  }


//Metodo cambiar imagen
cambiarImagen( event: any) {    
  this.imagenSubir =  event.target.files[0];

  if (!event.target.files[0]) {
    this.imgTemp = null;
    return;
  }

  const reader = new FileReader();
  reader.readAsDataURL( event.target.files[0]);

  reader.onloadend = () => {
    this.imgTemp = reader.result
  }
}

  //Metodo Subir imagen imagen
  subirImagen() {

    console.log(this.usuario.id)
    this.fileUploadService
      .actualizarFoto(this.imagenSubir, this.usuario.id)
      .then(img =>  {
        this.usuarioService.guardarUsuarioLogueado();
        this.usuario.foto = img;
        Swal.fire('Guardado','Imagen de usuario actualizada','success');
      });

  }


}
