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
  selector: 'app-vehicle-route-time-detail-list',
  templateUrl: './vehicle-route-time-detail-list.component.html',
  styleUrls: ['./vehicle-route-time-detail-list.component.scss'],
  providers: [ //DatePicker
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
  ],
})
/************************************* Developed By RAJESH *******************************/
export class VehicleRouteTimeDetailListComponent implements OnInit {

  loading: boolean = true;
  IsAddEdit = false;
  routeTimeMaster: [];
  selectedVehicleRouteTimeDetail: [];
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
  selectedVehicleRouteTimeDetailList: [];
isViewVehicleRouteTimeDetail : boolean =false;
  constructor(private _commonService: ProtoServicesService, private _router: Router, private primengConfig: PrimeNGConfig, private renderer: Renderer2) {}
  commonHelper = new AdminCommonHelperComponent(this._router);
  warningMessage : string  = this.commonHelper.commonWarningMessage;
  deleteTooltip : string  = this.commonHelper.deleteTooltip;
  clearTooltip : string  = this.commonHelper.clearTooltip;
  restoreTooltip : string  = this.commonHelper.restoreTooltip;
  required : string  = this.commonHelper.required;
  ngOnInit(): void {
    this.getCommonList();
  }

    //============== CRUD functionality

    getCommonList(){
       this._commonService.GetActiveVehicleList('0').subscribe(
        (data) =>
         {
            this.VehicleList = data;
        }
      )
    }

    validate(){
      if(this.routeTimeObj.Route_Date_Dt == null || this.routeTimeObj.Route_Date_Dt == '' )
      {
        this.errorMessage = "Please Select Route Date";
        return false;
      }
      else if(this.routeTimeObj.Vehicle_Id == null || this.routeTimeObj.Vehicle_Id == '' || this.routeTimeObj.Vehicle_Id == '0' || this.routeTimeObj.Vehicle_Id == 0 )
      {
        this.errorMessage = "Please Select Vehicle";
        return false;
      }
      else{
        this.errorMessage ='';
        return true;
      }
    }

    viewVehicleRouteTimeDetail(){

      if(this.validate()){
        this.isViewVehicleRouteTimeDetail = true;
        this.routeTimeObj.Route_Date = new Date(this.routeTimeObj.Route_Date_Dt).toLocaleString();
        this._commonService.viewVehicleRouteTimeInfo(this.routeTimeObj.Vehicle_Id,this.routeTimeObj.Route_Date).subscribe(
          (data) =>
           {
              this.routeTimeMasterList = data;
              this.loading = false;
          }
        )
      }
    }
    cancel() {
      this.errorMessage = '';
      this.isViewVehicleRouteTimeDetail = false;
      this.IsAddEdit = false;
    }
}

function VehicleRouteTimeDetailFun(isInserted) {

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
