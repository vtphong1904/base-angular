import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {BaseService} from '@app/core/base.service';

@Injectable({
  providedIn: 'root'
})
export class TestService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
    this.apiUrl = this.apiUrl + '/test';
  }

  getContentTest(): Observable<any>{
    return of(`${this.apiUrl}`)
  }
}
