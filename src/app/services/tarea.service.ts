import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Tarea } from '../interfaces/tarea';
import { Sprint } from '../interfaces/sprint';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=ISO-8859-15', 'Accept': 'application/json'})
  };

  constructor(private httpClient:HttpClient) { }

  public get listar():Observable<any>{

    return this.httpClient.get(`${environment.apiEndPoint}usuario/listar`) .pipe(

      tap(response => {
        //console.log(response);
        response as Tarea[]
      })

    );
  
  }

  

}
