import { createReducer, on } from "@ngrx/store";
import { ITasksState } from "../models/interfaces/tasks.interfaces";
import { createUserTasksSuccessAction, deleteUserTasksSuccessAction, loadUserTasksAction, loadUserTasksErrorAction, loadUserTasksSuccessAction, updateUserTasksSuccessAction } from "../actions/tasks.actions";

export const initialTasksState: ITasksState = {
  loading: false,
  loadSuccess: false,
  loadError: false,
  tasks: []
};

export const tasksReducer = createReducer(
  initialTasksState,
  on(loadUserTasksAction, (state: ITasksState) => {
    return { ...state, loading: true, loadSuccess: false, loadError: false };
  }),
  on(loadUserTasksSuccessAction, (state: ITasksState, { tasks }) => {
    return { ...state, loading: false, loadSuccess: true, loadError: false, tasks };
  }),
  on(loadUserTasksErrorAction, (state: ITasksState) => {
    return { ...state, loading: false, loadSuccess: false, loadError: true };
  }),
  on(createUserTasksSuccessAction, (state: ITasksState, { task }) => {
    return { ...state, tasks: [task, ...state.tasks] };
  }),
  on(updateUserTasksSuccessAction, (state: ITasksState, { task }) => {
    let updatedTasks;

    if (task.completed) {
      updatedTasks = state.tasks.filter(t => t.id !== task.id);
    } else {
      updatedTasks = state.tasks.map(t =>
        t.id === task.id ? { ...t, ...task } : t
      );
    }

    return { ...state, tasks: updatedTasks };
  }),
  on(deleteUserTasksSuccessAction, (state: ITasksState, { taskId }) => {
    return { ...state, tasks: state.tasks.filter(task => task.id !== taskId) };
  }),
);