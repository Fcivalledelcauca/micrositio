import { environment } from "src/environments/environment";

const baseUrlImage = environment.base_url_image;

export class UsuarioLogin {
    constructor(
        public idPerfil?: number,
        public idCia?: number,
        public idCO?: string,
        public nombreCompleto?: string,
        public documentoIdentidad?: string,
        public telefono?: string,
        public direccion?: string,
        public email?: string,
        public municipio?: string,
        public usuario?: string,
        public imagen?: string){

    }

    get ImagenUser(){
        if(this.imagen){
            return `${this.imagen}`
        }else{
            return `${baseUrlImage}/FotosPerfiles/avartar.png`
        }

    }  

}