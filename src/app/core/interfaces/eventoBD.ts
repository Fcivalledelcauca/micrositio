export interface EventoBD{
    idEvento        :number;
    idCia           :number;
    idMunicipio     :number;
    idTema          :number;
    titulo          :string;
    descripcion     :string;
    fecha_Ini       :Date;
    fecha_Fin        :Date;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
    todoElDia       :number;
    colorEvento     :string;
    imagen          :string;
    nombreArchivo   :string;
    link            :string;
    activo          :boolean;
}

export interface ImagenEvento{
    idEvento        :number;
    imagen          :File;
}