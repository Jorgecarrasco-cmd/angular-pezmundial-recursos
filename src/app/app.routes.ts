import { Routes } from '@angular/router';
import { ResourcePage } from './resources/pages/resource-page/resource-page';
import { RegisterComponent } from './auth/register/register';
import { Login } from './auth/login/login';
import { UsersPage } from './users/pages/users-page/users-page';
import { CalendarPage } from './calendar/pages/calendar-page/calendar-page';
import { AdminPage } from './admin/pages/admin-page/admin-page';
import { AddResource } from './admin/pages/add-resource/add-resource';
import { AddTag } from './admin/pages/add-tag/add-tag';
import { AddAuthor } from './admin/pages/add-author/add-author';
import { AddSerie } from './admin/pages/add-serie/add-serie';

export const routes: Routes = [
  { path: '', component: ResourcePage },

  //auth
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: Login },
  //users
  { path: 'users', component: UsersPage },
  //calendar
  { path: 'calendar', component: CalendarPage },
  {
    path: 'admin',
    component: AdminPage,
    children: [
      { path: 'add-resource', component: AddResource },
      { path: 'add-tag', component: AddTag },
      { path: 'add-author', component: AddAuthor },
      { path: 'add-serie', component: AddSerie },
    ],
  },
];
