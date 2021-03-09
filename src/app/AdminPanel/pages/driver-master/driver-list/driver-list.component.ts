import { DropdownListInt } from './../../../../models/DropdownListInt';
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

//------************ DatePicker ************----------
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { Moment } from 'moment';
import * as _moment from 'moment';
export const MY_FORMATS = {
  parse: {
      dateInput: 'LL'
  },
  display: {
      dateInput: 'DD/MM/YYYY',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY'
  }
};

//------************ --- ************----------

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
  ],
})
/************************************* Developed By RAJESH *******************************/
export class DriverListComponent implements OnInit {

  loading: boolean = true;
  IsAddEdit = false;
  driverMaster: [];
  selectedDriverMaster: [];
  userId: string = localStorage.getItem('userId');
  msgType: string = '';
  message: string = '';
  @ViewChild('dt') table: Table;

  //----------- Add Edit
  driverObj :any ={};

  title: string = "Create";
  driverId: number;
  errorMessage: any ='';
  StatusList : Observable<DropdownList[]>;
  LicenseTypeList : Observable<DropdownListInt[]>;
  SelectedStatus : string = 'A';
  isInserted : string = 'I';
  errorMessageDate: any ='';
  errorMsgContact :string = '';

  //-----------------

  constructor(private _commonService: ProtoServicesService, private _router: Router, private primengConfig: PrimeNGConfig, private renderer: Renderer2) {}
  commonHelper = new AdminCommonHelperComponent(this._router);
  warningMessage : string  = this.commonHelper.commonWarningMessage;
  deleteTooltip : string  = this.commonHelper.deleteTooltip;
  restoreTooltip : string  = this.commonHelper.restoreTooltip;
  required : string  = this.commonHelper.required;
  deleteTitle : string = this.commonHelper.deleteTitle;
  deleteText : string = this.commonHelper.deleteText;
  noItemsFoundMsg : string = this.commonHelper.noItemsFoundMsg;
  imageNotAvail : string = this.commonHelper.imageNotAvail;
  contentTypeImage :  string = this.commonHelper.contentTypeImage;
  downloadImageTooltip :string = this.commonHelper.downloadImageTooltip;
  validEmailMsg : string = '';
  ngOnInit(): void {
    this.getDriverList();
  }

  getDriverList() {
    this._commonService.getDriverList('0').subscribe(
      (data) => {
        this.driverMaster = data;
        this.loading = false;
      }
    );
  }

  deleteItem(driverId) {
    Swal.fire({
      icon: 'warning',
      title: this.deleteTitle,
      text: this.deleteText,
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
    }).then((result) => {

      if (result.isConfirmed) {
        this._commonService.deleteDriver(driverId, this.userId).subscribe((data) => {
          let ret = this.commonHelper.activeInactiveAlert('Deleted', data);
          if (ret == 'S') {
            this.getDriverList();
          }
        }, error => console.error(error))
      }
    })
  }

  activateItem(driverId) {
    this._commonService.activeDriver(driverId, this.userId).subscribe((data) => {
      let ret = this.commonHelper.activeInactiveAlert('Activated', data);
      if (ret == 'S') {
        this.getDriverList();
      }
    }, error => console.error(error))
  }

    /* ******* CRUD functionality ******* */

    addEditOpen(id : any):void {
      this.errorMessageDate = '';
      this.errorMsgContact = '';
      this.errorMessage = '';
      this.validEmailMsg = '';
      this.IsAddEdit = true;
      this.driverId = id;

      this.getCommonList();

      if (this.driverId > 0) {
        this.title = "Edit";
        this._commonService.getDriverById(this.driverId)
          .subscribe((resp) =>
          {
            this.driverObj = resp;
            let startDt = resp.License_Start_Date;
            let endDt = resp.License_End_Date;
            this.driverObj.Lic_Start_Date = startDt.includes('1900') || startDt.includes('1970') ?"": resp.License_Start_Date
            this.driverObj.Lic_End_Date = endDt.includes('1900') || endDt.includes('1970') ?"": resp.License_End_Date
            , error => this.errorMessage = error
          });
      }else {
        this.title = "Create";
        this.driverObj = DriverFun(this.isInserted);
      }
    }

    getCommonList(){
       this._commonService.GetLovDetailByColumn("ACTIVEINACTIVE").subscribe(
        (data) =>
         {
            this.StatusList = data;
        }
      )

      this._commonService.GetActiveLicenseType().subscribe(
        (data) =>
         {
            this.LicenseTypeList = data;
        }
      )
    }

    validate(){
      this.errorMsgContact = '';
      this.errorMessageDate ='';
      this.validEmailMsg = '';
      if(this.driverObj.Driver_Name == null || this.driverObj.Driver_Name == '' )
      {
        this.errorMessage = "Please Enter Driver Name";
        this.renderer.selectRootElement('#Driver_Name').focus();
        return false;
      }
      else if(this.driverObj.License_NO == ''){
        this.errorMessage = "Please Enter License No";
        this.renderer.selectRootElement('#License_NO').focus();
        return false;
      }
      else if(this.driverObj.Lic_Start_Date == null || this.driverObj.Lic_Start_Date == '' || this.driverObj.Lic_Start_Date == '0' || this.driverObj.Lic_Start_Date == 0 )
      {
        this.errorMessage = "Please Select License Start Date";
        return false;
      }
      else if(this.driverObj.Lic_End_Date == null || this.driverObj.Lic_End_Date == '' || this.driverObj.Lic_End_Date == '0' || this.driverObj.Lic_End_Date == 0 )
      {
        this.errorMessage = "Please Select License End Date";
        return false;
      }
      else if(this.driverObj.License_Type == null || this.driverObj.License_Type == '' || this.driverObj.License_Type == '0' || this.driverObj.License_Type == 0 )
      {
        this.errorMessage = "Please Select License Type";
        return false;
      }
      else if((this.driverObj.Mobile_NO == null || this.driverObj.Mobile_NO == '') && (this.driverObj.ALT_Mobile_NO == null || this.driverObj.ALT_Mobile_NO == '') &&  (this.driverObj.Contact_NO == null || this.driverObj.Contact_NO == '') )
      {
        this.errorMsgContact = "Please Enter Atleast One Contact No";
        return false;
      }
      else{
        let frdate = _moment(this.driverObj.Lic_Start_Date, 'DD-MM-YYYY')
        let toDate = _moment(this.driverObj.Lic_End_Date, 'DD-MM-YYYY')

        if((toDate < frdate) ){
        this.errorMessageDate = "License End Date must be greater then Reg License Start Date";
        }
        else{
          if (this.driverObj.Email_ID != null && this.driverObj.Email_ID != "" && this.commonHelper.validateEmail(this.driverObj.Email_ID) == false) {
            this.validEmailMsg = this.commonHelper.validEmailMsg;
          }else{
            this.errorMessageDate = '';
            this.validEmailMsg = '';
            this.errorMsgContact = '';
            return true;
          }

        }
      }
    }

    saveDriver() {
      if(this.validate()){
        this.driverObj.Created_By = this.userId;
        this.driverObj.IsInserted = this.title == "Create" ? 'I' :'U';
        this.driverObj.License_Start_Date = new Date(this.driverObj.Lic_Start_Date).toLocaleString();
        this.driverObj.License_End_Date = new Date(this.driverObj.Lic_End_Date).toLocaleString();

        var formData = new FormData();
        for ( var key in this.driverObj ) {
          formData.append(key, this.driverObj[key]);
        }
        if(this.driverObj.Driver_Image_URL != null && this.driverObj.Driver_Image_URL.name != 'File'  ){
          formData.append('Driver_Image_URL',  this.driverObj.Driver_Image_URL,  this.driverObj.Driver_Image_URL.name);
        }

        if (this.title == "Create") {
          this.driverObj.IsInserted = 'I';
          this._commonService.saveDriver(formData)
            .subscribe((data) => {
              this.commonHelper.commonAlerts('Inserted', data,'/master/driver-master', '/master/add-edit-category')

            }, error => this.errorMessage = error)
        }
        else if (this.title == "Edit") {
          this.driverObj.IsInserted = 'U';
          this._commonService.saveDriver(formData)
            .subscribe((data) => {
              this.commonHelper.commonAlerts('Updated', data,'/master/driver-master', '/master/add-edit-category')
            }, error => this.errorMessage = error)
        }
      }
    }

    SetDriverImage(file : FileList){
      this.driverObj.Driver_Image_URL = file.item(0);
    }
    DownloadImage(base64content :any,filename:any,contentType:any){
      this.commonHelper.DownloadImage(base64content,filename,contentType);
    }

    cancel() {
      this.errorMessage = '';
      this.IsAddEdit = false;
    }
}

function DriverFun(isInserted) {

  let obj ={
    Driver_Id :'',
    Driver_Name : '',
    License_NO : '',
    License_Start_Date : '',
    License_End_Date :'',
    Lic_Start_Date : '',
    Lic_End_Date :'',
    License_Type :'',
    Driver_Image_URL :File,
    Mobile_NO :'',
    ALT_Mobile_NO :'',
    Contact_NO :'',
    Email_ID :'',
    Remark :'',
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
