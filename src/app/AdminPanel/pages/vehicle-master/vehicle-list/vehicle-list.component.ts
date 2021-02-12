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

// //------************ NG-PICK-DATE-TIME ************----------
// import { Location, DatePipe } from '@angular/common';
// import { OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';
// import * as _moment from 'moment';
// export const dateTimeCustomFormats = {
//   parseInput: 'l LT',
//   fullPickerInput: 'l LT',
//   datePickerInput: 'l',
//   timePickerInput: 'LT',
//   monthYearLabel: 'MMM YYYY',
//   dateA11yLabel: 'LL',
//   monthYearA11yLabel: 'MMMM YYYY',
// };

// const moment = (_moment as any).default ? (_moment as any).default : _moment;
// //------************ ----------------- ************----------

//------************ DatePicker ************----------
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { Moment } from 'moment';
import * as _moment from 'moment';
//import {default as _rollupMoment} from 'moment';
// const moment = _rollupMoment || _moment;
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
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss'],
  // providers: [
  //   {provide: OWL_DATE_TIME_FORMATS, useValue: dateTimeCustomFormats},
  // ],
  providers: [ //DatePicker
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
  ],
})
/************************************* Developed By RAJESH *******************************/
export class VehicleListComponent implements OnInit {

  loading: boolean = true;
  IsAddEdit = false;
  vehicleMaster: [];
  selectedVehicleMaster: [];
  userId: string = localStorage.getItem('userId');
  msgType: string = '';
  message: string = '';
  @ViewChild('dt') table: Table;

  //----------- Add Edit
  vehicleObj :any ={};

  title: string = "Create";
  vehicleId: number;
  errorMessage: any ='';
  errorMessageDate: any ='';
  StatusList : Observable<DropdownList[]>;
  VehicleTypeList : Observable<DropdownList[]>;
  VehicleCategoryList : Observable<DropdownList[]>;
  LicenseTypeList : Observable<DropdownListInt[]>;
  ManufactureByList : Observable<DropdownList[]>;
  RegTypeList : Observable<DropdownList[]>;
  MeasurementList : Observable<DropdownList[]>;
  SelectedStatus : string = 'A';
  isInserted : string = 'I';
  //-----------------

  constructor(private _commonService: ProtoServicesService, private _router: Router, private primengConfig: PrimeNGConfig, private renderer: Renderer2) {}
  commonHelper = new AdminCommonHelperComponent(this._router);
  warningMessage : string  = this.commonHelper.commonWarningMessage;
  deleteTooltip : string  = this.commonHelper.deleteTooltip;
  restoreTooltip : string  = this.commonHelper.restoreTooltip;
  contentTypeImage :  string = this.commonHelper.contentTypeImage;
  required : string  = this.commonHelper.required;
  imageNotAvail : string = this.commonHelper.imageNotAvail;
  downloadImageTooltip :string = this.commonHelper.downloadImageTooltip;
  ngOnInit(): void {
    this.getVehicleList();
  }

  getVehicleList() {
    this._commonService.getVehicleList('0').subscribe(
      (data) => {

        this.vehicleMaster = data;
        this.loading = false;
      }
    );
  }

  openInsertPage() {
    this._router.navigate(['/master/add-edit-vehicle']);
  }

  openEditPage(id) {
    this._router.navigate(['/master/add-edit-vehicle', id]);
  }

  deleteItem(vehicleId) {
    Swal.fire({
      icon: 'warning',
      title: 'Do you want to delete?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
    }).then((result) => {

      if (result.isConfirmed) {
        this._commonService.deleteVehicle(vehicleId, this.userId).subscribe((data) => {
          let ret = this.commonHelper.activeInactiveAlert('Deleted', data);
          if (ret == 'S') {
            this.getVehicleList();
          }
        }, error => console.error(error))
      }
    })
  }

  activateItem(vehicleId) {
    this._commonService.activeVehicle(vehicleId, this.userId).subscribe((data) => {
      let ret = this.commonHelper.activeInactiveAlert('Activated', data);
      if (ret == 'S') {
        this.getVehicleList();
      }
    }, error => console.error(error))
  }

    // ============== CRUD functionality ============= //

    addEditOpen(id : any):void {
      this.errorMessageDate = '';
      this.errorMessage = '';
      this.IsAddEdit = true;
      this.vehicleId = id;

      this.getCommonList();

      if (this.vehicleId > 0) {
        this.title = "Edit";
        this._commonService.getVehicleById(this.vehicleId)
          .subscribe((resp) =>
          {

            this.vehicleObj = resp
            let frDt = resp.Reg_Effectivefrom_date;
            let todt = resp.Reg_Effectiveto_date;
            this.vehicleObj.Reg_Effectivefrom_date = frDt.includes('1900') || frDt.includes('1970') ?"": resp.Reg_Effectivefrom_date
            this.vehicleObj.Reg_Effectiveto_date = todt.includes('1900') || todt.includes('1970') ?"": resp.Reg_Effectiveto_date
            // this.vehicleObj.SelectedDepartment = resp.Department.split(',')
            , error => this.errorMessage = error
          });
      }else {
        this.title = "Create";
        this.vehicleObj = VehicleFun(this.isInserted);
      }
    }

    DownloadImage(base64content :any,filename:any,contentType:any){
      this.commonHelper.DownloadImage(base64content,filename,contentType);
    }

    getCommonList(){
       this._commonService.GetLovDetailByColumn("ACTIVEINACTIVE").subscribe(
        (data) =>
         {
            this.StatusList = data;
        }
      )

      this._commonService.GetLovDetailByColumn("VEHTYPE").subscribe(
        (data) =>
         {
            this.VehicleTypeList = data;
        }
      )

      this._commonService.GetLovDetailByColumn("MANUFACTBY").subscribe(
        (data) =>
         {
            this.ManufactureByList = data;
        }
      )
      this._commonService.GetLovDetailByColumn("REGTYPE").subscribe(
        (data) =>
         {
            this.RegTypeList = data;
        }
      )
      this._commonService.GetLovDetailByColumn("MEASUREMETH").subscribe(
        (data) =>
         {
            this.MeasurementList = data;
        }
      )

      this._commonService.GetVehicleCategoryList("0").subscribe(
        (data) =>
         {
            this.VehicleCategoryList = data;
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

      if(this.vehicleObj.Vehicle_No == ''){
        this.errorMessage = "Please Enter Vehicle No";
        this.renderer.selectRootElement('#Vehicle_No').focus();
        return false;
      }
      else if(this.vehicleObj.Vehicle_Type == null || this.vehicleObj.Vehicle_Type == '' || this.vehicleObj.Vehicle_Type == '0' || this.vehicleObj.Vehicle_Type == 0 )
      {
        this.errorMessage = "Please Select Vehicle Type";
        return false;
      }
      else if(this.vehicleObj.Vehicle_Category == null || this.vehicleObj.Vehicle_Category == '' || this.vehicleObj.Vehicle_Category == '0' || this.vehicleObj.Vehicle_Category == 0 )
      {
        this.errorMessage = "Please Select Vehicle Category";
        return false;
      }else if(this.vehicleObj.Reg_No == ''){
        this.errorMessage = "Please Enter Reg No";
        this.renderer.selectRootElement('#Reg_No').focus();
        return false;
      }
      else if(this.vehicleObj.Reg_Type == null || this.vehicleObj.Reg_Type == '' || this.vehicleObj.Reg_Type == '0' || this.vehicleObj.Reg_Type == 0 )
      {
        this.errorMessage = "Please Select Reg Type";
        return false;
      }else if(this.vehicleObj.Measurement_Method == null || this.vehicleObj.Measurement_Method == '' || this.vehicleObj.Measurement_Method == '0' || this.vehicleObj.Measurement_Method == 0 )
      {
        this.errorMessage = "Please Select Measurement Method";
        return false;
      }
      else if(this.vehicleObj.Reg_Effectivefrom_date == null || this.vehicleObj.Reg_Effectivefrom_date == '' || this.vehicleObj.Reg_Effectivefrom_date == '0' || this.vehicleObj.Reg_Effectivefrom_date == 0 )
      {
        this.errorMessage = "Please Select Reg Effectivefrom Date";
        return false;
      }
      else if(this.vehicleObj.Reg_Effectiveto_date == null || this.vehicleObj.Reg_Effectiveto_date == '' || this.vehicleObj.Reg_Effectiveto_date == '0' || this.vehicleObj.Reg_Effectiveto_date == 0 )
      {
        this.errorMessage = "Please Select Reg Effectiveto Date";
        return false;
      }
      else if(this.vehicleObj.Lic_Req_For_Drive == null || this.vehicleObj.Lic_Req_For_Drive == '' || this.vehicleObj.Lic_Req_For_Drive == '0' || this.vehicleObj.Lic_Req_For_Drive == 0 )
      {
        this.errorMessage = "Please Select License Require For Drive";
        return false;
      }else if(this.vehicleObj.Insurance_NO == ''){
        this.errorMessage = "Please Enter Insurance No";
        this.renderer.selectRootElement('#Insurance_NO').focus();
        return false;
      }
      else if(this.vehicleObj.Insurance_Start_Date == null || this.vehicleObj.Insurance_Start_Date == '' || this.vehicleObj.Insurance_Start_Date == '0' || this.vehicleObj.Insurance_Start_Date == 0 )
      {
        this.errorMessage = "Please Select Insurance Start Date";
        return false;
      }
      else if(this.vehicleObj.Insurance_End_Date == null || this.vehicleObj.Insurance_End_Date == '' || this.vehicleObj.Insurance_End_Date == '0' || this.vehicleObj.Insurance_End_Date == 0 )
      {
        this.errorMessage = "Please Select Insurance End Date";
        return false;
      }
      else{
        let frdate = _moment(this.vehicleObj.Reg_Effectivefrom_date, 'DD-MM-YYYY')
        let toDate = _moment(this.vehicleObj.Reg_Effectiveto_date, 'DD-MM-YYYY')

        let insSDate = _moment(this.vehicleObj.Insurance_Start_Date, 'DD-MM-YYYY')
        let insEDate = _moment(this.vehicleObj.Insurance_End_Date, 'DD-MM-YYYY')

        // if(((new Date(this.vehicleObj.Reg_Effectiveto_date).toLocaleString()) < (new Date(this.vehicleObj.Reg_Effectivefrom_date).toLocaleString())) || (toDate < frdate)  ){
        if((toDate < frdate) ){
        this.errorMessageDate = "Reg Effectiveto Date must be greater then Reg Effectivefrom Date";
        }
        else if((insEDate < insSDate)){
          this.errorMessageDate = "Insurance End Date must be greater then Insurance Start Date";
        }
        else{
          this.errorMessageDate = '';
          return true;
        }
      }
    }

    saveVehicle() {

      if(this.validate()){

        this.vehicleObj.Created_By = this.userId;
        // this.vehicleObj.Department = this.vehicleObj.SelectedDepartment.join(',');
        this.vehicleObj.IsInserted = this.title == "Create" ? 'I' :'U';
        this.vehicleObj.Reg_Effectivefrom_date = new Date(this.vehicleObj.Reg_Effectivefrom_date).toLocaleString();
        this.vehicleObj.Reg_Effectiveto_date = new Date(this.vehicleObj.Reg_Effectiveto_date).toLocaleString();
        this.vehicleObj.Insurance_Start_Date = new Date(this.vehicleObj.Insurance_Start_Date).toLocaleString();
        this.vehicleObj.Insurance_End_Date = new Date(this.vehicleObj.Insurance_End_Date).toLocaleString();
        //let image1FormData: FormData = new FormData();
        var image1FormData = new FormData();
          for ( var key in this.vehicleObj ) {
             image1FormData.append(key, this.vehicleObj[key]);
          }

        if(this.vehicleObj.Veh_Image1_URL != null && this.vehicleObj.Veh_Image1_URL.name != 'File'  ){
          image1FormData.append('Veh_Image1_URL',  this.vehicleObj.Veh_Image1_URL,  this.vehicleObj.Veh_Image1_URL.name);
        }
        if( this.vehicleObj.Veh_Image2_URL != null && this.vehicleObj.Veh_Image2_URL.name != 'File' ){
          image1FormData.append('Veh_Image2_URL',  this.vehicleObj.Veh_Image2_URL,  this.vehicleObj.Veh_Image2_URL.name);
        }
        if(  this.vehicleObj.Veh_Image3_URL != null && this.vehicleObj.Veh_Image3_URL.name != 'File'){
          image1FormData.append('Veh_Image3_URL',  this.vehicleObj.Veh_Image3_URL,  this.vehicleObj.Veh_Image3_URL.name);
        }

        if (this.title == "Create") {
          // this.vehicleObj.IsInserted = 'I';
          this._commonService.saveVehicle(this.vehicleObj,image1FormData)
            .subscribe((data) => {
              this.commonHelper.commonAlerts('Inserted', data,'/master/vehicle-master', '/master/add-edit-category')
            }, error => this.errorMessage = error)
        }
        else if (this.title == "Edit") {
          // this.vehicleObj.IsInserted = 'U';
          this._commonService.saveVehicle(this.vehicleObj,image1FormData)
            .subscribe((data) => {
              this.commonHelper.commonAlerts('Updated', data,'/master/vehicle-master', '/master/add-edit-category')
            }, error => this.errorMessage = error)
        }
      }
    }

    SetVehicleImage1(file : FileList){
      this.vehicleObj.Veh_Image1_URL = file.item(0);
    }
    SetVehicleImage2(file : FileList){
      this.vehicleObj.Veh_Image2_URL = file.item(0);
    }
    SetVehicleImage3(file : FileList){
      this.vehicleObj.Veh_Image3_URL = file.item(0);
    }

    cancel() {
      this.errorMessage = '';
      this.IsAddEdit = false;
    }
}

function VehicleFun(isInserted) {
  let obj ={
    Vehicle_Id :'',
    Vehicle_Category : '',
    Vehicle_CategoryDesc : '',
    Vehicle_No : '',
    Vehicle_Type :'',
    Vehicle_TypeDesc :'',
    Remark :'',
    StatusDesc :'',
    Status : 'A',
    Created_By :'',
    Created_Date :'',
    Modified_By :'',
    Modified_Date :'',
    IsDeleted :'',
    IsInserted : isInserted,
    Manufacture_By :'',
    Model_Name :'',
    Manufacture_Year :'',
    Reg_No :'',
    Reg_Type :'',
    Measurement_Method :'',
    RegTypeDesc :'',
    ManufactureByDesc  :'',
    MeasurementDesc :'',
    Reg_Effectivefrom_date :'',
    Reg_Effectiveto_date :'',
    Insurance_NO :'',
    Insurance_Start_Date :'',
    Insurance_End_Date :'',
    Veh_Image1_URL :File,
    Veh_Image2_URL :File,
    Veh_Image3_URL :File,
    Lic_Req_For_Drive :'',
    Veh_Image1 : File,

};
  return obj;
}
