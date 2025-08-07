import { ActionReducer, MetaReducer } from "@ngrx/store";
import { revokeUserTokenSuccessAction } from "../actions/token.actions";

export function clearState(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    if(action.type == revokeUserTokenSuccessAction.type) {
      return reducer(undefined, {type: "@@INIT"})
    }

    return reducer(state, action);
  }
};

export const metaReducers: MetaReducer<any>[] = [clearState];