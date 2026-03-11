import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NeutralButton } from "../../../components/neutral-button/neutral-button";
import { MenuBoton } from "../../../components/menu-boton/menu-boton";

@Component({
  selector: 'app-resource-card',
  imports: [DatePipe, NeutralButton, MenuBoton],
  templateUrl: './resource-card.html',
  styleUrl: './resource-card.css',
})
export class ResourceCard {
  @Input() title!: string;
  @Input() resume!: string;
  @Input() imageUrl!: string;
  @Input() author!: string;
  @Input() date!: Date;
  @Input() bibleBook! : string
  @Input() private! : boolean
}
