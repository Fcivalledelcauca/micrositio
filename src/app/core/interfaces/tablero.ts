export interface Tablero {
    idTablero: number;
    lote: string;
    nombre: string;
    activo: boolean | null;
}  

export interface TableroDisplay {
    lote: string;
    nombre: string;
    activo: boolean | null;
}  