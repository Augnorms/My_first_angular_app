import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="p-2 flex gap-2">
      <div [class]="isChecked ? 'p-1 bg-cyan-200 rounded' : 'p-1 border border-cyan-300 rounded'">
        <input
          type="checkbox"
          [class]="
            'bg-white' +
            ' ' +
            style
          "
          [id]="fieldId"
          [checked]="isChecked"
          (change)="onInputChange($event)"
        />
      </div>
      <div [class]="''">
        <label [for]="fieldId">{{ label }}</label>
      </div>
    </div>
  `,
})
export class CheckboxComponent {
  @Input() style!: string;
  @Input() fieldId!: string;
  @Input() label: string = 'yes / no';
  @Input() isChecked!: boolean;
  @Output() modelChange = new EventEmitter<boolean>();

  onInputChange(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.modelChange.emit(checked);
  }

  // ngOnChanges(changes: any) {
  //   console.log('changes',changes.isChecked.currentValue)
  // }
}
