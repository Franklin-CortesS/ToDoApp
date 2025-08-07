import { TestBed } from '@angular/core/testing';
import { TokenService } from './token.service';
import { ApiPathsService } from '../api-paths/api-paths.service';
import { ApiService } from '../api/api.service';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MemoizedSelector } from '@ngrx/store';
import { selectTokenLoadSuccess } from '../../../state/selectors/tokens.selectors';
import { ICredentials } from '../../../state/models/interfaces/tokens.interface';
import { of } from 'rxjs';

describe('TokenService', () => {
  let service: TokenService;
  let store: MockStore;
  let mockTokenSelector: MemoizedSelector<any, boolean>;

  const apiPathsSpy = jasmine.createSpyObj('ApiPathsService', ['getApiPath']);
  const apiServiceSpy = jasmine.createSpyObj('ApiService', ['commonPostRequest']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TokenService,
        { provide: ApiPathsService, useValue: apiPathsSpy },
        { provide: ApiService, useValue: apiServiceSpy },
        provideMockStore()
      ]
    });

    service = TestBed.inject(TokenService);
    store = TestBed.inject(MockStore);
    apiPathsSpy.getApiPath.calls.reset();
    apiServiceSpy.commonPostRequest.calls.reset();
    mockTokenSelector = store.overrideSelector(selectTokenLoadSuccess, true);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call apiService.commonPostRequest with login path and credentials', () => {
    const mockUrl = '/api/login';
    const credentials: ICredentials = { email: 'test@example.com' };

    apiPathsSpy.getApiPath.and.returnValue(mockUrl);
    apiServiceSpy.commonPostRequest.and.returnValue(of({ token: 'abc123' }));

    service.loadUserToken(credentials).subscribe();

    expect(apiPathsSpy.getApiPath).toHaveBeenCalledOnceWith('login');
    expect(apiServiceSpy.commonPostRequest).toHaveBeenCalledOnceWith(mockUrl, credentials);
  });

  it('should call apiService.commonPostRequest with logout path', () => {
    const mockUrl = '/api/logout';
    apiPathsSpy.getApiPath.and.returnValue(mockUrl);
    apiServiceSpy.commonPostRequest.and.returnValue(of({}));

    service.revokeUserToken().subscribe();

    expect(apiPathsSpy.getApiPath).toHaveBeenCalledOnceWith('logout');
    expect(apiServiceSpy.commonPostRequest).toHaveBeenCalledOnceWith(mockUrl);
  });

  it('should return true when token selector emits true', async () => {
    mockTokenSelector.setResult(true);
    store.refreshState();

    const result = await service.userHasToken();
    expect(result).toBeTrue();
  });

  it('should return false when token selector emits false', async () => {
    mockTokenSelector.setResult(false);
    store.refreshState();

    const result = await service.userHasToken();
    expect(result).toBeFalse();
  });
});
