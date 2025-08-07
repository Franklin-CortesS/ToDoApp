import { Component } from '@angular/core';
import { Button } from '../../shared/components/button/button';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { IRootStateModel } from '../../state/models/states/root.state.model';
import { selectTaskById } from '../../state/selectors/tasks.selectors';
import { ITask } from '../../state/models/interfaces/tasks.interfaces';
import { Header } from '../../shared/components/header/header';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { booleanValidator } from '../../shared/form-validators/boolean.validator';
import { createUserTasksAction, updateUserTasksAction } from '../../state/actions/tasks.actions';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  imports: [Header, Button, ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss'
})
export class TaskForm {
  action: "Create" | "Update" = "Create";
  taskId: string = '';
  task: ITask = {
    title: "",
    description: "",
    completed: false,
  }

  inputTitle: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(30)
  ]);

  inputDescription: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100)
  ]);

  inputCompleted: FormControl = new FormControl(false, [
    Validators.required,
    booleanValidator()
  ]);

  taskForm: FormGroup = new FormGroup({
    title: this.inputTitle,
    description: this.inputDescription,
    completed: this.inputCompleted
  });

  constructor(private route: ActivatedRoute, private store: Store<IRootStateModel>, private spinner: NgxSpinnerService) {

  }

  ngOnInit() {
    if (this.route.snapshot.routeConfig?.path === 'task/create') {
      this.action = 'Create';
    } else {
      this.action = 'Update';
      this.taskId = this.route.snapshot.paramMap.get('id')!;
      this.store.select(selectTaskById(this.taskId)).subscribe((task) => {
        if (task) {
          this.task = task;
          this.taskForm.patchValue({
            title: task.title,
            description: task.description,
            completed: task.completed,
          });

          this.taskForm.updateValueAndValidity();
        }
      })
    }
  }

  processTask() {
    this.spinner.show();
    let data = {
      ...this.task,
      title: this.inputTitle.value,
      description: this.inputDescription.value,
      completed: this.inputCompleted.value
    }

    if (this.action == "Create") {
      this.store.dispatch(createUserTasksAction({ task: data }))
    }
    else {
      this.store.dispatch(updateUserTasksAction({ task: data }))
    }
  }
}
