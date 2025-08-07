import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { TasksEffects } from './tasks.effects';
import { AlertsService } from '../../core/services/alerts/alerts.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TasksService } from '../../core/services/tasks/tasks.service.ts';
import { NavigationService } from '../../core/services/navigation/navigation.service';
import { Action } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';

describe('TasksEffects', () => {
  let actions$: Observable<Action>;
  let effects: TasksEffects;
  let alertsService: jasmine.SpyObj<AlertsService>;
  let spinnerService: jasmine.SpyObj<NgxSpinnerService>;
  let tasksService: jasmine.SpyObj<TasksService>;
  let navigationService: jasmine.SpyObj<NavigationService>;

  beforeEach(() => {
    const alertsSpy = jasmine.createSpyObj('AlertsService', ['showConfirmAndNavigate', 'showBasicIconAlert']);
    const spinnerSpy = jasmine.createSpyObj('NgxSpinnerService', ['hide']);
    const tasksSpy = jasmine.createSpyObj('TasksService', ['loadUserTasks', 'createTask', 'updateTask', 'deleteTask']);
    const navSpy = jasmine.createSpyObj('NavigationService', ['navigateTo']);

    TestBed.configureTestingModule({
      providers: [
        TasksEffects,
        provideMockActions(() => actions$),
        { provide: AlertsService, useValue: alertsSpy },
        { provide: NgxSpinnerService, useValue: spinnerSpy },
        { provide: TasksService, useValue: tasksSpy },
        { provide: NavigationService, useValue: navSpy },
      ],
    });

    effects = TestBed.inject(TasksEffects);
    alertsService = TestBed.inject(AlertsService) as jasmine.SpyObj<AlertsService>;
    spinnerService = TestBed.inject(NgxSpinnerService) as jasmine.SpyObj<NgxSpinnerService>;
    tasksService = TestBed.inject(TasksService) as jasmine.SpyObj<TasksService>;
    navigationService = TestBed.inject(NavigationService) as jasmine.SpyObj<NavigationService>;
  });

  describe('loadUserTasksEffect$', () => {
    it('should return Load User Tasks Success on success', () => {
      const tasksResponse = [{ id: '1', title: 'task1' }];
      const action = { type: '[Tasks] Load User Tasks' };
      const outcome = { type: '[Tasks] Load User Tasks Success', tasks: tasksResponse };

      actions$ = hot('-a', { a: action });
      tasksService.loadUserTasks.and.returnValue(of(tasksResponse));

      const expected = cold('-b', { b: outcome });

      expect(effects.loadUserTasksEffect$).toBeObservable(expected);
    });

    it('should hide spinner, show alert and return error action on failure', () => {
      const action = { type: '[Tasks] Load User Tasks' };
      const error = new Error('fail');
      const outcome = { type: '[Tasks] Load User Tasks Error' };

      actions$ = hot('-a', { a: action });
      tasksService.loadUserTasks.and.returnValue(throwError(() => error));

      const expected = cold('-b', { b: outcome });

      expect(effects.loadUserTasksEffect$).toBeObservable(expected);
      effects.loadUserTasksEffect$.subscribe(() => {
        expect(spinnerService.hide).toHaveBeenCalled();
        expect(alertsService.showConfirmAndNavigate).toHaveBeenCalledWith(
          'error',
          'Error',
          'Failed to load user tasks. Try again later.',
          '/logout'
        );
      });
    });
  });

  describe('createUserTaskEffect$', () => {
    it('should navigate and return success action on success', () => {
      const newTask = { title: 'New task' };
      const action = { type: '[Tasks] Create User Task', task: newTask };
      const response = { id: '123', title: 'New task' };
      const outcome = { type: '[Tasks] Create User Task Success', task: response };

      actions$ = hot('-a', { a: action });
      tasksService.createTask.and.returnValue(of(response));

      const expected = cold('-b', { b: outcome });

      expect(effects.createUserTaskEffect$).toBeObservable(expected);
      effects.createUserTaskEffect$.subscribe(() => {
        expect(navigationService.navigateTo).toHaveBeenCalledWith('/tasks');
      });
    });

    it('should hide spinner, show alert and return error action on failure', () => {
      const newTask = { title: 'New task' };
      const action = { type: '[Tasks] Create User Task', task: newTask };
      const error = new Error('fail');
      const outcome = { type: '[Tasks] Create User Task Error' };

      actions$ = hot('-a', { a: action });
      tasksService.createTask.and.returnValue(throwError(() => error));

      const expected = cold('-b', { b: outcome });

      expect(effects.createUserTaskEffect$).toBeObservable(expected);
      effects.createUserTaskEffect$.subscribe(() => {
        expect(spinnerService.hide).toHaveBeenCalled();
        expect(alertsService.showBasicIconAlert).toHaveBeenCalledWith(
          'error',
          'Error',
          'The task could not be created. Please try again.'
        );
      });
    });
  });

  describe('updateUserTaskEffect$', () => {
    it('should navigate and return success action on success', () => {
      const taskToUpdate = { id: '1', title: 'Task' };
      const action = { type: '[Tasks] Update User Task', task: taskToUpdate };
      const outcome = { type: '[Tasks] Update User Task Success', task: taskToUpdate };

      actions$ = hot('-a', { a: action });
      tasksService.updateTask.and.returnValue(of(taskToUpdate));

      const expected = cold('-b', { b: outcome });

      expect(effects.updateUserTaskEffect$).toBeObservable(expected);
      effects.updateUserTaskEffect$.subscribe(() => {
        expect(navigationService.navigateTo).toHaveBeenCalledWith('/tasks');
      });
    });

    it('should hide spinner, show alert and return error action on failure', () => {
      const taskToUpdate = { id: '1', title: 'Task' };
      const action = { type: '[Tasks] Update User Task', task: taskToUpdate };
      const error = new Error('fail');
      const outcome = { type: '[Tasks] Update User Task Error' };

      actions$ = hot('-a', { a: action });
      tasksService.updateTask.and.returnValue(throwError(() => error));

      const expected = cold('-b', { b: outcome });

      expect(effects.updateUserTaskEffect$).toBeObservable(expected);
      effects.updateUserTaskEffect$.subscribe(() => {
        expect(spinnerService.hide).toHaveBeenCalled();
        expect(alertsService.showBasicIconAlert).toHaveBeenCalledWith(
          'error',
          'Error',
          'The task could not be updated. Please try again..'
        );
      });
    });
  });

  describe('deleteUserTaskEffect$', () => {
    it('should navigate and return success action on success', () => {
      const taskToDelete = { id: '1', title: 'Task' };
      const action = { type: '[Tasks] Delete User Task', task: taskToDelete };
      const outcome = { type: '[Tasks] Delete User Task Success', taskId: taskToDelete.id };

      actions$ = hot('-a', { a: action });
      tasksService.deleteTask.and.returnValue(of({}));

      const expected = cold('-b', { b: outcome });

      expect(effects.deleteUserTaskEffect$).toBeObservable(expected);
      effects.deleteUserTaskEffect$.subscribe(() => {
        expect(navigationService.navigateTo).toHaveBeenCalledWith('/tasks');
      });
    });

    it('should hide spinner, show alert and return error action on failure', () => {
      const taskToDelete = { id: '1', title: 'Task' };
      const action = { type: '[Tasks] Delete User Task', task: taskToDelete };
      const error = new Error('fail');
      const outcome = { type: '[Tasks] Delete User Task Error' };

      actions$ = hot('-a', { a: action });
      tasksService.deleteTask.and.returnValue(throwError(() => error));

      const expected = cold('-b', { b: outcome });

      expect(effects.deleteUserTaskEffect$).toBeObservable(expected);
      effects.deleteUserTaskEffect$.subscribe(() => {
        expect(spinnerService.hide).toHaveBeenCalled();
        expect(alertsService.showBasicIconAlert).toHaveBeenCalledWith(
          'error',
          'Error',
          'The task could not be updated. Please try again..'
        );
      });
    });
  });
});
