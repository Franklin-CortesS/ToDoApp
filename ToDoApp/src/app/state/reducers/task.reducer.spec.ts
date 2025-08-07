import { tasksReducer, initialTasksState } from './tasks.reducer';
import {
  loadUserTasksAction,
  loadUserTasksSuccessAction,
  loadUserTasksErrorAction,
  createUserTasksSuccessAction,
  updateUserTasksSuccessAction,
  deleteUserTasksSuccessAction,
} from '../actions/tasks.actions';
import { ITask } from '../models/interfaces/tasks.interfaces';

describe('tasksReducer', () => {

  const mockTask1: ITask = { id: '1', title: 'Task 1', description: 'Desc 1', completed: false, createdAt: '202508071230' };
  const mockTask2: ITask = { id: '2', title: 'Task 2', description: 'Desc 2', completed: false, createdAt: '202508071230' };

  it('should set loading true on loadUserTasksAction', () => {
    const action = loadUserTasksAction();
    const state = tasksReducer(initialTasksState, action);

    expect(state.loading).toBeTrue();
    expect(state.loadSuccess).toBeFalse();
    expect(state.loadError).toBeFalse();
  });

  it('should set tasks and loadSuccess true on loadUserTasksSuccessAction', () => {
    const tasks = [mockTask1, mockTask2];
    const action = loadUserTasksSuccessAction({ tasks });
    const state = tasksReducer(initialTasksState, action);

    expect(state.loading).toBeFalse();
    expect(state.loadSuccess).toBeTrue();
    expect(state.loadError).toBeFalse();
    expect(state.tasks).toEqual(tasks);
  });

  it('should set loadError true on loadUserTasksErrorAction', () => {
    const action = loadUserTasksErrorAction();
    const state = tasksReducer(initialTasksState, action);

    expect(state.loading).toBeFalse();
    expect(state.loadSuccess).toBeFalse();
    expect(state.loadError).toBeTrue();
  });

  it('should add new task at the start on createUserTasksSuccessAction', () => {
    const prevState = { ...initialTasksState, tasks: [mockTask2] };
    const action = createUserTasksSuccessAction({ task: mockTask1 });
    const state = tasksReducer(prevState, action);

    expect(state.tasks.length).toBe(2);
    expect(state.tasks[0]).toEqual(mockTask1);
    expect(state.tasks[1]).toEqual(mockTask2);
  });

  it('should update task if not completed on updateUserTasksSuccessAction', () => {
    const updatedTask = { ...mockTask1, title: 'Updated Title', completed: false };
    const prevState = { ...initialTasksState, tasks: [mockTask1, mockTask2] };
    const action = updateUserTasksSuccessAction({ task: updatedTask });
    const state = tasksReducer(prevState, action);

    expect(state.tasks.length).toBe(2);
    expect(state.tasks.find(t => t.id === updatedTask.id)?.title).toBe('Updated Title');
  });

  it('should remove task if completed on updateUserTasksSuccessAction', () => {
    const completedTask = { ...mockTask1, completed: true };
    const prevState = { ...initialTasksState, tasks: [mockTask1, mockTask2] };
    const action = updateUserTasksSuccessAction({ task: completedTask });
    const state = tasksReducer(prevState, action);

    expect(state.tasks.length).toBe(1);
    expect(state.tasks.find(t => t.id === completedTask.id)).toBeUndefined();
  });

  it('should remove task on deleteUserTasksSuccessAction', () => {
    const prevState = { ...initialTasksState, tasks: [mockTask1, mockTask2] };
    const action = deleteUserTasksSuccessAction({ taskId: mockTask1.id! });
    const state = tasksReducer(prevState, action);

    expect(state.tasks.length).toBe(1);
    expect(state.tasks.find(t => t.id === mockTask1.id)).toBeUndefined();
  });
});
