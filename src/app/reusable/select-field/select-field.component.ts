import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-field',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="w-full p-2">
      <div class="flex justify-between mb-2">
        <div class="w-1/2 text-start font-bold">{{ label }}</div>
        <div class="w-1/2 text-red-500 text-end font-bold" *ngIf="required">
          Required
        </div>
      </div>
      <div>
        <select
          [class]="
            'w-full p-2 bg-white border border-[#d8dae5] hover:border-[#8F95B2] text-gray-900 rounded-lg focus:outline-cyan-200 focus:ring-cyan-500 focus:ring placeholder-option ' +
            ' ' +
            style
          "
          [ngClass]="{ 'placeholder-option': !model }"
          [(ngModel)]="model"
          (ngModelChange)="onInputChange(model)"
          (ngModelChange)="onSelectChange($event)"
        >
          <option class="placeholder-option"  value="" disabled>{{ placeholder }}</option>
          <option
            *ngFor="let val of data; let idx = index"
            [value]="val.itemId"
            
          >
            {{ val.itemName }}
          </option>
        </select>
      </div>
    </div>
  `,
})
export class SelectFieldComponent {
  @Input() style!: string;
  @Input() label!: string;
  @Input() required!: boolean;
  @Input() placeholder: string = 'somthin here';
  @Input() data: { itemId: number; itemName: string }[] = [];
  @Input() model!: string;
  @Output() modelChange = new EventEmitter<string>();
  @Output() selectChange = new EventEmitter<{
    itemId: number;
    itemName: string;
  }>();

  onInputChange($event: string) {
    this.modelChange.emit($event);
  }
  onSelectChange(event: { itemId: number; itemName: string } | undefined) {
    this.selectChange.emit(event);
  }

  //lifecycle hook to keep track of data
  ngOnChanges(changes: any) {
    if (changes.model && this.data) {
      let find = this.data.find(
        (el) => el.itemId == changes.model.currentValue
      );
      this.onSelectChange(find);
    }
  }
}
