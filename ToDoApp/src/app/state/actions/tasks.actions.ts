

import { createAction, props } from "@ngrx/store";
import { ITask } from "../models/interfaces/tasks.interfaces";

export const loadUserTasksAction = createAction(
  '[Tasks] Load User Tasks',
);

export const loadUserTasksSuccessAction = createAction(
  '[Tasks] Load User Tasks Success',
  props<{ tasks: ITask[] }>()
);

export const loadUserTasksErrorAction = createAction(
  '[Tasks] Load User Tasks Error',
);

export const createUserTasksAction = createAction(
  '[Tasks] Create User Task',
  props<{ task: ITask }>()
);

export const createUserTasksSuccessAction = createAction(
  '[Tasks] Create User Task Success',
  props<{ task: ITask }>()
);

export const createUserTasksErrorAction = createAction(
  '[Tasks] Create User Task Error',
);

export const updateUserTasksAction = createAction(
  '[Tasks] Update User Task',
  props<{ task: ITask }>()
);

export const updateUserTasksSuccessAction = createAction(
  '[Tasks] Update User Task Success',
  props<{ task: ITask }>()
);

export const updateUserTasksErrorAction = createAction(
  '[Tasks] Update User Task Error',
);

export const deleteUserTasksAction = createAction(
  '[Tasks] Delete User Task',
  props<{ task: ITask }>()
);

export const deleteUserTasksSuccessAction = createAction(
  '[Tasks] Delete User Task Success',
    props<{ taskId: string }>()
);

export const deleteUserTasksErrorAction = createAction(
  '[Tasks] Delete User Task Error',
);