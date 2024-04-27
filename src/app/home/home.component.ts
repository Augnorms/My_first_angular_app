import { Component } from '@angular/core';
import { InputFieldComponent } from '../reusable/input-field/input-field.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SelectFieldComponent } from '../reusable/select-field/select-field.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [InputFieldComponent, SelectFieldComponent, CommonModule, FormsModule],
  template: `
    <div class="w-full h-screen border">
      <div *ngFor="let val of fields; let idx = index">
        <ng-container *ngIf="idx < 10">
          <app-input-field
            [type]="'text'"
            [style]="''"
            [placeholder]="placeholderData[idx]"
            [required]="false"
            [label]="labelData[idx]"
            [identifier]="identifyData[idx]"
            [model]="modelvalues[idx]"
            (modelChange)="onInputChange($event)"
          ></app-input-field>
        </ng-container>

      </div>

      <div>
       <app-select-field 
        [data]="[
          {itemId:1, itemName:'Male'},
          {itemId:2, itemName:'Female'}
        ]"
        [model]="selectModel"
        (modelChange)="handleSelect($event)"
        (selectChange)="onSelected($event)"
       />
      </div>

      <button (click)="click()" class="w-[10%] p-2 rounded border">
        click
      </button>
      <button (click)="onEdit('augustine', 'normanyo', '1')" class="w-[10%] p-2 rounded border ml-1">
        edit
      </button>
    </div>
  `,
})
export class HomeComponent {
  fields = new Array(2);
  placeholderData = ['Enter firstname', 'Enter lastname'];
  labelData = ['Firstname', 'Lastname'];
  identifyData = ['firstname', 'lastname'];

  modelvalues = ['', ''];
  selectModel = ''
  selctobject:{ itemId: number; itemName: string } = {
    itemId: 0,
    itemName: ''
  } 

  constructor() {}

  click() {
    console.log({
      'firstname': this.modelvalues[0],
      'lastname:': this.modelvalues[1],
      'select': this.selectModel,
      'selectoptions': this.selctobject
    });
    this.reset();
  }

  onInputChange(event: { value: string; identifier: string }) {
    if (event.identifier === 'firstname') {
      this.modelvalues[0] = event.value;
    } else if (event.identifier === 'lastname') {
      this.modelvalues[1] = event.value;
    }
  }

  handleSelect(event:string){
    let value = event
    this.selectModel = value;
  }

  onSelected(event:{ itemId: number; itemName: string }){
    this.selctobject = event
  }

  //simulate edit
  onEdit(firstname:string, lastname:string, gender:string){
    this.modelvalues[0] = firstname;
    this.modelvalues[1]  = lastname;
    this.selectModel = gender;
  }

  reset(){
    this.modelvalues.forEach((_, index) => {
      this.modelvalues[index] = '';
    });
    this.selectModel = '';
  }

  ngOnInit() {}
}
