import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Proyecto } from '../model/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  //URL = 'http://localhost:8080/proyecto/';
  URL = 'https://backendmontiron.herokuapp.com/proyecto/';
  

  constructor(private httpClient: HttpClient) { }

  
  public getList() : Observable <Proyecto[]>{
    return this.httpClient.get<Proyecto[]>(this.URL + 'list');
  }

  public getProyecto(id : number) : Observable <Proyecto>{
    return this.httpClient.get<Proyecto>(this.URL + `getProyecto/${id}`);
  }

  public save(proyecto : Proyecto) : Observable<any>{
    return this.httpClient.post<any>(this.URL + `create`, proyecto);
  }

  public update(id : number, proyecto : Proyecto) : Observable<any>{
    return this.httpClient.put<any>(this.URL + `edit/${id}`, proyecto);
  }

  public delete(id : number) : Observable<any>{
    return this.httpClient.delete<any>(this.URL + `delete/${id}`);
  }
}
