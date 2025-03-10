import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  template: `
  <button class="font-medium text-white bg-blue-400 px-2 py-1 rounded hover:bg-blue-600 transition-colors" (click)="onClick.emit()">{{ label() }}</button>
  `,
  styles: ``
})
export class ButtonComponent {
  label = input('')
  onClick = output()
}
