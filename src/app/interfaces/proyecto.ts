import { Equipo } from "./equipo";
import { Estado } from "./estado";

export interface Proyecto {

    id:Number,
    nombre:String,
    equipo:Equipo,
    estado:Estado
}
