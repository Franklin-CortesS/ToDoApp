export interface ITask {
  id?: string,
  createdAt?: string,
  title: string,
  description: string,
  completed: boolean,
  email?: string,
}

export interface ITasksState {
  loading: boolean;
  loadSuccess: boolean;
  loadError: boolean;
  tasks: ITask[]
}