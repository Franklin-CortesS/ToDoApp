import { createReducer, on } from "@ngrx/store";
import { ITokensState } from "../models/interfaces/tokens.interface";
import { loadUserTokenAction, loadUserTokenErrorAction, loadUserTokenSuccessAction } from "../actions/token.actions";

export const initialTokensState: ITokensState = {
  loading: false,
  loadSuccess: false,
  loadError: false,
  token: null,
  exists: false
};

export const tokensReducer = createReducer(
  initialTokensState,
  on(loadUserTokenAction, (state: ITokensState) => {
    return { ...state, loading: true, loadSuccess: false, loadError: false };
  }),
  on(loadUserTokenSuccessAction, (state: ITokensState, { token, exists }) => {
    return { ...state, loading: false, loadSuccess: true, loadError: false, token, exists };
  }),
    on(loadUserTokenErrorAction, (state: ITokensState) => {
    return { ...state, loading: false, loadSuccess: false, loadError: true };
  }),
);