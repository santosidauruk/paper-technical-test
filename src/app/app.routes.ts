import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';

export const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  component: UserListComponent
},
{
  path: 'users/:id',
  component: UserDetailComponent
},
];
