
import { environment } from "src/environments/environment";
import { Brigada } from "./brigada.model";
import { Dependencia } from "./dependencia.model";
import { Nucleo } from "./nucleo.model";
import { Role } from "./rol.model";

const base_url = environment.base_url;
export class Usuario {


    constructor (
        
        public  id: number,
        public nucleo?: Nucleo,
        public brigada?: Brigada,
        public dependencia?: Dependencia,
        public roles?: Role[],
        public apellidosNombres?: string,
        public grado?: string,
        public dni?: string,
        public cargo?: string,
        public arma?: string,
        public foto?: string,
        public cip?: number,
        public enableb?: boolean,
        public password?: string,
        public username?: string,
        public usuarioRegistro?: string,
    ) {}


    // http://localhost:8080/sisllaa/uploads/img/ec7eeca1-27df-41ec-a6cb-231d4526bbb0_DSC_0098.jpg
    // /uploads/img/235d84ae-f2ad-4f81-bec8-42cbbdbe6f4f_DSC_0098.jpg
    get fotoUrl(){
        if (this.foto) {
            return `${ base_url }/uploads/img/${this.foto}`;
        } else {
            return `${ base_url }/uploads/img/default.png`;
        }
     
    }
    
}