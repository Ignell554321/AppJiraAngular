import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

 // readonly URL_API=`${environment.apiEndPoint}/usuario/listar`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=ISO-8859-15', 'Accept': 'application/json'})
  };

  constructor(private httpClient:HttpClient) {}

  public get listar():Observable<any>{

    return this.httpClient.get(`${environment.apiEndPoint}usuario/listar`) .pipe(

      tap(response => {
        //console.log(response);
        response as Usuario[]
      })

    );
  
  }

  public create(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post(`${environment.apiEndPoint}usuario/guardar`, usuario, this.httpOptions)
      .pipe(
        map((response: any) => response.cliente as Usuario),
        catchError(e => {
          /*if (this.isNoAutorizado(e)) {
            return throwError(e);
          }

          if (e.status == 400) {
            return throwError(e);
          }*/

          console.error(e.error.mensaje);
          //swal(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  getUsuario(id:number): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${environment.apiEndPoint}usuario/buscar/${id}`, this.httpOptions ).pipe(
      catchError(e => {

        /*if (this.isNoAutorizado(e)) {
          return throwError(e);
        }*/

        //this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
       // swal('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Usuario> {
    return this.httpClient.delete<Usuario>(`${environment.apiEndPoint}usuario/eliminar/${id}`, this.httpOptions ).pipe(
      catchError(e => {

        console.error(e.error.mensaje);
       /* if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
        swal(e.error.mensaje, e.error.error, 'error');*/
        return throwError(e);
      })
    );
  }




}
