import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TokenService } from "../../core/services/token/token.service";
import { catchError, mergeMap, of, switchMap } from "rxjs";
import { AlertsService } from "../../core/services/alerts/alerts.service";
import { NgxSpinnerService } from "ngx-spinner";
import { NavigationService } from "../../core/services/navigation/navigation.service";

@Injectable()
export class TokensEffects {
  private actions$ = inject(Actions);
  private tokenService: TokenService = inject(TokenService);
  private alertsService: AlertsService = inject(AlertsService);
  private navigationService: NavigationService = inject(NavigationService);
  private spinner: NgxSpinnerService = inject(NgxSpinnerService);


  loadUserTokenEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType("[Token] Load User Token"),
      mergeMap((action) => this.tokenService.loadUserToken(action.userCredentials)
        .pipe(
          switchMap((response: any) => {
            this.navigationService.navigateTo('/tasks');
            return [
              { type: '[Token] Load User Token Success', token: response.token, exists: response.exists },
              { type: '[Tasks] Load User Tasks' }
            ]
          }),
          catchError((error: any) => {
            this.spinner.hide();
            this.alertsService.showBasicIconAlert('error', 'Error', 'Failed to load user token. Try again later.');
            return of({ type: '[Token] Load User Token Error' });
          })
        )
      )
    )
  );

  revokeUserTokenEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType("[Token] Revoke User Token"),
      mergeMap(() => this.tokenService.revokeUserToken()
        .pipe(
          switchMap((response: any) => {
            this.spinner.hide()
            this.navigationService.navigateTo('/logout');

            return [
              { type: '[Token] Revoke User Token Success' },
            ]
          }),
          catchError((error: any) => {
            this.spinner.hide();
            this.alertsService.showBasicIconAlert('error', 'Error', 'Failed to revoke user token. Try again later.');
            return of({ type: '[Token] Revoke User Token Error' });
          })
        )
      )
    )
  );
}