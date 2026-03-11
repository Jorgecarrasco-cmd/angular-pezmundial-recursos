import { Component, input, output } from '@angular/core';

interface PaginationMeta {
  page: number;
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}

@Component({
  selector: 'app-pagination',
  template: `
    @if (meta(); as m) {
      <div class="join flex justify-center">
        <button class="join-item btn" [disabled]="!m.hasPrevPage" (click)="goToPage(1)">«</button>
        <button class="join-item btn" [disabled]="!m.hasPrevPage" (click)="goToPage(m.page - 1)">‹</button>
        <button class="join-item btn btn-active">{{ m.page }} / {{ m.totalPages }}</button>
        <button class="join-item btn" [disabled]="!m.hasNextPage" (click)="goToPage(m.page + 1)">›</button>
        <button class="join-item btn" [disabled]="!m.hasNextPage" (click)="goToPage(m.totalPages)">»</button>
      </div>
    }
  `
})
export class PaginationComponent {
  meta = input.required<PaginationMeta>();
  pageChange = output<number>();

  goToPage(page: number) {
    this.pageChange.emit(page);
  }
}
