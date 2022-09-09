export interface BaseIdf {
    idBaseIdf?: number;
    idTablero: number | null;
    lote: string;
    codigoDane: string;
    municipio: string;
    caDependenciaTransferencia: number | null;
    caRelevanciaFbkFijo: number | null;
    caEndeudamientoLargoPlazo: number | null;
    caAhorroCorriente: number | null;
    caBalancePrimario: number | null;
    resultado: number | null;
    caResultado: number | null;
    caHolgura: number | null;
    caCapacidadEjecucionIngresos: number | null;
    caCapacidadEjecucioInversion:number | null;
    bonificacionEsfuerzoPropio: number | null;
    gestion: number | null;
    gestionBonos: number | null;
    caGestion: number | null;
    nuevoIdf: number | null;
    nuevoIdfSb: number | null;
    rango: string;
    activo: boolean | null;
}

    
