import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { SpinnerService } from '../spinner-service/spinner.service';

@Injectable({providedIn: 'root'})
export class WebserviceService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8'
  });

  constructor(private http: HttpClient, private spinner: SpinnerService) { }

  getRequest(url: string): Observable<any> {
    const token = window.sessionStorage.getItem('token');
    // const head = new HttpHeaders({
    //   'Content-Type': 'application/json; charset=utf-8',
    //   Authorization: 'Bearer;' + token
    // });
    const spinnerRef = this.spinner.start('Loading...');
    return this.http.get<any>(url).pipe(
      //  timeout(100000),
      tap(el => console.log('Process ' + el),
      err => {
        console.log(err);
        this.spinner.stop(spinnerRef);
      },
      () => this.spinner.stop(spinnerRef))
    );
  }

  putRequest(url: string, data: any): Observable<any> {
    const spinnerRef = this.spinner.start('Loading...');
    return this.http.put(url, data).pipe(
      // timeout(100000),
      finalize(() => this.spinner.stop(spinnerRef))
    );
  }

  deleteRequest(url: string) {
    const spinnerRef = this.spinner.start('Loading...');
    return this.http.delete<any>(url).pipe(
      // timeout(100000),
      finalize(() => this.spinner.stop(spinnerRef))
    );
  }

  postRequest(url: string, data: any): Observable<any> {
    const spinnerRef = this.spinner.start('Loading...');
    return this.http.post(url, data).pipe(
        // timeout(100000),
        finalize(() => {
        this.spinner.stop(spinnerRef);
      })
    );
  }

  deleteRequestWithBody(url: string, body: any): Observable<any> {
    const spinnerRef = this.spinner.start('Loading...');
    const headers = new HttpHeaders({
      'content-Type': 'application/json'
    });
    const req = {
      headers,
      body
    };
    return this.http.delete(url, req).pipe(
      finalize(() => {
        this.spinner.stop(spinnerRef);
      })
    );
  }

  getRequestWithParams(url: string, paramsData: any, isBlob?: boolean): Observable<any> {
    let params = new HttpParams();
    const spinnerRef = this.spinner.start('Loading...');
    Object.keys(paramsData).forEach(key => {
      params = params.append(key, paramsData[key]);
      });
    if (isBlob) {
      return this.http.get(url, { params, withCredentials: true, responseType: 'blob' })
      .pipe(
        tap(el => console.log('Process ' + el),
      err => {
        console.log(err);
        this.spinner.stop(spinnerRef);
      },
      () => this.spinner.stop(spinnerRef))
      );
    } else {
      return this.http.get<any>(url, { params })
      .pipe(tap(el => console.log('Process ' + el),
      err => {
        console.log(err);
        this.spinner.stop(spinnerRef);
      },
      () => this.spinner.stop(spinnerRef)));
    }
  }

  postRequestWithParams(url: string, paramsData: any): Observable<any> {
    let params = new HttpParams();
    const spinnerRef = this.spinner.start('Loading...');
    Object.keys(paramsData).forEach(key => {
      params = params.append(key, paramsData[key]);
    });
    return this.http.post(url, null, { params, withCredentials: true })
    .pipe(
      tap(el => console.log('Process ' + el),
      err => {
        console.log(err);
        this.spinner.stop(spinnerRef);
      },
      () => this.spinner.stop(spinnerRef))
    );
  }

    postRequestWithParamsandBody(url: string, body: any, paramsData: any): Observable<any> {

      let params = new HttpParams();

      const spinnerRef = this.spinner.start('Loading...');

      Object.keys(paramsData).forEach(key => {

        params = params.append(key, paramsData[key]);

      });

      return this.http.post(url, body, { params })

        .pipe(
    tap(el => console.log('Process ' + el),
      err => {
        console.log(err);
        this.spinner.stop(spinnerRef);
      },
      () => this.spinner.stop(spinnerRef))
  );

    }

  /**

     * Method to update the record with parameters.

     * @param  {string} url

     * @param  {any} paramsData?

     * @returns Observable

     */

    putRequestWithParamAndBody(url: string, body: any, paramsData?: any): Observable<any> {

        let params = new HttpParams();

        const spinnerRef = this.spinner.start('Loading...');
  
        Object.keys(paramsData).forEach(key => {
  
          params = params.append(key, paramsData[key]);
  
        });
      return this.http.put(url, body, { params })

        .pipe(
    tap(el => console.log('Process ' + el),
      err => {
        console.log(err);
        this.spinner.stop(spinnerRef);
      },
      () => this.spinner.stop(spinnerRef))
  );

    }

  }
