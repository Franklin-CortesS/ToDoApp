import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IRootStateModel } from '../../state/models/states/root.state.model';
import { selectTokenExists } from '../../state/selectors/tokens.selectors';
import { AlertsService } from '../../core/services/alerts/alerts.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Header } from '../../shared/components/header/header';
import { TaskCard } from '../../shared/components/task-card/task-card';
import { ITask } from '../../state/models/interfaces/tasks.interfaces';
import { selectTasks } from '../../state/selectors/tasks.selectors';
import { CommonModule } from '@angular/common';
import { Button } from '../../shared/components/button/button';
import { NavigationService } from '../../core/services/navigation/navigation.service';
import { FormsModule } from '@angular/forms';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-tasks-dashboard',
  imports: [CommonModule, FormsModule, Header, TaskCard, Button],
  standalone: true,
  templateUrl: './tasks-dashboard.html',
  styleUrl: './tasks-dashboard.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TasksDashboard implements OnInit, OnDestroy {
  userExists: boolean = false;
  originalTasks: ITask[] = [];
  filteredTasks: ITask[] = [];
  searchTerm: string = '';

  private destroy$ = new Subject<void>();

  constructor(private store: Store<IRootStateModel>, private alertsService: AlertsService, private spinner: NgxSpinnerService, private changeDetectorRef: ChangeDetectorRef, private navigationService: NavigationService) { }

  ngOnInit() {
    this.spinner.hide();

    this.store.select(selectTokenExists).pipe(
      take(1),
      takeUntil(this.destroy$)
    ).subscribe(user => {
      this.userExists = user;

      if (!this.userExists) {
        this.alertsService.showBasicIconAlert("info", "User Registered", "Your user has been registered.");
      }
    });

    this.store.select(selectTasks).pipe(
      takeUntil(this.destroy$)
    ).subscribe(tasks => {
      this.originalTasks = tasks;
      this.filteredTasks = this.originalTasks;
      this.spinner.hide();
      this.changeDetectorRef.detectChanges();
    })
  }

  createTask() {
    this.navigationService.navigateTo("/task/create")
  }

  filterTasks(searchTerm: string) {
    if (searchTerm) {
      this.filteredTasks = this.originalTasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.filteredTasks = this.originalTasks;
    }
  }

  trackById(index: number, item: any): string {
    return item.id;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}