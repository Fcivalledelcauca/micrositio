export interface Items {
    idItem:               number;
    referencia:           string;
    descripcion:          string;
    descripcionCorta:     string;
    idTipoInventario:     number;
    idUnidadMedida:       number;
    idImptoVenta:         number;
    idImptoCompra:        number;
    manejaInv:            boolean;
    precioLibre:          boolean;
    cantidadLibre:        boolean;
    precioInicial:        number;
    precioFinal:          number;
    precioBase:           number;
    especificacioTecnica: string;
    foto:                 null;
    fc:                   Date;
    activo:               boolean;
    idCia:                number;
    idCo:                 string;
    barras:               Barra[];
    precios:              Precio[];
    costo:                number;
}

export interface Barra {
    idItemRow:               number;
    idItem:                  number;
    ext1:                    string;
    ext2:                    string;
    codBarra:                string;
    codBarra2:               string;
    codBarra3:               string;
    cantidad:                number;
    principal:               boolean;
    fc:                      Date;
    idCia:                   number;
    idCo:                    string;
    cmSaldoInventarioCostos: CMSaldoInventarioCosto[];
}

export interface CMSaldoInventarioCosto {
    idCostoItem:       number;
    idCia:             number;
    idCo:              string;
    idUbicacion:       number;
    idBodega:          number;
    idItem:            number;
    idItemRow:         number;
    enTransito:        number;
    compromisos:       number;
    saldoInv:          number;
    maximo:            number;
    prestamo:          number;
    costoPromedioUni:  number;
    costoPromedioTot:  number;
    fechaModificacion: Date;
    fechaInventario:   Date;
}

export interface Precio {
    idRow:                   number;
    idListaPrecio:           string;
    idItem:                  number;
    idItemRow:               number;
    precio:                  number;
    precioMinimo:            number;
    precioSugerido:          number;
    fechaVigencia:           Date;
    fechaActivacion:         Date;
    fechaFinal:              Date;
    idListaPrecioNavigation: null;
}
