import { Estado } from "./estado";
import { Proyecto } from "./proyecto";

export interface Sprint {

    id:Number,
    proyecto:Proyecto,
    numero:Number,
    descripcion:String,
    fechaInicio:String,
    fechFin:String,
    estado:Estado
}
