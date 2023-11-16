import { Estado } from "./estado";
import { Sprint } from "./sprint";
import { Subtarea } from "./subtarea";

export interface Tarea {

    id:Number,
    nombre:String,
    prioridad:String,
    estado:Estado,
    sprint:Sprint,
    subtareas:Subtarea[]

}
