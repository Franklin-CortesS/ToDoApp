import { TestBed } from '@angular/core/testing';
import { TasksService } from './tasks.service.ts';
import { ApiPathsService } from '../api-paths/api-paths.service';
import { ApiService } from '../api/api.service';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { ITask } from '../../../state/models/interfaces/tasks.interfaces';

describe('TasksService', () => {
  let service: TasksService;
  let apiPathsServiceSpy: jasmine.SpyObj<ApiPathsService>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let storeSpy: jasmine.SpyObj<Store<any>>;

  beforeEach(() => {
    apiPathsServiceSpy = jasmine.createSpyObj('ApiPathsService', ['getApiPath']);
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['commonGetRequest', 'commonPostRequest', 'commonPutRequest', 'commonDeleteRequest']);
    storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'select']);

    TestBed.configureTestingModule({
      providers: [
        TasksService,
        { provide: ApiPathsService, useValue: apiPathsServiceSpy },
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: Store, useValue: storeSpy }
      ]
    });

    service = TestBed.inject(TasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call apiService.commonGetRequest with tasks path', () => {
    const mockUrl = '/api/tasks';
    apiPathsServiceSpy.getApiPath.and.returnValue(mockUrl);
    apiServiceSpy.commonGetRequest.and.returnValue(of([]));

    service.loadUserTasks().subscribe();

    expect(apiPathsServiceSpy.getApiPath).toHaveBeenCalledOnceWith('tasks');
    expect(apiServiceSpy.commonGetRequest).toHaveBeenCalledOnceWith(mockUrl);
  });

  it('should call apiService.commonPostRequest with correct url and body when creating a task', () => {
    const task: ITask = { title: 'Test', description: 'Desc', completed: false };
    const mockUrl = '/api/tasks/create';
    apiPathsServiceSpy.getApiPath.and.returnValue(mockUrl);
    apiServiceSpy.commonPostRequest.and.returnValue(of({}));

    service.createTask(task).subscribe();

    expect(apiPathsServiceSpy.getApiPath).toHaveBeenCalledOnceWith('taskCreate');
    expect(apiServiceSpy.commonPostRequest).toHaveBeenCalledOnceWith(mockUrl, {
      title: task.title,
      description: task.description,
      completed: false
    });
  });

  it('should call apiService.commonPutRequest with correct url and body when updating a task', () => {
    const task: ITask = { id: '123', title: 'Test', description: 'Updated', completed: true };
    const mockUrl = '/api/tasks/update/123';
    apiPathsServiceSpy.getApiPath.and.returnValue(mockUrl);
    apiServiceSpy.commonPutRequest.and.returnValue(of({}));

    service.updateTask(task).subscribe();

    expect(apiPathsServiceSpy.getApiPath).toHaveBeenCalledOnceWith('taskUpdate', { id: '123' });
    expect(apiServiceSpy.commonPutRequest).toHaveBeenCalledOnceWith(mockUrl, {
      title: task.title,
      description: task.description,
      completed: task.completed
    });
  });

  it('should call apiService.commonDeleteRequest with correct url when deleting a task', () => {
    const task: ITask = { id: '456', title: '', description: '', completed: false };
    const mockUrl = '/api/tasks/delete/456';
    apiPathsServiceSpy.getApiPath.and.returnValue(mockUrl);
    apiServiceSpy.commonDeleteRequest.and.returnValue(of({}));

    service.deleteTask(task).subscribe();

    expect(apiPathsServiceSpy.getApiPath).toHaveBeenCalledOnceWith('taskDelete', { id: '456' });
    expect(apiServiceSpy.commonDeleteRequest).toHaveBeenCalledOnceWith(mockUrl);
  });
});
