import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskCard } from './task-card';
import { Button } from '../button/button';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { NavigationService } from '../../../core/services/navigation/navigation.service';
import { ITask } from '../../../state/models/interfaces/tasks.interfaces';
import { updateUserTasksAction, deleteUserTasksAction } from '../../../state/actions/tasks.actions';
import { Dates } from '../../../shared/classes/dates';

describe('TaskCard', () => {
  let component: TaskCard;
  let fixture: ComponentFixture<TaskCard>;
  let storeSpy: jasmine.SpyObj<Store<any>>;
  let spinnerSpy: jasmine.SpyObj<NgxSpinnerService>;
  let navigationSpy: jasmine.SpyObj<NavigationService>;

  const taskMock: ITask = {
    id: '123',
    title: 'Test task',
    description: 'Desc',
    completed: false,
    createdAt: '202508071230'
  };

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj('Store', ['dispatch']);
    spinnerSpy = jasmine.createSpyObj('NgxSpinnerService', ['show']);
    navigationSpy = jasmine.createSpyObj('NavigationService', ['navigateTo']);

    await TestBed.configureTestingModule({
      imports: [TaskCard, Button],
      providers: [
        { provide: Store, useValue: storeSpy },
        { provide: NgxSpinnerService, useValue: spinnerSpy },
        { provide: NavigationService, useValue: navigationSpy },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCard);
    component = fixture.componentInstance;
    component.task = {...taskMock};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('formatDate', () => {
    it('should format createdAt timestamp correctly', () => {
      const formatted = component.formatDate();
      expect(formatted).toBe(Dates.formatTimestamp(taskMock.createdAt!));
    });

    it('should return empty string if createdAt is empty', () => {
      component.task.createdAt = '';
      expect(component.formatDate()).toBe('');
    });
  });

  describe('completeTask', () => {
    it('should show spinner and dispatch updateUserTasksAction with completed true', () => {
      component.completeTask();

      expect(spinnerSpy.show).toHaveBeenCalled();
      expect(storeSpy.dispatch).toHaveBeenCalledWith(
        updateUserTasksAction({ task: { ...taskMock, completed: true } })
      );
    });
  });

  describe('updateTask', () => {
    it('should call navigateTo with correct path', () => {
      component.updateTask();

      expect(navigationSpy.navigateTo).toHaveBeenCalledWith(`task/update/${taskMock.id}`);
    });
  });

  describe('deleteTask', () => {
    it('should show spinner and dispatch deleteUserTasksAction with task', () => {
      component.deleteTask();

      expect(spinnerSpy.show).toHaveBeenCalled();
      expect(storeSpy.dispatch).toHaveBeenCalledWith(
        deleteUserTasksAction({ task: taskMock })
      );
    });
  });
});
