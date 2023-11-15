import { Estado } from "./estado";
import { Sprint } from "./sprint";
import { Tarea } from "./tarea";
import { Usuario } from "./usuario";

export interface Subtarea {

    id:Number,
    nombre:String,
    descripcion:String,
    responsable:Usuario,
    apoyo:Usuario,
    sprint:Sprint,
    estado:Estado,
    tarea:Tarea

}

