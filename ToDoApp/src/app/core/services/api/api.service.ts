import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

type CustomHeaders = {[name: string]: string | number | (string | number)[]};
type CustomParams = {[name: string]: string | number | boolean | ReadonlyArray<string | number | boolean>};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  defaultHeaders(CustomHeaders: CustomHeaders): HttpHeaders {
    let headers = new HttpHeaders(CustomHeaders)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    return headers;
  };

  loadParams(CustomParams: CustomParams): HttpParams {
    let params = new HttpParams({ fromObject: CustomParams });

    return params;
  }

  commonGetRequest(url: string, headers: CustomHeaders = {}, params: CustomParams = {}) {
    var options = {
      headers: this.defaultHeaders(headers),
      params: this.loadParams(params)
    };

    return this.http.get(url, options);
  }

  commonPostRequest(url: string, body: any, headers: CustomHeaders = {}, params: CustomParams = {}) {
    var options = {
      headers: this.defaultHeaders(headers),
      params: this.loadParams(params)
    };

    return this.http.post(url, body, options);
  }

  commonPutRequest(url: string, body: any, headers: CustomHeaders = {}, params: CustomParams = {}) {
    var options = {
      headers: this.defaultHeaders(headers),
      params: this.loadParams(params)
    };

    return this.http.put(url, body, options);
  }

  commonDeleteRequest(url: string, headers: CustomHeaders = {}, params: CustomParams = {}) {
    var options = {
      headers: this.defaultHeaders(headers),
      params: this.loadParams(params)
    };

    return this.http.delete(url, options);
  }
}
