export interface Usuarios{
    NombreUsuario     :string;
    NombreCompleto    :string;
    Email             :string;
    TipoRol           :string;
    idMunicipio       :string;
    municipio         :string;
    activo            :boolean;
 }

 export interface CrearUsuario{
    NombreUsuario?       :string;
    Email                :string;
    Password?            :string;
    NombreCompleto?      :string;
    DocumentoIdentidad?  :string;
    Telefono?            :string;
    Direccion?           :string;
    IdMunicipio?         :number;
    Municipio?           :string;
    idRol?               :string;
    TipoRol?             :string;
    activo?              :boolean;
 }

 export interface ActualizarUsuario{
    email:string;
    hash:string;
    clave:string;
 }