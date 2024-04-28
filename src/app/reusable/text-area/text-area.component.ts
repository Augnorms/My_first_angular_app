import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-text-area',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="p-2">
      <div class="mb-2">
        <div class="w-1/2 text-start font-bold">{{ label }}</div>
        <div class="w-1/2 text-red-500 text-end font-bold" *ngIf="required">
          Required
        </div>
      </div>
      <div>
        <textarea
          [class]="
            'w-full p-2 bg-white border border-[#d8dae5] hover:border-[#8F95B2] text-gray-900 rounded-lg focus:outline-cyan-200 focus:ring-cyan-500 focus:ring' +
            ' ' +
            style
          "
          [placeholder]="placeholder"
          [id]="textid"
          [(ngModel)]="model"
          (ngModelChange)="onInputChange($event)"
        ></textarea>
      </div>
    </div>
  `,
})
export class TextAreaComponent {
  @Input() label!: string;
  @Input() identity!: string;
  @Input() required!: string;
  @Input() style!: string;
  @Input() placeholder!: string;
  @Input() textid!: string;
  @Input() model!: string; // The text area's value
  @Output() modelChange = new EventEmitter<{
    value: string;
    identity: string;
  }>(); // Event to emit changes

  onInputChange($event: { value: string; identity: string }) {
    this.modelChange.emit({ value: this.model, identity: this.textid });
  }
}
