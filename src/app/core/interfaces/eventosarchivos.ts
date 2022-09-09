export interface EventoArchivo{
     idArchivo      :number;
     idEvento       :number;
     idTema         :number;
     idTemario      :number;
     archivo        :string;
     nombreArchivo  :string;
     titulo?        :string;
     descripcion?   :string;
     file?          :File
}

export interface EventoArchivoDisplay{
    idArchivo       :number;
    idTema          :number,
    idTemario       :number,
    tema            :string;
    temario         :string;
    nombreArchvio   :string;
}