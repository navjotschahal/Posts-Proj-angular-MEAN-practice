import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class WebserviceService {
  constructor(private httpClient: HttpClient) { }

  getCall(url: string): Observable<any> {
    return this.httpClient.get(url);
  }

  postcall(url: string, bodyParam: any): Observable<any> {
    return this.httpClient.post(url, bodyParam);
  }

}
