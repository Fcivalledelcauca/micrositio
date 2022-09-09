export interface BaseMdm {
    idBaseMdm?: number;
    idTablero: number | null;
    lote: string;
    codigoDane: string;
    grupo: string;
    movilizacionRecursos: number | null;
    ejecucionRecursos: number | null;
    gobiernoAbierto: number | null;
    ordenamientoTerritorial: number | null;
    gestion: number | null;
    educacion: number | null;
    salud: number | null;
    serviciosPublicos: number | null;
    seguridadConvivencia: number | null;
    resultados: number | null;
    ajusteResultados: number | null;
    mdm: number | null;
    rankingMdm: string;
    rankingMov: string;
    rankingEjecu: string;
    rankingGob: string;
    rankingOt: string;
    rankingGestion: string;
    rankingEdu: string;
    rankingSalud: string;
    rankingServPub: string;
    rankingSeguridad: string;
    rankingResultados: string;
    activo: boolean | null;
}
  