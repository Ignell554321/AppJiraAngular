import { Estado } from "./estado";
import { Subtarea } from "./subtarea";

export interface Tarea {

    id:Number,
    nombre:String,
    prioridad:String,
    estado:Estado,
    subtareas:Subtarea[]

}
