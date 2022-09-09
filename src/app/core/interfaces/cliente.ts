export interface Cliente {
    idTercero:           number;
    identificacion:      string;
    tipoIdentificacion:  string;
    razonSocial:         string;
    nombre1:             string;
    nombre2:             string;
    apellido1:           string;
    apellido2:           string;
    direccion:           string;
    telefono:            string;
    celular:             string;
    correoElectronico:   string;
    actividadEconomica:  string;
    noManejaIva:         null;
    esCliente:           boolean;
    esProveedor:         boolean;
    esEmpleado:          boolean;
    fechaCreacion:       Date;
    activo:              boolean;
    finSucursalClientes: FinSucursalCliente[];
}

export interface FinSucursalCliente {
    idSucursalCliente:   number;
    idTercero:           null;
    idListaPrecio:       string;
    nombreCompleto:      string;
    direccion:           string;
    telefono:            string;
    idFormaPago:         null;
    idDiasPago:          null;
    cupo:                number;
    descuento:           number;
    manejaIva:           null;
    manejaIca:           null;
    manejaImpCon:        null;
    manejaRetFte:        null;
    manejaReteIva:       null;
    manejaReteIca:       null;
    manejaReteServ:      null;
    manejaReteEquidad:   null;
    bloqueadoMora:       null;
    bloqueadoCupo:       null;
    bloqueoadoCartera:   null;
    idVendedor:          null;
    idZona:              null;
    fc:                  null;
    activo:              null;
    idTerceroNavigation: null;
    finContactos:        any[];
}
