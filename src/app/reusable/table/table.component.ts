import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full p-2 shadow-md" *ngIf="items && items.length > 0">
      <table class="min-w-full border border-gray-300">
        <thead class="bg-gray-100">
          <tr>
            <th
              *ngFor="let head of headers; let indx = index"
              class="py-2 px-4 border-b font-bold text-sm text-left text-gray-800"
            >
              {{ head.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of items; let indx = index">
            <td
              *ngFor="let head of headers; let indx = index"
              class="py-2 px-4 border-b font-bold text-sm text-left text-gray-800"
            >
              <ng-container *ngIf="head.key === 'action'">
                <div
                  (click)="onActionClick(item)"
                  class="relative cursor-pointer"
                >
                  <ng-container
                    *ngTemplateOutlet="
                      actionTemplate;
                      context: { $implicit: item }
                    "
                  >
                  </ng-container>
                  <div
                    class="w-[180px] rounded border absolute top-5 right-42 z-10 bg-white"
                    *ngIf="actionid === item.id"
                    (mouseleave)="onActionClick(item.id - item.id)"
                  >
                    <div class="text-center p-1">
                      <p class="p-4 P100 N600 text-center">ACTIONS</p>
                    </div>

                    <div
                      class="w-full hover:shadow-md"
                      *ngFor="let icon of myactions"
                    >
                      <div
                        class="flex gap-8 p-2 text-center rounded cursor-pointer"
                        (click)="
                          onEmitActions({ id: item.id, label: icon.label })
                        "
                      >
                        <img [src]="icon.icon" [alt]="icon.label" />
                        <p>{{ icon.label }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ng-container>

              <ng-container *ngIf="head.key !== 'action'">
                {{ item[head.key] }}
              </ng-container>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-end mt-4" *ngIf="showPagination">
        <button (click)="previousPage()" [disabled]="currentPage === 1"
          class="px-3 py-1 mx-1 border rounded text-gray-700 cursor-pointer hover:bg-cyan-200 hover:text-white">
          Previous
        </button>
        <span class="px-3 py-1 mx-1 border rounded bg-gray-200 text-gray-700">
          Page {{ currentPage }} of {{ totalPages }}
        </span>
        <button (click)="nextPage()" [disabled]="currentPage === totalPages"
          class="px-3 py-1 mx-1 border rounded text-gray-700 cursor-pointer hover:bg-cyan-200 hover:text-white">
          Next
        </button>
      </div>
    </div>

    <div class="w-full p-2 shadow-md" *ngIf="items && items.length === 0">
      <table class="min-w-full border border-gray-300">
        <thead class="bg-gray-100">
          <tr>
            <th
              *ngFor="let head of headers; let indx = index"
              class="py-2 px-4 border-b font-bold text-sm text-left text-gray-800"
            >
              {{ head.label }}
            </th>
          </tr>
        </thead>
      </table>
      <div class="w-full text-center p-2 font-bold">
        Sorry no data to display
      </div>
      <div class="w-full flex justify-center"></div>
    </div>
  `,
})
export class TableComponent {
  @Input() headers!: { key: string; label: string }[];
  @Input() items!: any[];
  @Input() actionTemplate!: TemplateRef<any>;
  @Input() actionid!: number;
  @Input() myactions: { id: number; icon: string; label: string }[] = [];
  @Output() emitItems = new EventEmitter<any>();
  @Output() emitactions = new EventEmitter<{ id: number; label: string }>();
  onActionClick(item: any) {
    this.emitItems.emit(item.id);
  }
  onEmitActions(event: { id: number; label: string }) {
    this.emitactions.emit(event);
  }

  displayedItems: any[] = [];
  itemsPerPage: number = 9;
  currentPage: number = 1;
  totalPages: number = 1;

  get showPagination(): boolean {
    return this.items.length > this.itemsPerPage;
  }

  ngOnInit() {
    this.calculateTotalPages();
    this.updateDisplayedItems();
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.items.length / this.itemsPerPage);
  }

  updateDisplayedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(
      startIndex + this.itemsPerPage,
      this.items.length
    );
    this.displayedItems = this.items.slice(startIndex, endIndex);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedItems();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedItems();
    }
  }
}
