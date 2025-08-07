import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { NavigationService } from '../../services/navigation/navigation.service';
import { TokenService } from '../../services/token/token.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const navigationService = inject(NavigationService);
  const tokensService = inject(TokenService);

  const hasToken =  await tokensService.userHasToken();

  if(hasToken) {
    return true;
  }
  else {
    navigationService.navigateTo("/login");
    return false;
  }
};
