import { DropdownList } from './../../../../models/DropdownList';
import { AdminCommonHelperComponent } from './../../AdminCommonHelper/AdminCommonHelper.component';
import { DropdownListInt } from './../../../../models/DropdownListInt';

import { Component, ElementRef, Input, OnInit } from '@angular/core';
// import { ItemMasterService } from "../item-master.service";
import { NgForm, FormBuilder, FormGroup, Validators, FormControl, FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs";
// import { ItemMaster } from "../item-master-model";
// import { LovMaster } from "../../../models/LovMaster";
// import { BrandMaster } from "../../../models/BrandMaster";
// import { SubCategoryMaster } from "../../../models/SubCategoryMaster";
// import { TypeMaster } from "../../../models/TypeMaster";
import * as $ from 'jquery'
import { ProtoServicesService } from "../../../Services/proto-services.service";
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { stringify } from '@angular/compiler/src/util';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { environment } from 'src/environments/environment';

export class objItem {
  public constructor(init?: Partial<objItem>) {
        Object.assign(this, init);
    }
}

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
  StatusList: Observable<DropdownList[]>;
  UOMList: Observable<DropdownList[]>;
  SubCategoryList: Observable<DropdownList[]>;
  BrandList: Observable<DropdownListInt[]>;
  TypeList: Observable<DropdownListInt[]>;
  SelectedStatus: string = 'A';
  userId: string = localStorage.getItem('userId');
  isInserted: string = 'I';
  msgType: string = '';
  message: string = '';

  Item_File: File;
  Image_Path: string = environment.Default_Image_Path;

  constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
    private _commonService: ProtoServicesService, private _router: Router) {

    if (this._avRoute.snapshot.params["id"]) {
      this.itemId = this._avRoute.snapshot.params["id"];
      this.isInserted = 'U';
    }

    this.itemForm = this._fb.group({
      Item_ID: 0,
      Item_Name: ['', [Validators.required]],
      Item_Name_D: ['', [Validators.required]],
      Cat_SubCat_Id: ['', [Validators.required]],
      SR_NO: new FormControl(''),
      Type_ID: ['', [Validators.required]],
      Brand_ID: ['', [Validators.required]],
      UOM: ['', [Validators.required]],
      Qty: ['', [Validators.required]],
      Price: ['', [Validators.required]],
      Display_Seq_No: ['', [Validators.required]],
      Status: new FormControl(''),
      Created_By: this.userId,
      IsInserted: this.isInserted,
      Sub_Catg_ID: new FormControl(''),
      Catg_Id: new FormControl(''),
      Created_Date: new FormControl(''),
      Modified_By: new FormControl(''),
      Modified_Date: new FormControl(''),
      IsDeleted: new FormControl(''),

      StatusDesc: new FormControl(''),
      Deleted_By: new FormControl(''),
      Deleted_Date: new FormControl(''),
      Deleted: new FormControl(''),
      CategoryName: new FormControl(''),
      SubCategoryName: new FormControl(''),
      Brand_Name: new FormControl(''),
      Type_Name: new FormControl(''),
      // empName: ['', [Validators.required]],
      // gender: ['', [Validators.required]],
      // mobileNo: ['', [Validators.required,Validators.maxLength(10),]],
      // email: ['', [Validators.required]],
      // isRegularEmp: ['', [Validators.required]],
      // birthDate: ['', [Validators.required]]
      AttachmentId: new FormControl(''),
      Image_Path: new FormControl('')
    })

    this.Image_Path = environment.Default_Image_Path;

    // this.previewImage();

  }
  commonHelper = new AdminCommonHelperComponent(this._router);
  warningMessage: string = this.commonHelper.commonWarningMessage;
  deleteTooltip: string = this.commonHelper.deleteTooltip;
  restoreTooltip: string = this.commonHelper.restoreTooltip;
  required: string = this.commonHelper.required;
  public loadResult() {
    return true;
  }
  ngOnInit(): void {
    this.getCommonList();

    if (this.itemId > 0) {
      this.title = "Edit";
      this._commonService.getItemById(this.itemId)
        .subscribe((resp) => {
          this.SelectedStatus = resp.Status;
          this.itemForm.setValue(resp)
          this.previewImage()
          , error => this.errorMessage = error
        });

    }else{

    this.previewImage();

    }

  }

  previewImage(){

    debugger;

    this.Image_Path = null;

    if(this.itemForm.get('Image_Path').value == "" || this.itemId == 0){
      this.Image_Path = environment.Default_Image_Path;
    }
    else{
      this.Image_Path = environment.Api_Host + this.itemForm.get('Image_Path').value;
    }
  }


  ChangeItemImage(event) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.Item_File = file;

      var reader = new FileReader();
            reader.onload = (event: any) => {
              this.Image_Path = event.target.result;
            }
            reader.readAsDataURL(event.target.files[0]);

      if (!this.validateFile(this.Item_File.name)) {
        alert('Selected file format is not supported');
        this.Item_File = null;
        return false;
      }
    }
  }

  validateFile(name: String) {

    let allImages: Array<string> = ['png', 'jpg', 'jpeg', 'gif', 'tiff', 'bpg'];

    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (allImages.indexOf(ext.toLowerCase()) === -1) {
      return false;
    }
    else {
      return true;
    }
  }

  getCommonList() {
    //let StatusList = [{id : '0',name :'F'}];
    //this._commonService.GetLovDetailByColumn("ACTIVEINACTIVE");
    this._commonService.GetLovDetailByColumn("ACTIVEINACTIVE").subscribe(
      (data) => {
        this.StatusList = data;
      }
    )

    this._commonService.GetLovDetailByColumn("UOM").subscribe(
      (data) => {
        this.UOMList = data;
      }
    )
    // this.SubCategoryList = this._commonService.GetActiveSubCategoryList();

    this._commonService.GetActiveSubCategoryList().subscribe(
      (data) => {
        this.SubCategoryList = data;
      }
    )

    this._commonService.GetActiveBrandList().subscribe(
      (data) => {
        this.BrandList = data;
      }
    )

    this._commonService.GetActiveTypeList().subscribe(
      (data) => {
        this.TypeList = data;
      }
    )

  }

  save() {
    if (!this.itemForm.valid) {
      return;
    }

    const formData = new FormData();

    if(this.Item_File != null){
      formData.append('file', this.Item_File, this.Item_File.name);
    }

    debugger;

    if (Number(this.itemForm.get('Item_ID').value) == 0) {

      // this.itemForm.value.IsInserted = 'I';

      this.itemForm.controls['IsInserted'].setValue('I');

      let obj = new objItem(this.itemForm.value);
      formData.append('jsonObj', JSON.stringify(obj));

      // this._commonService.saveItem(this.itemForm.value)
      this._commonService.saveItemWithImage(formData)
        .subscribe((data) => {
          debugger;
          this.commonHelper.commonAlert('Inserted', data, '/master/item-master')

          this.previewImage();

        }, error => this.errorMessage = error)
    }
    else if (Number(this.itemForm.get('Item_ID').value) > 0) {

      // this.itemForm.value.IsInserted = 'U';

      this.itemForm.controls['IsInserted'].setValue('U');

      let obj = new objItem(this.itemForm.value);
      formData.append('jsonObj', JSON.stringify(obj));

      //this._commonService.saveItem(this.itemForm.value)
      this._commonService.saveItemWithImage(formData)
        .subscribe((data) => {
          debugger;
          this.commonHelper.commonAlert('Updated', data, '/master/item-master')

          this.previewImage();

        }, error => this.errorMessage = error)
    }
  }

  cancel() {
    debugger;
    this._router.navigate(['/master/item-master']);
  }

  get Item_Name() { return this.itemForm.get('Item_Name'); }
  get Item_Name_D() { return this.itemForm.get('Item_Name_D'); }
  get Cat_SubCat_Id() { return this.itemForm.get('Cat_SubCat_Id'); }
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
