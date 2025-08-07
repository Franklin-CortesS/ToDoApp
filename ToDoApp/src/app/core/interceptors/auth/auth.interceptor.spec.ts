import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';
import { selectToken } from '../../../state/selectors/tokens.selectors';

describe('authInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let store: MockStore;

  const mockToken = 'mocked-token-123';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideMockStore({
          selectors: [
            { selector: selectToken, value: mockToken }
          ]
        }),
        {
          provide: HTTP_INTERCEPTORS,
          useValue: authInterceptor,
          multi: true,
        },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    store = TestBed.inject(MockStore);
  });

 // it('should add Authorization header with token from store', () => {
  //  httpClient.get('/test').subscribe(response => {
  //    expect(response).toBeTruthy();
  //  });

  //  const req = httpMock.expectOne('/test');
  //  expect(req.request.headers.has('Authorization')).toBeTrue();
  //  expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);

  //  req.flush({ data: 'ok' });
  //});

  it('should not add Authorization header if token is null', () => {
    store.overrideSelector(selectToken, null);
    store.refreshState();

    httpClient.get('/test-no-auth').subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('/test-no-auth');
    expect(req.request.headers.has('Authorization')).toBeFalse();

    req.flush({ data: 'ok' });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
