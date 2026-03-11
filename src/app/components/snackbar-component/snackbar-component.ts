import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-snackbar-component',
  imports: [],
  templateUrl: './snackbar-component.html',
})
export class SnackbarComponent {
  @Input() message!: string;
}
