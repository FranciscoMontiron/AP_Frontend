import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { persona } from '../model/persona.model';

@Injectable({
  providedIn: 'root'
})

export class PersonaService {

  //URL = 'http://localhost:8080/persona/';
  URL = 'https://backendmontiron.herokuapp.com/persona/';

  constructor(private httpClient: HttpClient) { }

/*
  public getPersona(): Observable<persona>{ //angular usar el Observable para hacer las peticiones asincronas
    return this.http.get<persona>(this.URL+'traer/perfil');    
  }

  public update(id : number, persona : persona) : Observable<any>{
    return this.http.put<any>(this.URL + `editar/nomyprof/${id}`, persona);
  }*/

  public getList() : Observable <persona[]>{
    return this.httpClient.get<persona[]>(this.URL + 'list');
  }

  public getPersona(id : number) : Observable <persona>{
    return this.httpClient.get<persona>(this.URL + `getPersona/${id}`);
  }

  public save(proyecto : persona) : Observable<any>{
    return this.httpClient.post<any>(this.URL + `create`, proyecto);
  }

  public update(id : number, proyecto : persona) : Observable<any>{
    return this.httpClient.put<any>(this.URL + `edit/${id}`, proyecto);
  }

  public delete(id : number) : Observable<any>{
    return this.httpClient.delete<any>(this.URL + `delete/${id}`);
  }


}
