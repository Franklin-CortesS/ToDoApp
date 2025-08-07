import { ActionReducerMap } from "@ngrx/store";
import { tokensReducer } from "./reducers/tokens.reducer";
import { IRootStateModel } from "./models/states/root.state.model";

export const ROOT_REDUCER: ActionReducerMap<IRootStateModel> = {
  tokens: tokensReducer
};