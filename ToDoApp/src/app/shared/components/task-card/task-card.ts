import { Component, Input } from '@angular/core';
import { ITask } from '../../../state/models/interfaces/tasks.interfaces';
import { Dates } from "../../../shared/classes/dates";
import { Button } from '../button/button';
import { Store } from '@ngrx/store';
import { IRootStateModel } from '../../../state/models/states/root.state.model';
import { deleteUserTasksAction, updateUserTasksAction } from '../../../state/actions/tasks.actions';
import { NgxSpinnerService } from 'ngx-spinner';
import { NavigationService } from '../../../core/services/navigation/navigation.service';

@Component({
  selector: 'app-task-card',
  imports: [Button],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss'
})
export class TaskCard {
  @Input() task: ITask = {
    id: "",
    title: "",
    description: "",
    completed: false,
    createdAt: ""
  }

  constructor(private store: Store<IRootStateModel>, private spinner: NgxSpinnerService, private navigationService: NavigationService) {

  }

  formatDate() {
    if (this.task.createdAt) {
      return Dates.formatTimestamp(this.task.createdAt.toString())
    }
    else {
      return "";
    }
  }

  completeTask() {
    this.spinner.show();
    this.store.dispatch(updateUserTasksAction({task: {...this.task, completed: true}}))
  }

  updateTask() {
    this.navigationService.navigateTo("task/update/" + this.task.id)
  }

  deleteTask() {
    this.spinner.show();
    this.store.dispatch(deleteUserTasksAction({task: this.task}))
  }
}
