import { ActionReducerMap } from "@ngrx/store";
import { tokensReducer } from "./reducers/tokens.reducer";
import { IRootStateModel } from "./models/states/root.state.model";
import { tasksReducer } from "./reducers/tasks.reducer";

export const ROOT_REDUCER: ActionReducerMap<IRootStateModel> = {
  tokens: tokensReducer,
  tasks: tasksReducer
};