import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Tarea } from '../interfaces/tarea';
import { Sprint } from '../interfaces/sprint';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  constructor(private httpClient:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=ISO-8859-15', 'Accept': 'application/json'})
  };

  public get listar():Observable<any>{

    return this.httpClient.get(`${environment.apiEndPoint}sprint/listar`) .pipe(

      tap(response => {
        //console.log(response);
        response as Sprint[]
      })

    );
  
  }

  getSprintAct(id:number): Observable<Sprint> {
    return this.httpClient.get<Sprint>(`${environment.apiEndPoint}sprint/obtAct/${id}`, this.httpOptions ).pipe(
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

}
