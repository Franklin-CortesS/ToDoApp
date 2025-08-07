import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ICredentials } from "../models/interfaces/tokens.interface";
import { TokenService } from "../../core/services/token/token.service";
import { catchError, mergeMap, of, switchMap } from "rxjs";
import { AlertsService } from "../../core/services/alerts/alerts.service";
import { NgxSpinnerService } from "ngx-spinner";

@Injectable()
export class TokensEffects {
  private actions$ = inject(Actions);
  private tokenService: TokenService = inject(TokenService);
  private alertsService: AlertsService = inject(AlertsService);
  private spinner: NgxSpinnerService = inject(NgxSpinnerService);


  loadUserTokenEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType("[Token] Load User Token"),
      mergeMap((userCredentials) => this.tokenService.loadUserToken(userCredentials.userCredentials)
        .pipe(
          switchMap((response: any) => {
            return [
              { type: '[Token] Load User Token Success', token: response.token, exists: response.exists },
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
}