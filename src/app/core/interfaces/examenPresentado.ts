import { Pregunta } from "./pregunta";

export interface ExamenPresentado {
    idExamenPresentado: number;
    usuario: string;
    idExamen: number;
    puntosMin:number;
    puntuacion: number;
    can_Ok: number;
    can_Fail:number;
    aprobo: boolean;
}

export interface RespuestaPresentada {
    idRespuestaPresentada?: number;
    idExamenPresentado?: number;
    idRespuesta?: number;
    puntos?: number;
}
//interfaces para la presentacion del examen
export interface ExamenDisplay {
    idExamen?: number;
    idTema?: number;
    nombre?: string;
    puntuacion?: number;
    instrucciones?: string;
    activo?: boolean;
    preguntas?: Preguntas[];
}

export interface Preguntas {
    idPregunta: number;
    idExamen: number;
    pregunta: string;
    puntos: number;
    respuestas: Respuestas[];
}

export interface Respuestas {
    idRespuesta: number;
    idPregunta: number;
    respuesta: string;
    correcta:number;
} 