import { Component, Input } from '@angular/core';

interface button {
  icon: string;
  title: string;
}

@Component({
  selector: 'app-menu-boton',
  imports: [],
  templateUrl: './menu-boton.html',
  styleUrl: './menu-boton.css',
})
export class MenuBoton {
  @Input() buttons!: button[];
}
