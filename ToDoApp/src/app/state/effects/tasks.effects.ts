import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, mergeMap, of, switchMap } from "rxjs";
import { AlertsService } from "../../core/services/alerts/alerts.service";
import { NgxSpinnerService } from "ngx-spinner";
import { TasksService } from "../../core/services/tasks/tasks.service.ts";
import { NavigationService } from "../../core/services/navigation/navigation.service";

@Injectable()
export class TasksEffects {
  private actions$ = inject(Actions);
  private alertsService: AlertsService = inject(AlertsService);
  private spinner: NgxSpinnerService = inject(NgxSpinnerService);
  private tasksService: TasksService = inject(TasksService);
  private navigationService: NavigationService = inject(NavigationService);

  loadUserTasksEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType("[Tasks] Load User Tasks"),
      mergeMap(() => this.tasksService.loadUserTasks()
        .pipe(
          switchMap((response: any) => {
            return [
              { type: '[Tasks] Load User Tasks Success', tasks: response },
            ]
          }),
          catchError((error: any) => {
            this.spinner.hide();
            this.alertsService.showConfirmAndNavigate('error', 'Error', 'Failed to load user tasks. Try again later.', "/logout");
            return of({ type: '[Tasks] Load User Tasks Error' });
          })
        )
      )
    )
  );

  createUserTaskEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType("[Tasks] Create User Task"),
      mergeMap((action) => this.tasksService.createTask(action.task)
        .pipe(
          switchMap((response: any) => {
            this.navigationService.navigateTo("/tasks")
            return [
              { type: '[Tasks] Create User Task Success', task: response },
            ]
          }),
          catchError((error: any) => {
            this.spinner.hide();
            this.alertsService.showBasicIconAlert('error', 'Error', 'The task could not be created. Please try again.');
            return of({ type: '[Tasks] Create User Task Error' });
          })
        )
      )
    )
  );

  updateUserTaskEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType("[Tasks] Update User Task"),
      mergeMap((action) => this.tasksService.updateTask(action.task)
        .pipe(
          switchMap((response: any) => {
            this.navigationService.navigateTo("/tasks")
            return [
              { type: '[Tasks] Update User Task Success', task: action.task },
            ]
          }),
          catchError((error: any) => {
            this.spinner.hide();
            this.alertsService.showBasicIconAlert('error', 'Error', 'The task could not be updated. Please try again..');
            return of({ type: '[Tasks] Update User Task Error' });
          })
        )
      )
    )
  );

  deleteUserTaskEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType("[Tasks] Delete User Task"),
      mergeMap((action) => this.tasksService.deleteTask(action.task)
        .pipe(
          switchMap((response: any) => {
            this.navigationService.navigateTo("/tasks")
            return [
              { type: '[Tasks] Delete User Task Success', taskId: action.task.id },
            ]
          }),
          catchError((error: any) => {
            this.spinner.hide();
            this.alertsService.showBasicIconAlert('error', 'Error', 'The task could not be updated. Please try again..');
            return of({ type: '[Tasks] Delete User Task Error' });
          })
        )
      )
    )
  );
}