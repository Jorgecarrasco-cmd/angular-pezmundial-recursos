import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-neutral-button',
  imports: [],
  templateUrl: './neutral-button.html',
  styleUrl: './neutral-button.css',
})
export class NeutralButton {
  @Input() text!: string;
  @Input() icon!: string;
  @Input() extraClass: string = '';
  @Input() type: string = '';
  @Input() disabled: boolean = false
  @Output() onClick = new EventEmitter<void>();

  baseClass = 'rounded-2xl btn bg-[#074D82] text-white border-none hover:bg-[#32A0DC]';

  get classes() {
  return `${this.baseClass} ${this.extraClass} ${this.disabled ? 'opacity-50 cursor-not-allowed' : ''}`;
}
}
