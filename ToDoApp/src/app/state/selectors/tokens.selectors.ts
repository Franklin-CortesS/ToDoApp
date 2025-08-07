import { createSelector } from "@ngrx/store";
import { IRootStateModel } from "../models/states/root.state.model";
import { ITokensState } from "../models/interfaces/tokens.interface";

export const selectTokenState = (state: IRootStateModel) => state.tokens;

export const selectTokenLoadSuccess = createSelector(
  selectTokenState,
  (tokenState: ITokensState) => tokenState.loadSuccess
);

export const selectToken = createSelector(
  selectTokenState,
  (tokenState: ITokensState) => tokenState.token
);

export const selectTokenExists = createSelector(
  selectTokenState,
  (tokenState: ITokensState) => tokenState.exists
);