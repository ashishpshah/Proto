import { DropdownListInt } from './../../../models/DropdownListInt';

import { Component,Input, OnInit } from '@angular/core';
// import { ItemMasterService } from "../item-master.service";
import { NgForm, FormBuilder, FormGroup, Validators, FormControl,FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs";
// import { ItemMaster } from "../item-master-model";
// import { LovMaster } from "../../../models/LovMaster";
// import { BrandMaster } from "../../../models/BrandMaster";
// import { SubCategoryMaster } from "../../../models/SubCategoryMaster";
// import { TypeMaster } from "../../../models/TypeMaster";

import { ProtoServicesService } from "../../../Services/proto-services.service";
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { stringify } from '@angular/compiler/src/util';
import { DropdownList } from './../../../models/DropdownList';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-add-edit-item',
  templateUrl: './add-edit-item.component.html',
  styleUrls: ['./add-edit-item.component.css']
})
export class AddEditItemComponent implements OnInit {
  // IsAddEdit = true;
  // @Input() showAddressParam: boolean = false;

  itemForm: FormGroup;
  title: string = "Create";
  itemId: number;
  errorMessage: any;
  StatusList : Observable<DropdownList[]>;
  UOMList : Observable<DropdownList[]>;
  SubCategoryList : Observable<DropdownListInt[]>;
  BrandList : Observable<DropdownListInt[]>;
  TypeList : Observable<DropdownListInt[]>;
  SelectedStatus : string = 'A';
  userId : string = localStorage.getItem('userId');
  isInserted : string = 'I';
  msgType : string = '';
  message : string = '';

  // StatusList = [{id : '0',name :'F'}];
  categories  = [
    {id: '1', name: 'Laravel'},
    {id: '2', name: 'Codeigniter'},
    {id: '3', name: 'React'},
    {id: '4', name: 'PHP'},
    {id: '5', name: 'Angular'},
    {id: '6', name: 'Vue'},
    {id: '7', name: 'JQuery', disabled: true},
    {id: '8', name: 'Javascript'},
  ];

  // selected = [
  //   {id: '5', name: 'Angular'},
  //   {id: '6', name: 'Vue'}
  // ];


  constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
    private _commonService : ProtoServicesService, private _router: Router) {
      debugger;
      if (this._avRoute.snapshot.params["id"]) {
        this.itemId = this._avRoute.snapshot.params["id"];
        this.isInserted = 'U';
      }

      this.itemForm = this._fb.group({
        Item_ID :0,
        Sub_Catg_ID: ['', [Validators.required]],
        SR_NO: new FormControl(''),
        Type_ID: ['', [Validators.required]],
        Brand_ID: ['', [Validators.required]],
        UOM: ['', [Validators.required]],
        Qty: ['', [Validators.required]],
        Price: ['', [Validators.required]],
        Display_Seq_No: ['', [Validators.required]],
        Status: new FormControl(''),
        Created_By: this.userId,
        IsInserted:this.isInserted
        // empName: ['', [Validators.required]],
        // gender: ['', [Validators.required]],
        // mobileNo: ['', [Validators.required,Validators.maxLength(10),]],
        // email: ['', [Validators.required]],
        // isRegularEmp: ['', [Validators.required]],
        // birthDate: ['', [Validators.required]]
      })

    }

  public loadResult() {
    return true;
  }
  ngOnInit(): void {
    this.getCommonList();
    if (this.itemId > 0) {
      this.title = "Edit";
      this._commonService.getItemById(this.itemId)
        .subscribe((resp) =>
        {
          debugger;
          this.SelectedStatus = resp.Status;
          this.itemForm.setValue(resp)
          , error => this.errorMessage = error
        });
    }

  }

  getCommonList(){
    //let StatusList = [{id : '0',name :'F'}];
     //this._commonService.GetLovDetailByColumn("ACTIVEINACTIVE");
     this._commonService.GetLovDetailByColumn("ACTIVEINACTIVE").subscribe(
      (data) =>
       {
          this.StatusList = data;
      }
    )

    this._commonService.GetLovDetailByColumn("UOM").subscribe(
      (data) =>
       {
        this.UOMList =  data;
      }
    )
    // this.SubCategoryList = this._commonService.GetActiveSubCategoryList();

    this._commonService.GetActiveSubCategoryList().subscribe(
      (data) =>
       {
         this.SubCategoryList = data;
      }
    )

    this._commonService.GetActiveBrandList().subscribe(
      (data) =>
       {
        this.BrandList =  data;
      }
    )

    this._commonService.GetActiveTypeList().subscribe(
      (data) =>
       {
        this.TypeList =  data;
      }
    )

  }

  save() {
    if (!this.itemForm.valid) {
      return;
    }
    if (this.title == "Create") {
      this._commonService.saveItem(this.itemForm.value)
        .subscribe((data) => {
          debugger;
          if (data != null && data != "e" && data != "r" && data != "o") {

            let splitData = data.toString().split("|");
            this.msgType = splitData.length > 0 ? splitData[0] :'E';
            this.message = splitData.length > 1 ? splitData[1] :'Something went wrong!';

            if (this.msgType == 'S') {
              Swal.fire('Item Added', this.message, 'success')
              this._router.navigate(['/master/item-master']);
            }else {
              Swal.fire('Error', this.message, 'error')
            }

          }else{
            Swal.fire('Error', 'Something went wrong!', 'error')
          }

        }, error => this.errorMessage = error)
    }
    else if (this.title == "Edit") {
      this._commonService.saveItem(this.itemForm.value)
        .subscribe((data) => {
          if (data != null && data != "e" && data != "r" && data != "o") {
            let splitData = data.toString().split("|");
            this.msgType = splitData.length > 0 ? splitData[0] :'E';
            this.message = splitData.length > 1 ? splitData[1] :'Something went wrong!';

            if (this.msgType == 'S') {
              Swal.fire('Item Updated', this.message, 'success')
              this._router.navigate(['/master/item-master']);
            }else {
              Swal.fire('Error', this.message, 'error')
            }
          }else{
            Swal.fire('Error', 'Something went wrong!', 'error')
          }
        }, error => this.errorMessage = error)
    }
  }

  cancel() {
    this._router.navigate(['/master/item-master']);
  }

  get Sub_Catg_ID() { return this.itemForm.get('Sub_Catg_ID'); }
  get SR_NO() { return this.itemForm.get('SR_NO'); }
  get Type_ID() { return this.itemForm.get('Type_ID'); }
  get Brand_ID() { return this.itemForm.get('Brand_ID'); }
  get UOM() { return this.itemForm.get('UOM'); }
  get Qty() { return this.itemForm.get('Qty'); }
  get Price() { return this.itemForm.get('Price'); }
  get Display_Seq_No() { return this.itemForm.get('Display_Seq_No'); }
  get Status() { return this.itemForm.get('Status'); }
  get Created_By() { return 'admin' }

}
