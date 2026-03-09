import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Notification } from './pages/notification/notification';
import { MyTasks } from './pages/my-tasks/my-tasks';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => Home,
  },
  {
    path: 'login',
    loadComponent: () => Login,
  },
  {
    path: 'register',
    loadComponent: () => Register,
  },
  {
    path: 'dashboard',
    loadComponent: () => Dashboard,
  },
  {
    path: 'notification',
    loadComponent: () => Notification,
  },
  {
    path: 'my-tasks',
    loadComponent: () => MyTasks,
  },
];
