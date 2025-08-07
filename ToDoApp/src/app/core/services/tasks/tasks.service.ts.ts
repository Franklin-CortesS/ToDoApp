import { Injectable } from '@angular/core';
import { ApiPathsService } from '../api-paths/api-paths.service';
import { ApiService } from '../api/api.service';
import { IRootStateModel } from '../../../state/models/states/root.state.model';
import { Store } from '@ngrx/store';
import { ITask } from '../../../state/models/interfaces/tasks.interfaces';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(
    private apiPathsService: ApiPathsService,
    private apiService: ApiService,
    private store: Store<IRootStateModel>
  ) { }

  loadUserTasks() {
    let url = this.apiPathsService.getApiPath('tasks');
    return this.apiService.commonGetRequest(url);
  }

  createTask(task: ITask) {
    let url = this.apiPathsService.getApiPath('taskCreate');
    let body = {
      title: task.title,
      description: task.description,
      completed: false
    }

    return this.apiService.commonPostRequest(url, body);
  }

  updateTask(task: ITask) {
    let url = this.apiPathsService.getApiPath('taskUpdate', {id: task.id!});
    let body = {
      title: task.title,
      description: task.description,
      completed: task.completed
    }

    return this.apiService.commonPutRequest(url, body);
  }

  deleteTask(task: ITask) {
    let url = this.apiPathsService.getApiPath('taskDelete', {id: task.id!});
    return this.apiService.commonDeleteRequest(url);
  }
}
