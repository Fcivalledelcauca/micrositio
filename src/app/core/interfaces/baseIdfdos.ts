export interface BaseIdfdos {
    idBaseIdf2?: number;
    idTablero: number | null;
    lote: string;
    tipo: string;
    grupo: string;
    dependenciaTransferencia: number | null;
    relevanciaFbkFijo: number | null;
    endeudamientoLargoPlazo: number | null;
    ahorroCorriente: number | null;
    balancePrimario: number | null;
    resultados: number | null;
    idf: number | null;
    caHolgura: number | null;
    caCapacidadEjecucionIngresos: number | null;
    caCapacidadEjecucionInversion: number | null;
    bonificacionEsfuerzoPropio: number | null;
    caGestion: number | null;
    activo: boolean | null;
}

