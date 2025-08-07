import { createSelector } from "@ngrx/store";
import { IRootStateModel } from "../models/states/root.state.model";
import { ITasksState } from "../models/interfaces/tasks.interfaces";

export const selectTasksState = (state: IRootStateModel) => state.tasks;

export const selectTasks = createSelector(
  selectTasksState,
  (tasksState: ITasksState) => tasksState.tasks
);

export const selectTaskById = (id: string) => createSelector(
  selectTasksState,
  (tasksState: ITasksState) => tasksState.tasks.find(task => task.id === id)
);