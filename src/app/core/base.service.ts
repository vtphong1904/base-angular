import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay, Observable, of} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  public apiUrl: string = environment.apiUrl;
  constructor(public http: HttpClient) {
  }

  getListItem(p?: any): Observable<any>{
    return of({
      code: '00',
      data: fakeData,
      apiUrl: this.apiUrl
    })
  }
  updateItem(p?: any):Observable<any>{
    return of(p);
  }

  addNewItem(p?: any): Observable<any>{
    return of(p).pipe(delay(2000))
  }

  deleteItem(id: any): Observable<any>{
    return of(id)
  }

  getItemById(id: any): Observable<any>{
    return of(id);
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
