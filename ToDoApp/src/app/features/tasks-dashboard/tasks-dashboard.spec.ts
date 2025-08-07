import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksDashboard } from './tasks-dashboard';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { IRootStateModel } from '../../state/models/states/root.state.model';
import { selectTasks } from '../../state/selectors/tasks.selectors';
import { selectTokenExists } from '../../state/selectors/tokens.selectors';
import { AlertsService } from '../../core/services/alerts/alerts.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NavigationService } from '../../core/services/navigation/navigation.service';
import { ChangeDetectorRef } from '@angular/core';
import { of } from 'rxjs';
import { ITask } from '../../state/models/interfaces/tasks.interfaces';

describe('TasksDashboard', () => {
  let component: TasksDashboard;
  let fixture: ComponentFixture<TasksDashboard>;
  let store: MockStore<IRootStateModel>;
  let alertsServiceSpy: jasmine.SpyObj<AlertsService>;
  let spinnerSpy: jasmine.SpyObj<NgxSpinnerService>;
  let navigationServiceSpy: jasmine.SpyObj<NavigationService>;

  const mockTasks: ITask[] = [
    { title: 'Task 1', description: 'description 1', completed: false },
    { title: 'Task 2', description: 'description 2', completed: true },
  ];

  beforeEach(async () => {
    alertsServiceSpy = jasmine.createSpyObj('AlertsService', ['showBasicIconAlert']);
    spinnerSpy = jasmine.createSpyObj('NgxSpinnerService', ['hide']);
    navigationServiceSpy = jasmine.createSpyObj('NavigationService', ['navigateTo']);

    await TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectTokenExists, value: false },
            { selector: selectTasks, value: mockTasks }
          ]
        }),
        { provide: AlertsService, useValue: alertsServiceSpy },
        { provide: NgxSpinnerService, useValue: spinnerSpy },
        { provide: NavigationService, useValue: navigationServiceSpy },
        ChangeDetectorRef
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TasksDashboard);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize userExists and tasks on ngOnInit', () => {
    component.ngOnInit();

    expect(spinnerSpy.hide).toHaveBeenCalled();
    expect(component.userExists).toBeFalse();
    expect(alertsServiceSpy.showBasicIconAlert).toHaveBeenCalledWith(
      "info",
      "User Registered",
      "Your user has been registered."
    );
    expect(component.originalTasks.length).toBe(2);
    expect(component.filteredTasks.length).toBe(2);
  });

  it('should filter tasks correctly', () => {
    component.originalTasks = mockTasks;

    component.filterTasks('task 1');
    expect(component.filteredTasks.length).toBe(1);
    expect(component.filteredTasks[0].title).toBe('Task 1');

    component.filterTasks('');
    expect(component.filteredTasks.length).toBe(2);
  });

  it('should navigate to create task page', () => {
    component.createTask();
    expect(navigationServiceSpy.navigateTo).toHaveBeenCalledWith('/task/create');
  });

  it('should return correct id in trackById', () => {
    const result = component.trackById(0, { id: 'abc123' });
    expect(result).toBe('abc123');
  });

  it('should complete destroy$', () => {
    const completeSpy = spyOn(component['destroy$'], 'complete').and.callThrough();
    const nextSpy = spyOn(component['destroy$'], 'next').and.callThrough();

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
