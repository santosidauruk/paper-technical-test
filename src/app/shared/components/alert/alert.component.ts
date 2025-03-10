import { Component, input } from '@angular/core';

@Component({
  selector: 'app-alert',
  imports: [],
  template: `
     <div class="p-4 mx-auto max-w-screen-sm">
        <div role="alert" class="h-12 flex items-center justify-center rounded-lg" [class]="type() === 'error' ? 'bg-red-100' : 'bg-blue-100'">
          {{ message() }}
        </div>
      </div>
  `,
  styles: ``
})
export class AlertComponent {
  message = input.required<string>()
  type = input<string>('')
}
