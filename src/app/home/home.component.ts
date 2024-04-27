import { Component } from '@angular/core';
import { InputFieldComponent } from '../reusable/input-field/input-field.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [InputFieldComponent, CommonModule, FormsModule],
  template: `
    <div class="w-full h-screen border">
      <app-input-field
        [type]="'text'"
        [style]="''"
        [placeholder]="'Enter your firstname here...'"
        [required]="false"
        [label]="'firstname'"
        [identifier]="'firstname'"
        [model]="firstname"
        (modelChange)="onInputChange($event)"
      ></app-input-field>

      <app-input-field
        [type]="'text'"
        [style]="''"
        [placeholder]="'Enter your lastname here...'"
        [required]="false"
        [label]="'lastname'"
        [identifier]="'lastname'"
        [model]="lastname"
        (modelChange)="onInputChange($event)"
      ></app-input-field>

      <button (click)="click()">click</button>
    </div>
  `,
})
export class HomeComponent {
  String(arg0: any): string {
    throw new Error('Method not implemented.');
  }
  firstname = '';
  lastname = '';

  constructor() {}

  click() {
    console.log(this.firstname, this.lastname);
  }

  onInputChange(event: { value: string; identifier: string }) {
    if (event.identifier === 'firstname') {
      this.firstname = event.value;
      console.log(this.firstname)
    } else if (event.identifier === 'lastname') {
      this.lastname = event.value;
      console.log(this.lastname)
    }
  }

  ngOnInit() {}
}
