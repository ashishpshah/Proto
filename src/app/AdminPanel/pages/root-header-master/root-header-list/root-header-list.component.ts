import { DropdownList } from 'src/app/models/DropdownList';
import { AdminCommonHelperComponent } from './../../AdminCommonHelper/AdminCommonHelper.component';
import { Component, OnInit, ViewChild,Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { ProtoServicesService } from "../../../Services/proto-services.service";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Table } from 'primeng/table';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root-header-list',
  templateUrl: './root-header-list.component.html',
  styleUrls: ['./root-header-list.component.scss']
})
export class RootHeaderListComponent implements OnInit {
  loading: boolean = true;
  IsAddEdit = false;
  rootHeaderMaster : [];
  selectedRootHeaderMaster : [];
  userId : string = localStorage.getItem('userId');
  msgType : string = '';
  message : string = '';
  @ViewChild('dt') table: Table;

  //--------------------- Add Edit
    rootHeaderObj :any ={};
    title: string = "Create";
    rootHeaderId: number;
    errorMessage: any ='';
    StatusList : Observable<DropdownList[]>;
    SelectedStatus : string = 'A';
    isInserted : string = 'I';
  //----------------------------

  constructor( private _commonService : ProtoServicesService, private _router: Router, private primengConfig: PrimeNGConfig, private renderer: Renderer2) { }
  commonHelper = new AdminCommonHelperComponent(this._router);

      ngOnInit(): void  {
        this.getRootHeaderList();
    }

    getRootHeaderList(){
      this._commonService.getRootHeaderList('0').subscribe(
        (data) =>
          {
          this.rootHeaderMaster =  data;
          this.loading = false;
        }
      );
    }

    openInsertPage(){
      this._router.navigate(['/master/add-edit-root-header']);
    }

    openEditPage(id){
      this._router.navigate(['/master/add-edit-root-header',id]);
    }

    deleteItem(rootHeaderId) {
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
        debugger;
        if (result.isConfirmed) {
          this._commonService.deleteRootHeader(rootHeaderId,this.userId).subscribe((data) => {
            let ret = this.commonHelper.activeInactiveAlert('Deleted',data);
              if (ret == 'S') {
                this.getRootHeaderList();
              }
        }, error => console.error(error))
        }
      })
    }

    activateItem(rootHeaderId) {
          this._commonService.activeRootHeader(rootHeaderId,this.userId).subscribe((data) => {
            let ret = this.commonHelper.activeInactiveAlert('Activated',data);
            if (ret == 'S') {
              this.getRootHeaderList();
            }
          }, error => console.error(error))
    }


    //------------------------ CRUD Functionality

    addEditOpen(id : any):void {
      this.errorMessage = '';
      this.IsAddEdit = true;
      this.getCommonList();
      this.rootHeaderId = id;
      if (this.rootHeaderId > 0) {
        this.title = "Edit";
        this._commonService.getRootHeaderById(this.rootHeaderId)
          .subscribe((resp) =>
          {
            this.rootHeaderObj = resp
            , error => this.errorMessage = error
          });
      }else {
        this.title = "Create";
        this.rootHeaderObj = RootHeaderFun(this.isInserted);
      }
    }

    getCommonList(){
       this._commonService.GetLovDetailByColumn("ACTIVEINACTIVE").subscribe(
        (data) =>
         {
            this.StatusList = data;
        }
      )
    }

    validate(){
      if(this.rootHeaderObj.Root_Name == ''){
        this.errorMessage = "Please Enter Root Name";
        this.renderer.selectRootElement('#Root_Name').focus();
        return false;
      }
      else if(this.rootHeaderObj.Root_Name_D == '')
      {
        this.errorMessage = "Please Enter Root Name (Danish)";
        this.renderer.selectRootElement('#Root_Name_D').focus();
        return false;
      }
      else if(this.rootHeaderObj.Display_Seq_No == '' || this.rootHeaderObj.Display_Seq_No == '0' || this.rootHeaderObj.Display_Seq_No == 0 )
      {
        this.errorMessage = "Please Enter Display Seq No";
        this.renderer.selectRootElement('#Display_Seq_No').focus();
        return false;
      }
      else{
        return true;
      }
    }
    saveRootHeader() {
      if(this.validate()){
        this.rootHeaderObj.Created_By = this.userId;
        if (this.title == "Create") {
          //this.itemForm.value.IsInserted = 'I';
          this.rootHeaderObj.IsInserted = 'I';
          this._commonService.saveRootHeader(this.rootHeaderObj)
            .subscribe((data) => {
              this.commonHelper.commonAlerts('Inserted', data, '/master/root-header-master','/master/add-edit-root-header')

            }, error => this.errorMessage = error)
        }
        else if (this.title == "Edit") {
          this.rootHeaderObj.IsInserted = 'U';
          this._commonService.saveRootHeader(this.rootHeaderObj)
            .subscribe((data) => {
              this.commonHelper.commonAlerts('Updated', data, '/master/root-header-master','/master/add-edit-root-header')
            }, error => this.errorMessage = error)
        }
      }

    }

    cancel() {
      this.errorMessage = '';
  this.IsAddEdit = false;
      // this._router.navigate(['/master/root-header-master']);
    }

}

function RootHeaderFun(isInserted) {

  let obj ={
  Root_Header_ID :'',
  Root_Name : '',
  Root_Name_D : '',
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
