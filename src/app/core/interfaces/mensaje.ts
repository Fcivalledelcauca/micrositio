export interface MmMensaje {
    idMensaje: number;
    nombre: string;
    idMunicipio: number;
    email: string;
    telefono: string;
    mensaje: string;
    tC: boolean;
}

export interface MensajeDisplay {
    idMensaje: number;
    nombre: string;
    idMunicipio: number;
    municipio:string;
    email: string;
    telefono: string;
    mensaje: string;
    tC: boolean;
}