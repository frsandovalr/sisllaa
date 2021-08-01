import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Brigada } from 'src/app/models/brigada.model';
import { Dependencia } from 'src/app/models/dependencia.model';
import { Nucleo } from 'src/app/models/nucleo.model';
import { Persona } from 'src/app/models/persona.model';
import { Role } from 'src/app/models/rol.model';
import { Usuario } from 'src/app/models/usuario.model';
import { DependenciasService } from 'src/app/services/dependencias.service';
import { PersonaService } from 'src/app/services/persona.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styles: [
  ]
})
export class FormUsuarioComponent implements OnInit, OnChanges {


  dropdownList: any | undefined;
  dropdownListData: any;
  dropdownSettings: any;

  public usuarioForm!: FormGroup;
  public _listaNucleo: Nucleo[] | undefined;
  public _listaBrigada: Brigada[] | undefined;
  public _listaDependencia: Dependencia[] | undefined;
  
  public _usuario: Usuario[] | undefined;
  public perfil: Role = new Role;
  public nucleo: Nucleo = new Nucleo;
  public idnucleo: String = '';
  public rolesLista: any | undefined; ;
  nuevo: boolean = true;
  user: string = "";
  public formSubmitted = false;

  constructor(private fb: FormBuilder,
    private personaService: PersonaService,
    private usuarioService: UsuarioService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private depedenciasservice: DependenciasService) { }


  ngOnInit(): void {
     
    this.listarRole();
    this.cargarUsuario();
    this.cargarUsuarioNuevo();
    this.listarNucleos();

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'nombre',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All'
    };

  }


  ngOnChanges() {
   
    this.cargarUsuarioNuevo();
    this.cargarUsuario();
    this.listarNucleos();
   
    this.listarRole();

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'nombre',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All'
    };
   
  }

 
  cargarUsuarioNuevo() {

    const data = localStorage.getItem('token');
    if (data) {
      let payload = JSON.parse(atob(data.split(".")[1]));
      this.user = payload.user_name;
    }

    this.perfil = {id: 1, nombre: "ROLE_USER"};
//  console.log ( this.perfil);
    this.usuarioForm = this.fb.group({
      username: ['',[Validators.required]], 
      apellidosNombres: '',
      grado: '',
      dni: '',
      cargo: ['',[Validators.required]], 
      arma: '',
      cip: ['',[Validators.required]], 
      enabled: true,
      password: '',
      nucleo: [[],[Validators.required]],
      brigada: [[],[Validators.required]],
      dependencia: [[],[Validators.required]],
      roles: this.perfil,
      id:0, 
      usuarioRegistro: this.user, 
    });
    this.usuarioForm.patchValue({roles : [this.perfil]});
  }

  BuscarPersona() {

    let cip = this.usuarioForm.value['cip']
    if (cip) {
      this.personaService.getPersona(cip).subscribe(
        (resp: any) => {
          // console.log(resp);
          this.perfil = this.usuarioForm.value['roles'];
          console.log(this.perfil);

          this.usuarioForm.setValue({
            username: this.usuarioForm.value['username'].toUpperCase(),
            cargo: this.usuarioForm.value['cargo'].toUpperCase(),
            cip: resp.persona.id,
            apellidosNombres: resp.persona.apellidosNombres,
            grado: resp.persona.grado,
            dni: resp.persona.documento,
            arma: resp.persona.arma,
            enabled: this.usuarioForm.value['enabled'],
            nucleo: this.usuarioForm.value['nucleo'],
            brigada: this.usuarioForm.value['brigada'],
            dependencia: this.usuarioForm.value['dependencia'],
            roles: this.perfil,
            password: resp.persona.documento,
            id: this.usuarioForm.value['id'],
            usuarioRegistro: this.usuarioForm.value['usuarioRegistro'],
          })
          console.log(this.usuarioForm.value['roles'])
    
          this.usuarioForm.patchValue({
            roles : this.perfil
          })

        }, err => {
          //  console.log(err);
          if (err.status == 404) {
            Swal.fire('Error', `${err.error.msj}`, 'error');
            this.cargarUsuario();
          }
        })
    }
  }

  ///En el momento que se envia para editar el usuario
  cargarUsuario() {

    const data = localStorage.getItem('token');
    if (data) {
      let payload = JSON.parse(atob(data.split(".")[1]));
      this.user = payload.user_name;
    }
      this.activateRoute.params.subscribe(
      params => {
        let id = params['id']
        if (id) {
          this.nuevo = false; 
          
          this.usuarioService.getUsuario(id).subscribe(
            (resp: any) => {  
              this.usuarioForm.setValue({
                username: resp.usuario.username.toUpperCase(),
                apellidosNombres: resp.usuario.apellidosNombres,
                grado: resp.usuario.grado,
                dni: resp.usuario.dni,
                password: resp.usuario.dni,
                cargo: resp.usuario.cargo.toUpperCase(),
                arma: resp.usuario.arma,
                cip: resp.usuario.cip,
                enabled: resp.usuario.enabled,
                nucleo: resp.usuario.nucleo,
                brigada: resp.usuario.brigada,
                dependencia: resp.usuario.dependencia,
                roles: [resp.usuario.roles],
                id: resp.usuario.id,
                usuarioRegistro: this.user,
              });
             
              this.perfil  = resp.usuario.roles;
       //       console.log(this.perfil);
              
              this.usuarioForm.patchValue({
                roles : this.perfil
              })

              this.listarNucleos();
            }
          )
        }
      })
  }

  crearUsuario() {
    this.formSubmitted = true;
    this._usuario = [];
    console.log(this.usuarioForm.value);
    if (this.usuarioForm.invalid) {
      return;
    }
//     Reazalizar el posteo
    this.usuarioService.crearUsuario(this.usuarioForm.value)
    .subscribe ( (resp:any) => {
      console.log('usuario creado');
     console.log(resp);
      Swal.fire('Usuario Creado', `${resp.msj}`, 'success');
      this.router.navigateByUrl('/principal/usuario');

    }, (err) => {
      Swal.fire('Error', `${err.error.msj}`, 'error');
    });
  }

  actualizarUsuario() {
    this.formSubmitted = true;
    this._usuario = [];
    if (this.usuarioForm.invalid) {
      return;
    }
    this.seteandoFom();
    this.usuarioService.actualizarUsuario(this.usuarioForm.value)
    .subscribe( (resp:any) => {
    //  console.log('usuario actualizado');
    //  console.log(resp);
      Swal.fire('Usuario Actualizado', `${resp.msj}`, 'success');
      this.router.navigateByUrl('/principal/usuario');
    }, (err) => {
      Swal.fire('Error', `${err.error.msj}`, 'error');
    });
  }

  campoNovalido(campo: string): boolean {
    if( this.usuarioForm.get(campo)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  listarNucleos() {
    this._listaNucleo = [];
    this.depedenciasservice.getNucleos().subscribe(
      (data: Nucleo[]) => {
        this._listaNucleo = data;
        this.listarBrigada();

      });
  }

  listarRole() {

    this.depedenciasservice.getRoles().subscribe(
      (data: Role[]) => {
        this.rolesLista = data;
      //  console.log(this.rolesLista);
      }
    )
  }

   listarBrigada() {
    let nucleo = this.usuarioForm.value['nucleo']
    if (nucleo) {
      // console.log(nucleo.id);
      this._listaBrigada = []
      this.depedenciasservice.getBrigada(nucleo.id).subscribe(
        (data: Brigada[]) => {
          this._listaBrigada = data;
          this.listarDependencia();
        });
    }
  }

  listarDependencia() {
    let brigada = this.usuarioForm.value['brigada']
    if (brigada) {
      // console.log(brigada.id);
      this._listaDependencia = []
      this.depedenciasservice.getDependencia(brigada.id).subscribe(
        (data: Dependencia[]) => {
          this._listaDependencia = data;
        });
    }
  }

  cambioNucleo() {

    //  console.log(this.usuarioForm.value);

    this.usuarioForm.setValue({
      username: this.usuarioForm.value['username'],
      cargo: this.usuarioForm.value['cargo'],
      cip: this.usuarioForm.value['cip'],
      apellidosNombres: this.usuarioForm.value['apellidosNombres'],
      grado: this.usuarioForm.value['grado'],
      dni: this.usuarioForm.value['dni'], 
      password: this.usuarioForm.value['dni'],
      arma: this.usuarioForm.value['arma'],
      enabled: this.usuarioForm.value['enabled'],
      nucleo: this.usuarioForm.value['nucleo'],
      brigada: this.usuarioForm.value['brigada'],
      roles: this.usuarioForm.value['roles'],
      id: this.usuarioForm.value['id'],
      usuarioRegistro: this.usuarioForm.value['usuarioRegistro'],
      dependencia: [],
    })
    this.listarBrigada();
  }

  compararNucleo(o1: Nucleo, o2: Nucleo) {
    return o1 === null || o2 === null ? false : o1.id === o2.id;
  }

  compararBrigada(o1: Brigada, o2: Brigada) {

    return o1 === null || o2 === null ? false : o1.id === o2.id;
  }

  compararDependencia(o1: Dependencia, o2: Dependencia) {
   
    return o1 === null || o2 === null ? false : o1.id === o2.id;
  }

 
  onItemSelect($event: any){
    console.log('$event is ', $event); 
  }


 
  seteandoFom() {
    this.usuarioForm.setValue({
      username: this.usuarioForm.value['username'].toUpperCase(),
      cargo: this.usuarioForm.value['cargo'].toUpperCase(),
      cip: this.usuarioForm.value['cip'],
      apellidosNombres: this.usuarioForm.value['apellidosNombres'],
      grado: this.usuarioForm.value['grado'],
      dni: this.usuarioForm.value['dni'],
      password: this.usuarioForm.value['dni'],
      arma: this.usuarioForm.value['arma'],
      enabled: this.usuarioForm.value['enabled'],
      nucleo: this.usuarioForm.value['nucleo'],
      brigada: this.usuarioForm.value['brigada'],
      dependencia: this.usuarioForm.value['dependencia'],
      roles: this.usuarioForm.value['roles'],
      id: this.usuarioForm.value['id'],
      usuarioRegistro: this.usuarioForm.value['usuarioRegistro'],
    })
  }



  salir() {

    this.router.navigateByUrl('/principal/usuario');

  }
}
