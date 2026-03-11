import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import 'cally';

@Component({
  selector: 'app-calendar-page',
  imports: [],
  templateUrl: './calendar-page.html',
  styleUrl: './calendar-page.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CalendarPage {}
