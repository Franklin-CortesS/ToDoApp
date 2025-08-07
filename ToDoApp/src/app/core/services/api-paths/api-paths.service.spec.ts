import { TestBed } from '@angular/core/testing';
import { ApiPathsService } from './api-paths.service';
import { environment } from '../../../../environments/environment';

describe('ApiPathsService', () => {
  let service: ApiPathsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPathsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should build correct API URL without parameters', () => {
    const path = 'tasks';
    const expectedUrl = `${environment.API_URL}${environment.API_PATHS[path]}`;
    const result = service.getApiPath(path);
    expect(result).toBe(expectedUrl);
  });

  it('should build correct API URL with parameters', () => {
    const path = 'taskUpdate';
    const params = { id: 123 };
    const expectedUrl = `${environment.API_URL}${environment.API_PATHS[path].replace('{id}', String(params.id))}`;
    const result = service.getApiPath(path, params);
    expect(result).toBe(expectedUrl);
  });

  it('should handle multiple parameters correctly', () => {
    const path = 'taskUpdate';
    const params = { id: 123, anotherParam: 456 };
    let expectedUrl = `${environment.API_URL}${environment.API_PATHS[path]}`;
    expectedUrl = expectedUrl.replace('{id}', String(params.id));
    expectedUrl = expectedUrl.replace('{anotherParam}', String(params.anotherParam));

    const result = service.getApiPath(path, params);
    expect(result).toBe(expectedUrl);
  });

  it('should return the correct URL for a different API path', () => {
    const path = 'login';
    const expectedUrl = `${environment.API_URL}${environment.API_PATHS[path]}`;
    const result = service.getApiPath(path);
    expect(result).toBe(expectedUrl);
  });
});
