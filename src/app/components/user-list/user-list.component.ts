import { Component, inject, signal } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ButtonComponent } from "../../shared/components/button/button.component";
import { Router } from '@angular/router';
import { User } from '../../shared/types/user.type';
import { SpinnerComponent } from "../../shared/components/spinner/spinner.component";
import { AlertComponent } from "../../shared/components/alert/alert.component";

@Component({
  selector: 'app-user-list',
  imports: [ButtonComponent, SpinnerComponent, AlertComponent],
  template: `
  @if (loading()) {
    <div class="w-24 h-24 mx-auto">
      <app-spinner></app-spinner>
    </div>
  } @else {
    @if (error()) {
      <app-alert type="error" [message]="error()"/>
    }
    @else {
      <div class="relative overflow-x-auto shadow-md rounded-lg">
          <table class="w-full text-sm text-left text-gray-500">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                      <th scope="col" class="px-6 py-3">
                          Name
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Email
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Website
                      </th>
                      <th scope="col" class="px-6 py-3">
                          <span class="sr-only">Action</span>
                      </th>
                  </tr>
              </thead>
              <tbody>
                @for(user of users(); track user.id) {
                  <tr class="bg-white border-b border-gray-200 hover:bg-gray-50 ">
                      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          {{ user.name }}
                      </th>
                      <td class="px-6 py-4">
                          {{user.email}}
                      </td>
                      <td class="px-6 py-4">
                          {{ user.website }}
                      </td>
                      <td class="px-6 py-4 text-right">
                        <app-button label="Go to detail" (onClick)="gotoDetail(user.id)"/>
                      </td>
                  </tr>
                }
              </tbody>
          </table>
      </div>
    }
  }
  `, 
})

export class UserListComponent {
  userService = inject(UsersService)
  router = inject(Router)
  loading = signal<boolean>(true)
  users = signal<User[]>([]);
  error = signal<string>('');

  ngOnInit(): void {
    this.userService.fetchUsers()
      .then((users) => { this.users.set(users)})
      .catch((error) => { this.error.set(error.message) })
      .finally(() => { this.loading.set(false) })
  }

  gotoDetail(userId: number) {
    this.router.navigate(['users', userId])
  }
}
