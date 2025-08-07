import { TestBed } from '@angular/core/testing';
import { authGuard } from './auth.guard';
import { NavigationService } from '../../services/navigation/navigation.service';
import { TokenService } from '../../services/token/token.service';

describe('authGuard', () => {
  let navigationServiceSpy: jasmine.SpyObj<NavigationService>;
  let tokenServiceSpy: jasmine.SpyObj<TokenService>;

  beforeEach(() => {
    navigationServiceSpy = jasmine.createSpyObj('NavigationService', ['navigateTo']);
    tokenServiceSpy = jasmine.createSpyObj('TokenService', ['userHasToken']);

    TestBed.configureTestingModule({
      providers: [
        { provide: NavigationService, useValue: navigationServiceSpy },
        { provide: TokenService, useValue: tokenServiceSpy },
      ],
    });
  });

  it('should allow activation if userHasToken resolves true', async () => {
    tokenServiceSpy.userHasToken.and.returnValue(Promise.resolve(true));

    const result = await TestBed.runInInjectionContext(() => authGuard(null!, null!));

    expect(result).toBeTrue();
    expect(navigationServiceSpy.navigateTo).not.toHaveBeenCalled();
  });

  it('should deny activation and navigate if userHasToken resolves false', async () => {
    tokenServiceSpy.userHasToken.and.returnValue(Promise.resolve(false));

    const result = await TestBed.runInInjectionContext(() => authGuard(null!, null!));

    expect(result).toBeFalse();
    expect(navigationServiceSpy.navigateTo).toHaveBeenCalledWith('/login');
  });
});
