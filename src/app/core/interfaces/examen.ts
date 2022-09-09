export interface Examen{
    IdExamen        :number;
    IdTema          :number;
    Tema            :string;
    Nombre          :string;
    Puntuacion      :number;
    Instrucciones   :string;
    Activo          :boolean;
}

export interface ExamenBD{
    IdExamen        :number;
    IdTema          :number;
    Nombre          :string;
    Puntuacion      :number;
    Instrucciones   :string;
    Activo          :boolean;
}