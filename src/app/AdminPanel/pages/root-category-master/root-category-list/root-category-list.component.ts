import { DropdownList } from 'src/app/models/DropdownList';
import { AdminCommonHelperComponent } from './../../AdminCommonHelper/AdminCommonHelper.component';
import { PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';
import { ProtoServicesService } from './../../../Services/proto-services.service';
import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';

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
  rootCategoryObj :any ={};

    title: string = "Create";
    rootCategoryId: number;
    errorMessage: any ='';
    StatusList : Observable<DropdownList[]>;
    RootList : Observable<DropdownList[]>;
    SelectedStatus : string = 'A';
    isInserted : string = 'I';
  //-------------------------------------

  constructor( private _commonService : ProtoServicesService, private _router: Router, private primengConfig: PrimeNGConfig, private renderer: Renderer2) { }
  commonHelper = new AdminCommonHelperComponent(this._router);
  warningMessage : string  = this.commonHelper.commonWarningMessage;
  ngOnInit(): void  {
    this.IsAddEdit = false;
    this.getRootCategoryList();
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
  this.errorMessage = '';
  this.IsAddEdit = true;
  this.IsRowEdit = false;
  this.getCommonList();

  this.rootCategoryId = id;
  if (this.rootCategoryId > 0) {
    this.title = "Edit";
    this._commonService.getRootCategoryById(this.rootCategoryId)
      .subscribe((resp) =>
      {
        this.rootCategoryObj = resp
        , error => this.errorMessage = error
      });
  }else {
    this.title = "Create";
    this.rootCategoryObj = RootCategoryFun(this.isInserted);
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
    this.rootCategoryObj.Created_By = this.userId;
    if (this.title == "Create") {
      this.rootCategoryObj.IsInserted = 'I';
      this._commonService.saveRootCategory(this.rootCategoryObj)
        .subscribe((data) => {
          this.commonHelper.commonAlerts('Inserted', data, '/master/root-category-master','/master/add-edit-root-category')

        }, error => this.errorMessage = error)
    }
    else if (this.title == "Edit") {
      this.rootCategoryObj.IsInserted = 'U';
      this._commonService.saveRootCategory(this.rootCategoryObj)
        .subscribe((data) => {
          this.commonHelper.commonAlerts('Updated', data, '/master/root-category-master','/master/add-edit-root-category')
        }, error => this.errorMessage = error)
    }
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
  IsInserted : isInserted
};
  return obj;
}
