import { DropdownList } from 'src/app/models/DropdownList';
import { AdminCommonHelperComponent } from './../../AdminCommonHelper/AdminCommonHelper.component';
import { PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';
import { ProtoServicesService } from './../../../Services/proto-services.service';
import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { env } from 'process';

@Component({
  selector: 'app-root-category-list',
  templateUrl: './root-category-list.component.html',
  styleUrls: ['./root-category-list.component.scss']
})
/************************************* Developed By RAJESH *******************************/
export class RootCategoryListComponent implements OnInit {

  loading: boolean = true;
  IsAddEdit :boolean = false;
  rootCategoryMaster : any[] = [];
  selectedRootCategoryMaster : [];
  userId : string = localStorage.getItem('userId');
  msgType : string = '';
  message : string = '';
  @ViewChild('dt') table: Table;
  IsRowEdit : boolean =false; // Inline edit
  //------------ Add Edit----------------
  rootCategoryObj :any = null;

    title: string = "Create";
    rootCategoryId: number;
    errorMessage: any ='';
    StatusList : Observable<DropdownList[]>;
    RootList : Observable<DropdownList[]>;
    SelectedStatus : string = 'A';
    isInserted : string = 'I';
  //-------------------------------------

  Image_File: File;
  Image_Path: string = environment.Default_Image_Path;

  constructor( private _commonService : ProtoServicesService, private _router: Router, private primengConfig: PrimeNGConfig, private renderer: Renderer2) {

    if(this.rootCategoryObj == null){

      this.title = "Create";
      this.rootCategoryObj = RootCategoryFun(this.isInserted);

    }

    this.previewImage();

   }
  commonHelper = new AdminCommonHelperComponent(this._router);
  warningMessage : string  = this.commonHelper.commonWarningMessage;
  deleteTooltip : string  = this.commonHelper.deleteTooltip;
  restoreTooltip : string  = this.commonHelper.restoreTooltip;
  required : string  = this.commonHelper.required;
  ngOnInit(): void  {
    this.IsAddEdit = false;
    this.getRootCategoryList();
    this.previewImage();
}

getRootCategoryList(){
  this._commonService.getRootCategoryList('0').subscribe(
    (data) =>
      {
      this.rootCategoryMaster =  data;
      this.rootCategoryMaster.map(row => {
        row.isEditable = false;
      });
      this.loading = false;
    }
  );
}

openInsertPage(){
  this._router.navigate(['/master/add-edit-root-category']);
}

// openEditPage(id){
//   this._router.navigate(['/master/add-edit-root-category',id]);
// }

deleteItem(rootCategoryId) {
  // var ans = confirm("Are you sure ? You want to delete it?");
  Swal.fire({
    icon: 'warning',
    title: 'Do you want to delete?',
    text:"You won't be able to revert this!",
    // showDenyButton: true,
    showCancelButton: true,
    confirmButtonColor: 'green',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Delete',
    // denyButtonText: 'Cancel',
  }).then((result) => {

    if (result.isConfirmed) {
      this._commonService.deleteRootCategory(rootCategoryId,this.userId).subscribe((data) => {
        let ret = this.commonHelper.activeInactiveAlert('Deleted',data);
          if (ret == 'S') {
            this.getRootCategoryList();
          }
    }, error => console.error(error))
    }
  })
}

activateItem(rootCategoryId) {
      this._commonService.activeRootCategory(rootCategoryId,this.userId).subscribe((data) => {
        let ret = this.commonHelper.activeInactiveAlert('Activated',data);
        if (ret == 'S') {
          this.getRootCategoryList();
        }
      }, error => console.error(error))
}


//------------------------- Insert Update Functionality
openEditPage(row){
  this.getCommonList();
  this.IsRowEdit = true;
  this.rootCategoryMaster.filter(row => row.isEditable).map(r => { r.isEditable = false; return r })
  row.isEditable = true;
 }
 cancelUpdate(row) {
  this.IsRowEdit = false;
  row.isEditable = false;
  this.getRootCategoryList();
}
updateRootCategory(item : any) {
  if(this.validateInline(item)){
    item.Created_By = this.userId;
    item.IsInserted = 'U';
      this._commonService.saveRootCategory(item)
        .subscribe((data) => {
          this.commonHelper.commonAlerts('Updated', data, '/master/root-category-master', '/master/add-edit-brand')
          item.isEditable = false;
        }, error => this.errorMessage = error)
  }
}
validateInline(item) : any{
  if(item.Root_Header_ID == null || item.Root_Header_ID == '' || item.Root_Header_ID == '0' || item.Root_Header_ID == 0 )
  {
    this.errorMessage = "Please Select Root";
    // this.renderer.selectRootElement('#Root_Header_ID').focus();
    return false;
  }
  else if(item.RCatg_Name == ''){
    this.errorMessage = "Please Enter Root Category Name";
    // this.renderer.selectRootElement('#Root_Name_'+item.Root_Header_ID).focus();
    return false;
  }
  else if(item.RCatg_Name_D == '')
  {
    this.errorMessage = "Please Enter Root Category Name (Danish)";
    this.renderer.selectRootElement('#RCatg_Name_D').focus();
    return false;
  }
  else if(item.Display_Seq_No == '' || item.Display_Seq_No == '0' || item.Display_Seq_No == 0 )
  {
    this.errorMessage = "Please Enter Display Seq No";
    this.renderer.selectRootElement('#Display_Seq_No').focus();
    return false;
  }
  else{
    return true;
  }


  }

addEditOpen(id : any):void {
  debugger;
  this.errorMessage = '';
  this.IsAddEdit = true;
  this.IsRowEdit = false;
  this.getCommonList();

  this.rootCategoryId = id;
  if (this.rootCategoryId > 0) {
    debugger;
    this.title = "Edit";
    this._commonService.getRootCategoryById(this.rootCategoryId)
      .subscribe((resp) =>
      {
        debugger;
        this.rootCategoryObj = resp
        this.previewImage()
        , error => this.errorMessage = error
      });
  }else {
    this.title = "Create";
    this.rootCategoryObj = RootCategoryFun(this.isInserted);
    this.previewImage()
  }
}

getCommonList(){
   this._commonService.GetLovDetailByColumn("ACTIVEINACTIVE").subscribe(
    (data) =>
     {
        this.StatusList = data;
    }
  )

  this._commonService.GetActiveRootList().subscribe(
    (data) =>
     {
        this.RootList = data;
    }
  )

}

validate(){
  if(this.rootCategoryObj.Root_Header_ID == null || this.rootCategoryObj.Root_Header_ID == '' || this.rootCategoryObj.Root_Header_ID == '0' || this.rootCategoryObj.Root_Header_ID == 0 )
  {
    this.errorMessage = "Please Select Root";
    // this.renderer.selectRootElement('#Root_Header_ID').focus();
    return false;
  }
  else if(this.rootCategoryObj.RCatg_Name == ''){
    this.errorMessage = "Please Enter Root Category Name";
    this.renderer.selectRootElement('#RCatg_Name').focus();
    return false;
  }
  else if(this.rootCategoryObj.RCatg_Name_D == '')
  {
    this.errorMessage = "Please Enter Root Category Name (Danish)";
    this.renderer.selectRootElement('#RCatg_Name_D').focus();
    return false;
  }
  else if(this.rootCategoryObj.Display_Seq_No == '' || this.rootCategoryObj.Display_Seq_No == '0' || this.rootCategoryObj.Display_Seq_No == 0 )
  {
    this.errorMessage = "Please Enter Display Seq No";
    this.renderer.selectRootElement('#Display_Seq_No').focus();
    return false;
  }
  else{
    return true;
  }
}

saveRootCategory() {
  if(this.validate()){

    debugger;

    const formData = new FormData();

    if(this.Image_File != null){
      formData.append('file', this.Image_File, this.Image_File.name);
    }

    this.rootCategoryObj.Created_By = this.userId;
    if (this.title == "Create") {
      this.rootCategoryObj.IsInserted = 'I';

      debugger;

      formData.append('jsonObj', JSON.stringify(this.rootCategoryObj));

      // this._commonService.saveRootCategory(this.rootCategoryObj)
      this._commonService.saveRootCategoryWithImage(formData)
        .subscribe((data) => {
          debugger;

          this.commonHelper.commonAlerts('Inserted', data, '/master/root-category-master','/master/add-edit-root-category')

        }, error => this.errorMessage = error)
    }
    else if (this.title == "Edit") {
      this.rootCategoryObj.IsInserted = 'U';

      debugger;

      formData.append('jsonObj', JSON.stringify(this.rootCategoryObj));

      // this._commonService.saveRootCategory(this.rootCategoryObj)
      this._commonService.saveRootCategoryWithImage(formData)
        .subscribe((data) => {
          this.commonHelper.commonAlerts('Updated', data, '/master/root-category-master','/master/add-edit-root-category')
        }, error => this.errorMessage = error)
    }
  }

}

previewImage(){

  debugger;

  this.Image_Path = null;

  if(this.rootCategoryObj.Image_Path == "" || this.rootCategoryObj.RCatg_ID == 0){
    this.Image_Path = "assets/images/no-image-available.jpg";
  }
  else{
    this.Image_Path = environment.Api_Host + this.rootCategoryObj.Image_Path;
  }
}


ChangeImage(event) {

  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.Image_File = file;

    var reader = new FileReader();
          reader.onload = (event: any) => {
            this.Image_Path = event.target.result;
          }
          reader.readAsDataURL(event.target.files[0]);

    if (!this.validateFile(this.Image_File.name)) {
      alert('Selected file format is not supported');
      this.Image_File = null;
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

cancel() {
  this.errorMessage = '';
  this.IsAddEdit = false;
  // this._router.navigate(['/master/root-category-master']);
}

}

function RootCategoryFun(isInserted) {

  let obj ={
  RCatg_ID :'',
  Root_Header_ID : '',
  RCatg_Name : '',
  RCatg_Name_D : '',
  Display_Seq_No :'',
  Status : 'A',
  Created_By :'',
  Created_Date :'',
  Modified_By :'',
  Modified_Date :'',
  IsDeleted :'',
  IsInserted : isInserted,
  Image_Path : environment.Default_Image_Path
};
  return obj;
}
