import { HttpInterceptorFn } from '@angular/common/http';
import { IRootStateModel } from '../../../state/models/states/root.state.model';
import { Store } from '@ngrx/store';
import { inject } from '@angular/core';
import { switchMap, take } from 'rxjs';
import { selectToken } from '../../../state/selectors/tokens.selectors';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject<Store<IRootStateModel>>(Store);

  return store.select(selectToken).pipe(
    take(1),
    switchMap((token: string | null) => {
      const authReq = token
        ? req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          })
        : req;

      return next(authReq);
    })
  );
};