export interface MuncipioTema{
    idMunicipioTema     :number;
    idMunicipio         :number;
    idTema              :number;
    activo              :boolean;
}

export interface MuncipioTemaDisplay{
    idMunicipioTema     :number;
    idMunicipio         :number;
    idTema              :number;
    activo              :boolean;
    municipio           :string;
    tema                :string
}