import { Injectable } from '@angular/core';
import {BaseService} from "../../../core/base.service";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TestService extends BaseService {
  constructor(public httpClient: HttpClient) {
    super(httpClient);
    this.suffixes = '/test';
  }

  getContentTest(): Observable<any>{
    return of(`${this.apiUrl}/${this.suffixes}`)
  }
}
