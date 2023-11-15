import { Estado } from "./estado";

export interface Responsable {

    id:number,
    nombres:string,
	apellidos:string,
	cargo:string,
    estado:Estado,
    correo:string
}
