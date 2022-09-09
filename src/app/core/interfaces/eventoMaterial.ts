export interface EventoMaterial {
    idCia: number | null;
    idMunicipio: number | null;
    titulo: string | null;
    descripcion: string | null;
    fecha_Ini: string | null;
    fecha_Fin: string | null;
    todoElDia: number | null;
    colorEvento: string | null;
    imagen: string | null;
    nombreArchivo: string | null;
    direccion: string | null;
    link: string | null;
    activo: boolean | null;
    temas: Temas[];
}

interface Temas {
    idTema: number;
    nombreTema: string;
    temarios: Temarios[];
}

interface Temarios {
    idTemario: number;
    nombreTemario: string;
    archivos: ArchivosGuardados[];
}

export interface ArchivosGuardados {
    archivo: string;
    nombreArchivo: string;
}