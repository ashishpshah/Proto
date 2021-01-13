import { NgModule, Component, ContentChild, OnInit, AfterViewInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControlName, NgForm } from '@angular/forms';

@Component({
  selector: '[validator]',
  template: `
    <ng-content></ng-content>
    <div *ngIf="formControl.invalid">
        <div *ngIf="formControl.errors.required && (form.submitted || formControl.dirty)">
             <span class="label label-danger">Please provide {{ formControl.name }}</span>
        </div>
        <div *ngIf="formControl.errors.email && (form.submitted || formControl.dirty)">
             <span class="label label-danger"> Please provide a valid email</span>
        </div>
        <div *ngIf="formControl.errors.notstring && (form.submitted || formControl.dirty)">
             <span class="label label-danger">Invalid name </span>
        </div>

    </div>
    <div *ngIf="formControl.status === 'PENDING'">
      <img src="https://i.forbesimg.com/assets/img/loading_spinners/43px_on_transparent.gif" /> Checking...
    </div>
    <div *ngIf="formControl.status === 'VALID'">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Antu_task-complete.svg/768px-Antu_task-complete.svg.png"> Good
     </div>
`,
styles: [
  `
    img {
      width: 20px;
      height: 20px;
    }
  `
]})

export class ValidatorComponent implements OnInit {
   @ContentChild(FormControlName) formControl;
   constructor(private form: NgForm) {

   }

   ngOnInit() { }

}
