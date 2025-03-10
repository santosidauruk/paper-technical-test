import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <h1 class="text-xl lg:text-3xl font-bold p-4 lg:p-8">Technical Test paper.id</h1>
    <div class="container mx-auto px-4">
      <router-outlet />
    </div>
  `,
  styles: [],
})
export class AppComponent {
}
