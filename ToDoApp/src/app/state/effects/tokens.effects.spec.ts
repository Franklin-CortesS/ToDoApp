import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { TokensEffects } from './tokens.effects';
import { TokenService } from '../../core/services/token/token.service';
import { AlertsService } from '../../core/services/alerts/alerts.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NavigationService } from '../../core/services/navigation/navigation.service';
import { cold, hot } from 'jasmine-marbles';
import { Action } from '@ngrx/store';

describe('TokensEffects', () => {
  let actions$: Observable<Action>;
  let effects: TokensEffects;

  let tokenService: jasmine.SpyObj<TokenService>;
  let alertsService: jasmine.SpyObj<AlertsService>;
  let spinner: jasmine.SpyObj<NgxSpinnerService>;
  let navigationService: jasmine.SpyObj<NavigationService>;

  beforeEach(() => {
    const tokenServiceSpy = jasmine.createSpyObj('TokenService', ['loadUserToken', 'revokeUserToken']);
    const alertsServiceSpy = jasmine.createSpyObj('AlertsService', ['showBasicIconAlert']);
    const spinnerSpy = jasmine.createSpyObj('NgxSpinnerService', ['hide']);
    const navigationSpy = jasmine.createSpyObj('NavigationService', ['navigateTo']);

    TestBed.configureTestingModule({
      providers: [
        TokensEffects,
        provideMockActions(() => actions$),
        { provide: TokenService, useValue: tokenServiceSpy },
        { provide: AlertsService, useValue: alertsServiceSpy },
        { provide: NgxSpinnerService, useValue: spinnerSpy },
        { provide: NavigationService, useValue: navigationSpy },
      ],
    });

    effects = TestBed.inject(TokensEffects);
    tokenService = TestBed.inject(TokenService) as jasmine.SpyObj<TokenService>;
    alertsService = TestBed.inject(AlertsService) as jasmine.SpyObj<AlertsService>;
    spinner = TestBed.inject(NgxSpinnerService) as jasmine.SpyObj<NgxSpinnerService>;
    navigationService = TestBed.inject(NavigationService) as jasmine.SpyObj<NavigationService>;
  });

  describe('loadUserTokenEffect$', () => {
    it('should dispatch success actions and navigate on success', () => {
      const userCredentials = { email: 'test@example.com' };
      const tokenResponse = { token: 'abc123', exists: true };

      const action = { type: '[Token] Load User Token', userCredentials };
      const successActions = [
        { type: '[Token] Load User Token Success', token: tokenResponse.token, exists: tokenResponse.exists },
        { type: '[Tasks] Load User Tasks' },
      ];

      actions$ = hot('-a', { a: action });
      tokenService.loadUserToken.and.returnValue(cold('--b', { b: tokenResponse }));

      const expected = cold('---(cd)', { c: successActions[0], d: successActions[1] });

      expect(effects.loadUserTokenEffect$).toBeObservable(expected);
      expect(navigationService.navigateTo).toHaveBeenCalledWith('/tasks');
    });

    it('should handle error and show alert on failure', () => {
      const userCredentials = { email: 'test@example.com' };
      const action = { type: '[Token] Load User Token', userCredentials };
      const error = new Error('fail');

      actions$ = hot('-a', { a: action });
      tokenService.loadUserToken.and.returnValue(cold('--#', {}, error));

      const expected = cold('---(c)', { c: { type: '[Token] Load User Token Error' } });

      expect(effects.loadUserTokenEffect$).toBeObservable(expected);
      expect(spinner.hide).toHaveBeenCalled();
      expect(alertsService.showBasicIconAlert).toHaveBeenCalledWith('error', 'Error', 'Failed to load user token. Try again later.');
    });
  });

  describe('revokeUserTokenEffect$', () => {
    it('should dispatch success action and navigate on success', () => {
      const action = { type: '[Token] Revoke User Token' };
      const successAction = { type: '[Token] Revoke User Token Success' };

      actions$ = hot('-a', { a: action });
      tokenService.revokeUserToken.and.returnValue(cold('--b', { b: {} }));

      const expected = cold('---b', { b: successAction });

      expect(effects.revokeUserTokenEffect$).toBeObservable(expected);
      expect(spinner.hide).toHaveBeenCalled();
      expect(navigationService.navigateTo).toHaveBeenCalledWith('/logout');
    });

    it('should handle error and show alert on failure', () => {
      const action = { type: '[Token] Revoke User Token' };
      const error = new Error('fail');

      actions$ = hot('-a', { a: action });
      tokenService.revokeUserToken.and.returnValue(cold('--#', {}, error));

      const expected = cold('---c', { c: { type: '[Token] Revoke User Token Error' } });

      expect(effects.revokeUserTokenEffect$).toBeObservable(expected);
      expect(spinner.hide).toHaveBeenCalled();
      expect(alertsService.showBasicIconAlert).toHaveBeenCalledWith('error', 'Error', 'Failed to revoke user token. Try again later.');
    });
  });
});
