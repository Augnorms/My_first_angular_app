import { Component } from '@angular/core';
import { InputFieldComponent } from '../reusable/input-field/input-field.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SelectFieldComponent } from '../reusable/select-field/select-field.component';
import { CheckboxComponent } from '../reusable/checkbox/checkbox.component';
import { TextAreaComponent } from '../reusable/text-area/text-area.component';
import { TableComponent } from '../reusable/table/table.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TextAreaComponent,
    InputFieldComponent,
    SelectFieldComponent,
    CheckboxComponent,
    TableComponent,
    CommonModule,
    FormsModule,
  ],
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
          [label]="'Gender'"
          [data]="[
            { itemId: 1, itemName: 'Male' },
            { itemId: 2, itemName: 'Female' }
          ]"
          [model]="selectModel"
          (modelChange)="handleSelect($event)"
          (selectChange)="onSelected($event)"
        />
      </div>

      <div>
        <app-checkbox
          [isChecked]="checked"
          (checkmodelChange)="handleCheck($event)"
        />
      </div>

      <div>
        <app-text-area
          label="Comment"
          placeholder="Enter text here..."
          [model]="textvalue"
          (modelChange)="handleTextChange($event)"
        />
      </div>

      <div class="p-2">
        <button (click)="click()" class="w-[10%] p-2 rounded border">
          click
        </button>
        <button
          (click)="onEdit('augustine', 'normanyo', '1', true)"
          class="w-[10%] p-2 rounded border ml-1"
        >
          edit
        </button>
      </div>

      <div>
        <app-table 
        [headers]="headers" 
        [items]="data" 
        [actionTemplate]="action" 
        (emitItems)="handleActionClick($event)"
        (emitactions)="handleEmitActions($event)"
        [actionid]="actionid"
        [myactions]="actionOptions"
        >
        </app-table>

        <ng-template #action let-item="item">
          <div class="flex gap-1">
            <img
              src="../../assets/elipse.svg"
              (click)="handleActionClick(item)"
            />
          </div>
        </ng-template>

      </div>
    </div>
  `,
})
export class HomeComponent {
  fields = new Array(2);
  placeholderData = ['Enter firstname', 'Enter lastname'];
  labelData = ['Firstname', 'Lastname'];
  identifyData = ['firstname', 'lastname'];
  modelvalues = ['', ''];

  selectModel = '';
  selctobject: { itemId: number; itemName: string } = {
    itemId: 0,
    itemName: '',
  };

  checked = false;

  textvalue = '';

  headers = [
    { key: 'id', label: 'Itemid' },
    { key: 'name', label: 'Name' },
    { key: 'amount', label: 'Amount' },
    { key: 'action', label: 'Action' },
  ];

  data = [
    { id: 1, name: 'Micro', amount: 2000 },
    { id: 2, name: 'Velli', amount: 2500 },
    { id: 3, name: 'Cello', amount: 1000 },
  ];

  actionOptions = [
    {id:1, icon:"../../assets/edit.svg", label:"Edit"},
    {id:1, icon:"../../assets/delete.svg", label:"Delete"}
  ]

  actionid = 0;

  constructor() {}

  handleActionClick(item: any) {
    this.actionid = item
  }

  handleEmitActions(event:{id:number, label:string}){
    console.log(event)
  }

  click() {
    console.log({
      firstname: this.modelvalues[0],
      'lastname:': this.modelvalues[1],
      select: this.selectModel,
      selectoptions: this.selctobject,
      checked: this.checked,
      text: this.textvalue,
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

  handleSelect(event: string) {
    let value = event;
    this.selectModel = value;
  }

  onSelected(event: { itemId: number; itemName: string }) {
    this.selctobject = event;
  }

  handleCheck(event: boolean) {
    this.checked = event;
  }

  handleTextChange(event: { value: string; identity: string }) {
    this.textvalue = event.value;
  }

  //simulate edit
  onEdit(firstname: string, lastname: string, gender: string, check: boolean) {
    this.modelvalues[0] = firstname;
    this.modelvalues[1] = lastname;
    this.selectModel = gender;
    this.checked = check;
  }

  reset() {
    this.modelvalues.forEach((_, index) => {
      this.modelvalues[index] = '';
    });
    this.selectModel = '';
    this.checked = false;
    this.textvalue = '';
  }

  ngOnInit() {}
}
