import { provideHttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya peticiones pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send GET request with headers and params', () => {
    const url = '/api/test';
    const headers = { Authorization: 'Bearer token' };
    const params = { search: 'angular' };

    service.commonGetRequest(url, headers, params).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(request =>
      request.method === 'GET' &&
      request.url === url &&
      request.params.get('search') === 'angular' &&
      request.headers.get('Authorization') === 'Bearer token'
    );

    expect(req.request.method).toBe('GET');
    req.flush({ success: true });
  });

  it('should send POST request with body, headers and params', () => {
    const url = '/api/test';
    const body = { name: 'test' };
    const headers = { 'X-Custom-Header': 'HeaderValue' };
    const params = { id: 123 };

    service.commonPostRequest(url, body, headers, params).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(request =>
      request.method === 'POST' &&
      request.url === url &&
      request.params.get('id') === '123' &&
      request.headers.get('X-Custom-Header') === 'HeaderValue'
    );

    expect(req.request.body).toEqual(body);
    req.flush({ success: true });
  });

  it('should send PUT request with body', () => {
    const url = '/api/update';
    const body = { id: 1, value: 'new' };

    service.commonPutRequest(url, body).subscribe(res => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(body);
    req.flush({ success: true });
  });

  it('should send DELETE request with headers', () => {
    const url = '/api/delete';
    const headers = { 'X-Delete': 'true' };

    service.commonDeleteRequest(url, headers).subscribe(res => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('X-Delete')).toBe('true');
    req.flush({ success: true });
  });
});
