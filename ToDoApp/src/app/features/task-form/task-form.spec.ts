import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskForm } from './task-form';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { of } from 'rxjs';
import { ITask } from '../../state/models/interfaces/tasks.interfaces';
import { createUserTasksAction, updateUserTasksAction } from '../../state/actions/tasks.actions';
import { ReactiveFormsModule } from '@angular/forms';
import { Header } from '../../shared/components/header/header';
import { Button } from '../../shared/components/button/button';
import { CommonModule } from '@angular/common';

describe('TaskForm', () => {
  let component: TaskForm;
  let fixture: ComponentFixture<TaskForm>;
  let storeSpy: jasmine.SpyObj<Store<any>>;
  let spinnerSpy: jasmine.SpyObj<NgxSpinnerService>;

  const taskMock: ITask = {
    title: 'Task Title',
    description: 'Task Description',
    completed: false
  };

  function setupActivatedRoute(path: string, id?: string) {
    return {
      snapshot: {
        routeConfig: { path },
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue(id ?? null)
        }
      }
    };
  }

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    spinnerSpy = jasmine.createSpyObj('NgxSpinnerService', ['show']);

    await TestBed.configureTestingModule({
      imports: [TaskForm, ReactiveFormsModule, Header, Button, CommonModule],
      providers: [
        { provide: Store, useValue: storeSpy },
        { provide: NgxSpinnerService, useValue: spinnerSpy },
        { provide: ActivatedRoute, useValue: setupActivatedRoute('task/create') }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set action to Create if route is task/create', () => {
    expect(component.action).toBe('Create');
  });

  it('should set action to Update and patch form if route is task/update/:id', () => {
    const activatedRouteMock = setupActivatedRoute('task/update/:id', "abid34");
    storeSpy.select.and.returnValue(of(taskMock));

    component = new TaskForm(activatedRouteMock as any, storeSpy, spinnerSpy);
    component.ngOnInit();

    expect(component.action).toBe('Update');
    expect(component.taskId).toBe("abid34");
    expect(storeSpy.select).toHaveBeenCalled();
    expect(component.taskForm.value.title).toBe(taskMock.title);
    expect(component.taskForm.value.description).toBe(taskMock.description);
    expect(component.taskForm.value.completed).toBe(taskMock.completed);
  });

  it('should validate form controls correctly', () => {
    const title = component.inputTitle;
    const description = component.inputDescription;
    const completed = component.inputCompleted;

    title.setValue('');
    expect(title.hasError('required')).toBeTrue();
    title.setValue('aa');
    expect(title.hasError('minlength')).toBeTrue();
    title.setValue('a'.repeat(100));
    expect(title.hasError('maxlength')).toBeTrue();
    title.setValue('Valid Title');
    expect(title.valid).toBeTrue();

    description.setValue('');
    expect(description.hasError('required')).toBeTrue();
    description.setValue('aa');
    expect(description.hasError('minlength')).toBeTrue();
    description.setValue('a'.repeat(110));
    expect(description.hasError('maxlength')).toBeTrue();
    description.setValue('Valid Description');
    expect(description.valid).toBeTrue();

    completed.setValue('not boolean');
    expect(completed.hasError('invalidBoolean')).toBeTrue();
    completed.setValue(true);
    expect(completed.valid).toBeTrue();
  });

  it('should dispatch createUserTasksAction on processTask if action is Create', () => {
    component.action = 'Create';
    component.task = {...taskMock};
    component.inputTitle.setValue('New Title');
    component.inputDescription.setValue('New Description');
    component.inputCompleted.setValue(true);

    component.processTask();

    expect(spinnerSpy.show).toHaveBeenCalled();
    expect(storeSpy.dispatch).toHaveBeenCalledWith(
      createUserTasksAction({
        task: {
          title: 'New Title',
          description: 'New Description',
          completed: true
        }
      })
    );
  });

  it('should dispatch updateUserTasksAction on processTask if action is Update', () => {
    component.action = 'Update';
    component.task = {...taskMock};
    component.inputTitle.setValue('Updated Title');
    component.inputDescription.setValue('Updated Description');
    component.inputCompleted.setValue(false);

    component.processTask();

    expect(spinnerSpy.show).toHaveBeenCalled();
    expect(storeSpy.dispatch).toHaveBeenCalledWith(
      updateUserTasksAction({
        task: {
          title: 'Updated Title',
          description: 'Updated Description',
          completed: false
        }
      })
    );
  });
});
