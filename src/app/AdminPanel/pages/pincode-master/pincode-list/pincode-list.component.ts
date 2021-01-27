import { DropdownList } from 'src/app/models/DropdownList';
import {
  AdminCommonHelperComponent
} from './../../AdminCommonHelper/AdminCommonHelper.component';
import {
  PrimeNGConfig
} from 'primeng/api';
import {
  Router
} from '@angular/router';
import {
  ProtoServicesService
} from './../../../Services/proto-services.service';
import {
  Component,
  OnInit,
  ViewChild,Renderer2
} from '@angular/core';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import {
  Table
} from 'primeng/table';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pincode-list',
  templateUrl: './pincode-list.component.html',
  styleUrls: ['./pincode-list.component.scss']
})
/************************************* Developed By RAJESH *******************************/
export class PincodeListComponent implements OnInit {

  loading: boolean = true;
  IsAddEdit = false;
  pincodeMaster: any[]=[];
  selectedPincodeMaster: [];
  userId: string = localStorage.getItem('userId');
  msgType: string = '';
  message: string = '';
  @ViewChild('dt') table: Table;
  IsRowEdit : boolean =false;
  //----------- Add Edit
  pincodeObj :any ={};
  title: string = "Create";
  pincodeId: number;
  errorMessage: any ='';
  StatusList : Observable<DropdownList[]>;
  PincodeList : Observable<DropdownList[]>;
  SelectedStatus : string = 'A';
  isInserted : string = 'I';
  //-----------------

  constructor(private _commonService: ProtoServicesService, private _router: Router, private primengConfig: PrimeNGConfig, private renderer: Renderer2) {}
  commonHelper = new AdminCommonHelperComponent(this._router);

  ngOnInit(): void {
    this.getPincodeList();
  }

  getPincodeList() {
    this._commonService.getPincodeList('0').subscribe(
      (data) => {
        this.pincodeMaster = data;
        this.pincodeMaster.map(row => {
          row.isEditable = false;
        });
        this.loading = false;
      }
    );
  }

  deleteItem(pincodeId) {
    Swal.fire({
      icon: 'warning',
      title: 'Do you want to delete?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
    }).then((result) => {
      debugger;
      if (result.isConfirmed) {
        this._commonService.deletePincode(pincodeId, this.userId).subscribe((data) => {
          let ret = this.commonHelper.activeInactiveAlert('Deleted', data);
          if (ret == 'S') {
            this.getPincodeList();
          }
        }, error => console.error(error))
      }
    })
  }

  activateItem(pincodeId) {
    this._commonService.activePincode(pincodeId, this.userId).subscribe((data) => {
      let ret = this.commonHelper.activeInactiveAlert('Activated', data);
      if (ret == 'S') {
        this.getPincodeList();
      }
    }, error => console.error(error))
  }

    //============== CRUD functionality

    openEditPage(row){
      this.getCommonList();
      this.IsRowEdit = true;
      this.pincodeMaster.filter(row => row.isEditable).map(r => { r.isEditable = false; return r })
      row.isEditable = true;
     }
     cancelUpdate(row) {
      this.IsRowEdit = false;
      row.isEditable = false;
      this.getPincodeList();
    }
    updatePincode(item : any) {
      if(this.validateInline(item)){
        item.Created_By = this.userId;
        item.IsInserted = 'U';
        // let pinSplit = item.Pincode.split('(');
        // item.Pincode = pinSplit[0];
          this._commonService.savePincode(item)
            .subscribe((data) => {
              this.commonHelper.commonAlerts('Updated', data, '/master/pincode-master', '/master/add-edit-brand')
              if (data != null && data != "e" && data != "r" && data != "o") {
                let splitData = data.toString().split("|");
                this.msgType = splitData.length > 0 ? splitData[0] :'E';
                if (this.msgType == 'S') {
                  item.isEditable = false;
                }
              }

            }, error => this.errorMessage = error)
      }
    }
    validateInline(item) : any{
      if(item.Pincode == null || item.Pincode == '' || item.Pincode == '0' || item.Pincode == 0 )
      {
        this.errorMessage = "Please Select Pincode";
        // this.renderer.selectRootElement('#Root_Header_ID').focus();
        return false;
      }
      else{
        return true;
      }

      }

    addEditOpen(id : any):void {
      this.errorMessage = '';
      this.IsAddEdit = true;
      this.pincodeId = id;
      this.IsRowEdit = false;
      this.getCommonList();

      if (this.pincodeId > 0) {
        this.title = "Edit";
        this._commonService.getPincodeById(this.pincodeId)
          .subscribe((resp) =>
          {

            this.pincodeObj = resp
            , error => this.errorMessage = error
          });
      }else {
        this.title = "Create";
        this.pincodeObj = PincodeFun(this.isInserted);
      }
    }

    getCommonList(){
       this._commonService.GetLovDetailByColumn("ACTIVEINACTIVE").subscribe(
        (data) =>
         {
            this.StatusList = data;
        }
      )

      this._commonService.GetPincodesFromCity().subscribe(
        (data) =>
         {
            this.PincodeList = data;
        }
      )
    }

    validate(){
      if(this.pincodeObj.Pincode == null || this.pincodeObj.Pincode == '' || this.pincodeObj.Pincode == '0' || this.pincodeObj.Pincode == 0 )
      {
        this.errorMessage = "Please Select Pincode";
        return false;
      }
      else{
        return true;
      }
    }

    savePincode() {
      debugger;
      if(this.validate()){
        this.pincodeObj.Created_By = this.userId;
        if (this.title == "Create") {
          this.pincodeObj.IsInserted = 'I';
          this._commonService.savePincode(this.pincodeObj)
            .subscribe((data) => {
              this.commonHelper.commonAlerts('Inserted', data,'/master/pincode-master', '/master/add-edit-category')

            }, error => this.errorMessage = error)
        }
        else if (this.title == "Edit") {
          this.pincodeObj.IsInserted = 'U';
          this._commonService.savePincode(this.pincodeObj)
            .subscribe((data) => {
              this.commonHelper.commonAlerts('Updated', data,'/master/pincode-master', '/master/add-edit-category')
            }, error => this.errorMessage = error)
        }
      }
    }

    cancel() {
      this.errorMessage = '';
      this.IsAddEdit = false;
    }
}

function PincodeFun(isInserted) {

  let obj ={
    Pin_Id :'',
    Pincode : '',
    Town_Name : '',
  Status : 'A',
  Created_By :'',
  Created_Date :'',
  Modified_By :'',
  Modified_Date :'',
  IsDeleted :'',
  IsInserted : isInserted,
};
  return obj;
}
