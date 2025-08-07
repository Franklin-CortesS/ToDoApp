import { selectTasksState, selectTasks, selectTaskById } from './tasks.selectors';
import { IRootStateModel } from '../models/states/root.state.model';
import { ITasksState, ITask } from '../models/interfaces/tasks.interfaces';

describe('Tasks Selectors', () => {
  const mockTasks: ITask[] = [
    { id: '1', title: 'Task 1', description: 'Desc 1', completed: false, createdAt: '' },
    { id: '2', title: 'Task 2', description: 'Desc 2', completed: true, createdAt: '' },
  ];

  const initialTasksState: ITasksState = {
    loading: false,
    loadSuccess: true,
    loadError: false,
    tasks: mockTasks
  };

  const mockRootState: IRootStateModel = {
    tasks: initialTasksState,
    // otros slices si existen
  } as any;

  it('selectTasksState should select tasks state', () => {
    const result = selectTasksState(mockRootState);
    expect(result).toBe(initialTasksState);
  });

  it('selectTasks should select tasks array', () => {
    const result = selectTasks.projector(initialTasksState);
    expect(result).toEqual(mockTasks);
  });

  it('selectTaskById should select a task by id', () => {
    const selector = selectTaskById('2');
    const result = selector.projector(initialTasksState);
    expect(result).toEqual(mockTasks[1]);
  });

  it('selectTaskById should return undefined if id not found', () => {
    const selector = selectTaskById('non-existent-id');
    const result = selector.projector(initialTasksState);
    expect(result).toBeUndefined();
  });
});
