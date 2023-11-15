import { Estado } from "./estado";
import { Usuario } from "./usuario";

export interface Equipo {

    id:Number,
    usuarios:Usuario[],
    estado:Estado,


}
