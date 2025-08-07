import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/login/login').then(m => m.Login)
  },
  {
    path: 'logout',
    loadComponent: () => import('./features/logout/logout').then(m => m.Logout)
  },
  {
    path: 'tasks',
    loadComponent: () => import('./features/tasks-dashboard/tasks-dashboard').then(m => m.TasksDashboard),
    canActivate: [authGuard]
  },
  {
    path: 'task/create',
    loadComponent: () => import('./features/task-form/task-form').then(m => m.TaskForm),
    canActivate: [authGuard]
  },
  {
    path: 'task/update/:id',
    loadComponent: () => import('./features/task-form/task-form').then(m => m.TaskForm),
    canActivate: [authGuard]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
