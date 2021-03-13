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
  selector: 'app-route-time-mgmt-list',
  templateUrl: './route-time-mgmt-list.component.html',
  styleUrls: ['./route-time-mgmt-list.component.scss'],
  providers: [ //DatePicker
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
  ],
})
/************************************* Developed By RAJESH *******************************/
export class RouteTimeListComponent implements OnInit {

  loading: boolean = true;
  IsAddEdit = false;
  routeTimeMaster: [];
  selectedRouteTime: [];
  userId: string = localStorage.getItem('userId');
  msgType: string = '';
  message: string = '';
  @ViewChild('dt') table: Table;

  //----------- Add Edit
  routeTimeObj :any ={};

  title: string = "Create";
  categoryId: number;
  errorMessage: any ='';
  RouteList : Observable<DropdownListInt[]>;
  VehicleList : Observable<DropdownListInt[]>;
  SelectedStatus : string = 'A';
  isInserted : string = 'I';
  categoryName : string ='';
  msgArray : any[] = [];
  //-----------------
  routeTimeMasterList: any[] =[];
  selectedRouteTimeList: [];
isViewRouteTime : boolean =false;
  constructor(private _commonService: ProtoServicesService, private _router: Router, private primengConfig: PrimeNGConfig, private renderer: Renderer2) {}
  commonHelper = new AdminCommonHelperComponent(this._router);
  warningMessage : string  = this.commonHelper.commonWarningMessage;
  deleteTooltip : string  = this.commonHelper.deleteTooltip;
  restoreTooltip : string  = this.commonHelper.restoreTooltip;
  required : string  = this.commonHelper.required;
  ngOnInit(): void {
    this.getCommonList();
    //this.getRouteTimeList();
  }

  getRouteTimeList() {
    this._commonService.getRouteTimeList('0').subscribe(
      (data) => {
        this.routeTimeMaster = data;
        this.loading = false;
      }
    );
  }

  deleteItem(categoryId) {
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
        this._commonService.deleteRouteTime(categoryId, this.userId).subscribe((data) => {
          let ret = this.commonHelper.activeInactiveAlert('Deleted', data);
          if (ret == 'S') {
            this.getRouteTimeList();
          }
        }, error => console.error(error))
      }
    })
  }

  activateItem(categoryId) {
    this._commonService.activeRouteTime(categoryId, this.userId).subscribe((data) => {
      let ret = this.commonHelper.activeInactiveAlert('Activated', data);
      if (ret == 'S') {
        this.getRouteTimeList();
      }
    }, error => console.error(error))
  }

    //============== CRUD functionality

    addEditOpen(id : any):void {
      this.errorMessage = '';
      this.IsAddEdit = true;
      this.categoryId = id;

      this.getCommonList();

      if (this.categoryId > 0) {
        this.title = "Edit";
        this._commonService.getRouteTimeById(this.categoryId)
          .subscribe((resp) =>
          {

            this.routeTimeObj = resp

            let frDt = resp.Route_Date;
            this.routeTimeObj.Route_Date = frDt.includes('1900') || frDt.includes('1970') ?"": resp.Route_Date

            , error => this.errorMessage = error
          });
      }else {
        this.title = "Create";
        this.routeTimeObj = RouteTimeFun(this.isInserted);
      }
    }

    getCommonList(){
       this._commonService.GetActiveRouteDropDownList().subscribe(
        (data) =>
         {
            this.RouteList = data;
        }
      )
    }
    getVehicleByRouteId(routeId : string){
      this._commonService.getVehicleByRouteId(routeId).subscribe(
        (data) =>
         {
            this.VehicleList = data;
        }
      )
    }
    GetVehicleCategoryByVehicleId(vehicleId:string){
      this.routeTimeObj.Vehicle_CategoryDesc ='';
      this._commonService.GetVehicleCategoryByVehicleId(vehicleId).subscribe(
        (data) =>
         {
          this.routeTimeObj.Vehicle_CategoryDesc = data.Vehicle_CategoryDesc;
        }
      )
    }

    validate(){
      if(this.routeTimeObj.Route_Date_Dt == null || this.routeTimeObj.Route_Date_Dt == '' )
      {
        this.errorMessage = "Please Select Route Date";
        return false;
      }
      else if(this.routeTimeObj.Route_Id == null || this.routeTimeObj.Route_Id == '' || this.routeTimeObj.Route_Id == '0' || this.routeTimeObj.Route_Id == 0 )
      {
        this.errorMessage = "Please Select Route";
        return false;
      }
      // else if(this.routeTimeObj.Vehicle_Id == null || this.routeTimeObj.Vehicle_Id == '' || this.routeTimeObj.Vehicle_Id == '0' || this.routeTimeObj.Vehicle_Id == 0 )
      // {
      //   this.errorMessage = "Please Select Vehicle";
      //   return false;
      // }
      // else if(this.routeTimeObj.Route_Start_Time == '')
      // {
      //   this.errorMessage = "Please Enter Route Start Time";
      //   this.renderer.selectRootElement('#Route_Start_Time').focus();
      //   return false;
      // }  else if(this.routeTimeObj.Route_Start_Time == '')
      // {
      //   this.errorMessage = "Please Enter Route End Time";
      //   this.renderer.selectRootElement('#Route_End_Time').focus();
      //   return false;
      // }
      else{
        this.errorMessage ='';
        return true;
      }
    }

    saveRouteTime() {
      if(this.validate()){

        this.routeTimeObj.Created_By = this.userId;
        this.routeTimeObj.Route_Date = new Date(this.routeTimeObj.Route_Date).toLocaleString();
        if (this.title == "Create") {
          this.routeTimeObj.IsInserted = 'I';
          this._commonService.saveRouteTime(this.routeTimeObj)
            .subscribe((data) => {
              this.commonHelper.commonAlerts('Inserted', data,'/master/route-time-mgmt-master', '/master/add-edit-category')

            }, error => this.errorMessage = error)
        }
        else if (this.title == "Edit") {
          this.routeTimeObj.IsInserted = 'U';
          this._commonService.saveRouteTime(this.routeTimeObj)
            .subscribe((data) => {
              this.commonHelper.commonAlerts('Updated', data,'/master/route-time-mgmt-master', '/master/add-edit-category')
            }, error => this.errorMessage = error)
        }
      }
    }

    viewRouteTime(){

      if(this.validate()){
        this.isViewRouteTime = true;

        this.routeTimeObj.Route_Date = new Date(this.routeTimeObj.Route_Date_Dt).toLocaleString();
        this._commonService.viewRouteTimeList(this.routeTimeObj.Route_Id,this.routeTimeObj.Route_Date).subscribe(
          (data) =>
           {
              this.routeTimeMasterList = data;
              this.loading = false;
          }
        )
      }

    }

    validateList() : any{
      let invalidCount = 0;
      let message = "";

      this.routeTimeMasterList.filter(function (element,index) {

        if((element.Route_Start_Time == null || element.Route_Start_Time == '')&&(element.Route_End_Time != null && element.Route_End_Time != ''))
        {
          message = message == "" ? "Please Enter Route Start Time#"+index+"#Route_Start_Time_" :message;
          invalidCount = invalidCount + 1;
        }
        else if((element.Route_End_Time == null || element.Route_End_Time == '')&&(element.Route_Start_Time != null && element.Route_Start_Time != ''))
        {
          message = message == "" ? "Please Enter Route_End_Time#"+index+"#Route_End_Time_" :message;
          invalidCount = invalidCount + 1;
        }
        else if((element.Route_End_Time != null && element.Route_End_Time != '')&&(element.Route_Start_Time != null && element.Route_Start_Time != '')){
            var startTime = element.Route_Start_Time.replace(':','.');
            var endTime = element.Route_End_Time.replace(':','.');

            if(parseFloat(endTime)< parseFloat(startTime)){
              message = message == "" ? "End Time must be greater then Start Time#"+index+"#Route_Start_Time_" :message;
              invalidCount = invalidCount + 1;
            }
        }
      });
      message = message == "" ? "true" : message;
     return message;
    }

    saveRouteTimeList() {
      this.errorMessage = "";

      var returnMsg = this.validateList();
      // var returnMsg ="true"
      if(returnMsg == "true"){
        this._commonService.saveRouteTimeList( this.userId,this.routeTimeObj.Route_Date,this.routeTimeMasterList)
        .subscribe((data) => {
          this.errorMessage = this.commonHelper.commonAlertReturnError('Updated', data,'/master/route-time-mgmt', '/master/add-edit-category')
        }, error => this.errorMessage = error)
      }
      else{
        this.msgArray = returnMsg.split("#");
        this.errorMessage = this.msgArray[0];
        this.renderer.selectRootElement('#'+this.msgArray[2]+this.msgArray[1]).focus();
      }
    }

    cancel() {
      this.errorMessage = '';
      this.IsAddEdit = false;
    }
}

function RouteTimeFun(isInserted) {

  let obj ={
    RT_ID :'',
    Vehicle_Id : '',
    Route_Id : '',
    Route_Date : '',
    Route_Start_Time :'',
    Route_End_Time : '',
  Created_By :'',
  Created_Date :'',
  Modified_By :'',
  Modified_Date :'',
  IsInserted : isInserted,
  Vehicle_CategoryDesc :'',
  Route_Name:''
};
  return obj;
}
