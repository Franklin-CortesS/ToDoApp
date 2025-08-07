

import { createAction, props } from "@ngrx/store";
import { ICredentials } from "../models/interfaces/tokens.interface";

export const loadUserTokenAction = createAction(
  '[Token] Load User Token',
  props<{ userCredentials: ICredentials }>()
);

export const loadUserTokenSuccessAction = createAction(
  '[Token] Load User Token Success',
  props<{ token: string, exists: boolean }>()
);

export const loadUserTokenErrorAction = createAction(
  '[Token] Load User Token Error',
);

export const revokeUserTokenAction = createAction(
  '[Token] Revoke User Token',
);

export const revokeUserTokenSuccessAction = createAction(
  '[Token] Revoke User Token Success',
);

export const revokeUserTokenErrorAction = createAction(
  '[Token] Revoke User Token Error',
);