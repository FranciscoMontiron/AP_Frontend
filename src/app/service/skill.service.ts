import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Skill } from '../model/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  //URL = 'http://localhost:8080/skill/';
  URL = 'https://backendmontiron.herokuapp.com/skill/';

  constructor(private httpClient: HttpClient) { }

  public getList() : Observable <Skill[]>{
    return this.httpClient.get<Skill[]>(this.URL + 'list');
  }

  public getSkill(id : number) : Observable <Skill>{
    return this.httpClient.get<Skill>(this.URL + `getSkill/${id}`);
  }

  public save(skill : Skill) : Observable<any>{
    return this.httpClient.post<any>(this.URL + `create`, skill);
  }

  public update(id : number, skill : Skill) : Observable<any>{
    return this.httpClient.put<any>(this.URL + `edit/${id}`, skill);
  }

  public delete(id : number) : Observable<any>{
    return this.httpClient.delete<any>(this.URL + `delete/${id}`);
  }

}
