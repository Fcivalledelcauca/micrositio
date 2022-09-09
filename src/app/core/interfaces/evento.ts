export interface Evento{
    id?              :string,
    idTema?         :string,
    idMuncipio?     :number
    title?           :string,
    start?           :Date,
    end?            :Date,
    decription?      :string,
    display?        :string,
    editable?        :boolean,
    classNames?     :string[],
    url?            :string,
    backgroundColor?:string,
    textColor?      :string,
    allDay?         :boolean
}