import { Component, computed, inject, signal } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../shared/types/user.type';
import { SpinnerComponent } from "../../shared/components/spinner/spinner.component";
import { AlertComponent } from "../../shared/components/alert/alert.component";

@Component({
  selector: 'app-user-detail',
  imports: [SpinnerComponent, AlertComponent],
  template: `
  @if(loading()) {
    <div class="w-24 h-24 mx-auto">
      <app-spinner></app-spinner>
    </div>
  } @else {
    @if(error()){
      <app-alert type="error" [message]="error()"/>
    } @else {
      <div class="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
        <div class="flex flex-col items-center py-10">
            <img class="w-24 h-24 md:w-36 md:h-36 mb-3 rounded-full shadow-lg" [src]="userProfileUrl()" [alt]="user()?.name"/>
            <h5 class="mb-1 text-lg md:text-xl font-medium text-gray-900">{{ user()?.name }}</h5>
            <span class="text-sm text-gray-500">{{user()?.address?.city}}</span>
            <div class="grid gap-4 mt-6 md:mt-6 lg:min-w-md grid-cols-2 px-4 text-sm md:text-base">
              <div class="flex flex-col justify-center gap-4">
                <div class="flex items-center">
                  <div class="p-1 bg-gray-100 rounded-full">
                    <svg className="w-4 h-4 md:w-6 md:h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16v-5.5A3.5 3.5 0 0 0 7.5 7m3.5 9H4v-5.5A3.5 3.5 0 0 1 7.5 7m3.5 9v4M7.5 7H14m0 0V4h2.5M14 7v3m-3.5 6H20v-6a3 3 0 0 0-3-3m-2 9v4m-8-6.5h1"/>
                    </svg>
                  </div>
                  <span class="ml-2">{{ user()?.email }}</span>
                </div>
                <div class="flex items-center">
                  <div class="p-1 bg-gray-100 rounded-full">
                    <svg class="w-4 h-4 md:w-6 md:h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 4h12M6 4v16M6 4H5m13 0v16m0-16h1m-1 16H6m12 0h1M6 20H5M9 7h1v1H9V7Zm5 0h1v1h-1V7Zm-5 4h1v1H9v-1Zm5 0h1v1h-1v-1Zm-3 4h2a1 1 0 0 1 1 1v4h-4v-4a1 1 0 0 1 1-1Z"/>
                    </svg>
                  </div>
                  <span class="ml-2">{{ user()?.company?.name }}</span>
                </div>
              </div>
              <div class="flex flex-col justify-center gap-4">
                <div class="flex items-center">
                  <div class="p-1 bg-gray-100 rounded-full">
                    <svg className="w-4 h-4 md:w-6 md:h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.427 14.768 17.2 13.542a1.733 1.733 0 0 0-2.45 0l-.613.613a1.732 1.732 0 0 1-2.45 0l-1.838-1.84a1.735 1.735 0 0 1 0-2.452l.612-.613a1.735 1.735 0 0 0 0-2.452L9.237 5.572a1.6 1.6 0 0 0-2.45 0c-3.223 3.2-1.702 6.896 1.519 10.117 3.22 3.221 6.914 4.745 10.12 1.535a1.601 1.601 0 0 0 0-2.456Z"/>
                    </svg>
                  </div>
                  <span class="ml-2">{{ user()?.phone }}</span>
                </div>
                <div class="flex items-center">
                  <div class="p-1 bg-gray-100 rounded-full">
                    <svg className="w-4 h-4 md:w-6 md:h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961"/>
                    </svg>
                  </div>
                  <a class="ml-2 text-blue-500" href="{{ user()?.website }}" target="_blank">{{ user()?.website }}</a>
                </div>
              </div>
            </div>  
        </div>
    </div>
    }
  }

    

  `,
  styles: ``
})

export class UserDetailComponent {
  userService = inject(UsersService)
  route = inject(ActivatedRoute)
  loading = signal<boolean>(true)
  user = signal<User | null>(null);
  error = signal<string>('');
  userProfileUrl = computed(() => `https://picsum.photos/id/${this.user()?.id}/144`)

  async ngOnInit(): Promise<void> {
    const userId = +this.route.snapshot.params['id']
    this.userService.fetchUserById(userId)
      .then((user) => { this.user.set(user)})
      .catch((error) => { this.error.set(error.message) })
      .finally(() => { this.loading.set(false) })
  }
}
