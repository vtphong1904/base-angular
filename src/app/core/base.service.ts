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

  getListItem(params?: any): Observable<any>{
    return of({
      code: '00',
      data: fakeData,
      apiUrl: this.apiUrl
    })
  }
  updateItem(item?: any):Observable<any>{
    return of(randomResponse(item)).pipe(delay(800));
  }

  addItem(item?: any): Observable<any>{
    return of(randomResponse(item)).pipe(delay(800));
  }

  deleteItem(id?: any): Observable<any>{
    return of(randomResponse(id))
  }

  getItemById(id?: any): Observable<any>{
    const temp = fakeData.filter(item => item.id === id);
    if(temp?.length > 0){
      return of({
        code: '00',
        data: temp[0]
      }).pipe(delay(300));
    }else{
      return of({
        code: 'E05',
        message: 'Item không tồn tại'
      }).pipe(delay(300));
    }
  }

  duplicateUsername(): Observable<any>{
    return of(true);
  }
}

export const randomResponse = (item?: any) => {
  const randomNumber = Math.floor(Math.random() * 2) + 1;
  const arr = [
    {
      code: '00',
      data: item || [],
    },
    {
      code: 'E05',
      message: 'Có lỗi xảy ra'
    }
  ];
  return arr[randomNumber - 1];
}

export const fakeData = [
  {
    id: 1,
    name: 'Stephen Curry',
    code: 'The Chef'
  },
  {
    id: 2,
    name: 'Kevin Durant',
    code: 'Snake'
  },
  {
    id: 3,
    name: 'Lebron James',
    code: 'The King'
  },
  {
    id: 4,
    name: 'Giannis Antetokounmpo',
    code: 'Demigod'
  },
  {
    id: 5,
    name: 'Damian Lillard',
    code: 'Dame time'
  },
  {
    id: 6,
    name: 'James Harden',
    code: 'Tứ hoàng râu đen'
  },
  {
    id: 7,
    name: 'Luka Doncic',
    code: 'Prince'
  },
  {
    id: 8,
    name: 'Nikola Jokić',
    code: 'Joker'
  },
  {
    id: 9,
    name: 'Giannis Antetokounmpo',
    code: 'Demigod'
  },
  {
    id: 10,
    name: 'Jordan Poole',
    code: 'Nhóc đần ngu'
  },
  {
    id: 11,
    name: 'Kyrie Irving',
    code: 'Witch'
  },
  {
    id: 12,
    name: 'Kobe Bryant',
    code: 'Black mamba'
  }
]
