import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  public apiUrl: string = environment.apiUrl;
  public suffixes: string;
  constructor(public http: HttpClient) {
  }

  getAll(p?: any): Observable<any>{
    return of({suffixes: this.suffixes, body: fakeData});
  }
  updateItem(p?: any):Observable<any>{
    return of(p);
  }

  delete(id: any): Observable<any>{
    return of(id)
  }

  getDetail(id: any): Observable<any>{
    return of('Detail '+id);
  }
}

export const fakeData = [
  {
    id: 1,
    name: 'Xie',
    code: 'Chuling'
  },
  {
    id: 2,
    name: 'Justina',
    code: 'Xie'
  },
  {
    id: 3,
    name: 'Phong',
    code: 'Vutu'
  },
  {
    id: 4,
    name: 'Xie',
    code: 'Feng'
  }
]
