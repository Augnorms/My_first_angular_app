import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-field',
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
        <input
          [type]="type"
          [placeholder]="placeholder"
          [class]="
            'w-full p-2 bg-white border border-[#d8dae5] hover:border-[#8F95B2] text-gray-900 rounded-lg focus:outline-cyan-200 focus:ring-cyan-500 focus:ring' +
            ' ' +
            style
          "
          [required]="required"
          [(ngModel)]="model"
          (ngModelChange)="onInputChange($event)"
        />
      </div>
    </div>
  `,
})
export class InputFieldComponent {
  @Input() style!: string;
  @Input() type!: string;
  @Input() placeholder!: string;
  @Input() label!: string;
  @Input() required!: boolean;
  @Input() identifier!: string;
  @Input() model!: string;
  @Output() modelChange = new EventEmitter<{ value: string; identifier: string }>();

  onInputChange($event: { value: string; identifier: string }) {
    this.modelChange.emit({ value: this.model, identifier: this.identifier });
  }
}
