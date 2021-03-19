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
import { extendMoment } from 'moment-range';

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
  selector: 'app-vehicle-route-time-map-list',
  templateUrl: './vehicle-route-time-map-list.component.html',
  styleUrls: ['./vehicle-route-time-map-list.component.scss'],
  providers: [ //DatePicker
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
  ],
})
/************************************* Developed By RAJESH *******************************/
export class VehicleRouteTimeMapListComponent implements OnInit {

  loading: boolean = true;
  IsAddEdit = false;
  routeTimeMaster: [];
  selectedVehicleRouteTimeMap: [];
  userId: string = localStorage.getItem('userId');
  msgType: string = '';
  message: string = '';
  @ViewChild('dt') table: Table;

  //----------- Add Edit
  routeTimeObj :any ={};

  title: string = "Create";
  categoryId: number;
  errorMessage: any ='';
  successMessage: any ='';
  RouteList : Observable<DropdownListInt[]>;
  VehicleList : Observable<DropdownListInt[]>;
  SelectedStatus : string = 'A';
  isInserted : string = 'I';
  categoryName : string ='';
  msgArray : any[] = [];
  //-----------------
  YearList : any[]=[];
  MonthList:any[]=[];
  WeekList:any[]=[];
  // DaysScheduleDtlList : any[] = [];
  // Day1ScheduleDtlList : any[] = [];
  // Day2ScheduleDtlList : any[] = [];
  // Day3ScheduleDtlList : any[] = [];
  // Day4ScheduleDtlList : any[] = [];
  // Day5ScheduleDtlList : any[] = [];
  // Day6ScheduleDtlList : any[] = [];
  // Day7ScheduleDtlList : any[] = [];

  routeTimeMasterList: any[] =[];
  selectedVehicleRouteTimeMapList: [];
  isViewVehicleRouteTimeMap : boolean =false;

  constructor(private _commonService: ProtoServicesService, private _router: Router, private primengConfig: PrimeNGConfig, private renderer: Renderer2) {}

  commonHelper = new AdminCommonHelperComponent(this._router);
  warningMessage : string  = this.commonHelper.commonWarningMessage;
  deleteTooltip : string  = this.commonHelper.deleteTooltip;
  clearTooltip : string  = this.commonHelper.clearTooltip;
  restoreTooltip : string  = this.commonHelper.restoreTooltip;
  required : string  = this.commonHelper.required;
  noItemsFoundMsg : string = this.commonHelper.noItemsFoundMsg;

  ngOnInit(): void {
    this.routeTimeObj = VehicleRouteTimeMapFun('');
    this.getCommonList();
  }

  //============== CRUD functionality

    getCommonList(){
       this.YearList = this.commonHelper.getPreNextYearList();
       this.MonthList = this.commonHelper.getMonthList();

        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1;
        var year = dateObj.getUTCFullYear();

       this.routeTimeObj.Year = year;
       this.routeTimeObj.Month =month;

       this.getWeekByYrMonth(year,month,true)


       this._commonService.GetActiveVehicleList('0').subscribe(
        (data) =>
         {
            this.VehicleList = data;
        }
      )
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

    getWeekByDays(year,month){
      let weeks = []
      if(year != null && month != null && year != '' && month != ''){
      const moment = extendMoment(_moment);
      let startDate  = moment([year, month-1])
      let firstDay = moment(startDate).startOf('month')
      let endDay = moment(startDate).endOf('month')
      let monthRange = moment.range(firstDay, endDay)

      const days = Array.from(monthRange.by('day'));
      days.forEach(it => {
          if (!weeks.includes(it.week())) {
              weeks.push(it.week());
          }
        })
      }
      return weeks;
    }

    getCurrentWeekNo(){
      const todays:any = new Date();
      const firstDayOfYears :any= new Date(todays.getFullYear(), 0, 1);
      const pastDaysOfYear = (todays - firstDayOfYears) / 86400000;
      let currentWeekNo :any = Math.ceil((pastDaysOfYear + firstDayOfYears.getDay() + 1) / 7);
      return currentWeekNo;
    }

    getWeekByYrMonth(year,month,isCurrent){
      const moment = extendMoment(_moment);
      if(year != null && month != null){
        let weeks : any[] = this.getWeekByDays(year,month);
          var dateObj = new Date();
          isCurrent = (dateObj.getUTCMonth() + 1) == month ? true:false;
          let i : number = 0;
          let currentWeekNo :any = this.getCurrentWeekNo();
          const calendar = []
          weeks.forEach(week => {
            i = i+1;
              const firstWeekDay:any = moment([year, month-1]).week(week).day(1)
              const lastWeekDay:any = moment([year, month-1]).week(week).day(7)
              this.routeTimeObj.Week =isCurrent? this.routeTimeObj.Week =='' ||this.routeTimeObj.Week == null ? currentWeekNo == week ? i : this.routeTimeObj.Week:this.routeTimeObj.Week :1;
              let dt :any = {};
              dt.id = i;
              dt.name = 'Week : '+i+' ( '+(firstWeekDay._d.toString().slice(4,16) +'- '+lastWeekDay._d.toString().slice(4,16)).toString() +')';
              calendar.push(dt);
          })
          this.WeekList = calendar;
      }else{
        this.WeekList =[];
        this.routeTimeObj.Week = '';
      }
    }

    GetVehicleCategoryByVehicleId(vehicleId:string,routeIndex,index){
      this.routeTimeMasterList[routeIndex].VehicleRouteList[index].Vehicle_CategoryDesc = '';

      this._commonService.GetVehicleCategoryByVehicleId(vehicleId).subscribe(
        (data) =>
         {

          this.routeTimeMasterList[routeIndex].VehicleRouteList[index].Vehicle_CategoryDesc = data.Vehicle_CategoryDesc;
          // this.routeTimeObj.Vehicle_CategoryDesc = data.Vehicle_CategoryDesc;
        }
      )
    }

    validate(){
      if(this.routeTimeObj.Year == null || this.routeTimeObj.Year == '' ||this.routeTimeObj.Year == 0|| this.routeTimeObj.Year == '0')
      {
        this.errorMessage = "Please Select Year";
        return false;
      }
      else if(this.routeTimeObj.Month == null || this.routeTimeObj.Month == '' || this.routeTimeObj.Month == '0' || this.routeTimeObj.Month == 0 )
      {
        this.errorMessage = "Please Select Month";
        return false;
      }
      else if(this.routeTimeObj.Week == null || this.routeTimeObj.Week == '' || this.routeTimeObj.Week == '0' || this.routeTimeObj.Week == 0 )
      {
        this.errorMessage = "Please Select Week";
        return false;
      }
      else{
        this.errorMessage ='';
        return true;
      }
    }

    saveVehicleRouteTimeMap() {
      if(this.validate()){

        this.routeTimeObj.Created_By = this.userId;
        this.routeTimeObj.Route_Date = new Date(this.routeTimeObj.Route_Date).toLocaleString();
        if (this.title == "Create") {
          this.routeTimeObj.IsInserted = 'I';
          this._commonService.saveVehicleRouteTimeMap(this.routeTimeObj)
            .subscribe((data) => {
              this.commonHelper.commonAlerts('Inserted', data,'/master/vehicle-route-time-map-master', '/master/add-edit-category')

            }, error => this.errorMessage = error)
        }
        else if (this.title == "Edit") {
          this.routeTimeObj.IsInserted = 'U';
          this._commonService.saveVehicleRouteTimeMap(this.routeTimeObj)
            .subscribe((data) => {
              this.commonHelper.commonAlerts('Updated', data,'/master/vehicle-route-time-map-master', '/master/add-edit-category')
            }, error => this.errorMessage = error)
        }
      }
    }

    viewWeekData(){

      const moment = extendMoment(_moment);

      const calendar = [];
      if(this.validate()){
        let year = this.routeTimeObj.Year;
        let month = this.routeTimeObj.Month;
        this.isViewVehicleRouteTimeMap = true;
        let weeks : any[] = this.getWeekByDays(year,month);
        let weekNo : number = 0;
        let dayNo : number = 0;

        weeks.forEach(week => {
          weekNo = weekNo+1;
          if(weekNo == this.routeTimeObj.Week ){
            dayNo = dayNo +1;
              for (let index = 1; index < 8; index++) {
                const Date:any = moment([year, month]).week(week).day(index)
                let dt :any = VehicleRouteTimeMapFun('');
                dt.Route_Date_Dt = Date._d.toString().slice(4,16);
                dt.Day = index;
                dt.Week = this.routeTimeObj.Week;
                dt.IsError = 'N';
                calendar.push(dt);
                // let route_Date:any = new Date(dt.Route_Date_Dt).toLocaleString();

              }
            //firstWeekDay._d.toString().slice(4,16)
          }

        })

        this.routeTimeMasterList =calendar;
        if(this.routeTimeMasterList != null  && this.routeTimeMasterList.length > 0){
          for (let index = 0; index < this.routeTimeMasterList.length; index++) {
            let ele :any = this.routeTimeMasterList[index];
            let route_Date:any = new Date(ele.Route_Date_Dt).toLocaleString();
            this._commonService.viewVehicleRouteScheduleByDate(route_Date).subscribe(
              (data) =>
              {

                if(data != null && data != "e" && data != "r" && data != "o" && data.length > 0){
                  ele.TotalCount = data[0].TotalCount;
                  ele.IsTableOpen = true;
                  ele.VehicleRouteList = data;
                }else{
                  ele.TotalCount = 0;
                }
                // this.routeTimeMasterList.push(ele);
              }
            )

          }
        }

        // if(this.routeTimeMasterList != null){
        //   this.routeTimeMasterList.map(row => {
        //     row.VehicleRouteList:any[] = VehicleRouteList
        //   });
        // }
        this.loading = false;
      }

    }

    lastIndex: any = 0;
    AddVehicleRouteByDate(index,routeDate){
      this.successMessage ="";
      this.errorMessage = "";
      let isFirstTime : boolean = this.routeTimeMasterList[index].IsTableOpen == true ?false:true;
      this.routeTimeMasterList[index].IsTableOpen = true;
      // this.routeTimeMasterList.map(row => {
      //       row.IsError = 'N';
      //     });
      if(isFirstTime){
        let route_Date:any = new Date(routeDate).toLocaleString();
        this._commonService.viewVehicleRouteScheduleByDate(route_Date).subscribe(
          (data) =>
           {
            this.routeTimeMasterList[index].VehicleRouteList = data;
              this.lastIndex = this.routeTimeMasterList[index].VehicleRouteList.length;
              var currentElement = this.routeTimeMasterList[index].VehicleRouteList[parseInt(this.lastIndex)-1];
              this.routeTimeMasterList[index].VehicleRouteList.splice(0, 0, new VehicleRouteList());
          }
        )
      }else{
        this.lastIndex = this.routeTimeMasterList[index].VehicleRouteList.length;

        var currentElement = this.routeTimeMasterList[index].VehicleRouteList[parseInt(this.lastIndex)-1];
        this.routeTimeMasterList[index].VehicleRouteList.splice(0, 0, new VehicleRouteList());
      }
    }
    ViewVehicleRouteByDate(index,routeDate){
      this.successMessage ="";
      this.errorMessage = "";
      this.routeTimeMasterList[index].IsTableOpen = true;
      let route_Date:any = new Date(routeDate).toLocaleString();
      this._commonService.viewVehicleRouteScheduleByDate(route_Date).subscribe(
        (data) =>
         {
          this.routeTimeMasterList[index].VehicleRouteList = data;
        }
      )
    }
    //Old Code : Don't remove : RG
    DisplayVehicleRoute(index,routeDate){
      let isFirstTime : boolean = this.routeTimeMasterList[index].IsTableOpen == true ?false:true;
      this.routeTimeMasterList[index].IsTableOpen = true;
      this.routeTimeMasterList.map(row => {
            row.IsError = 'N';
          });
      if(isFirstTime){
        let route_Date:any = new Date(routeDate).toLocaleString();
        this._commonService.viewVehicleRouteScheduleByDate(route_Date).subscribe(
          (data) =>
           {
            this.routeTimeMasterList[index].VehicleRouteList = data;
            if(data == null || data =='' || data == 'e' || data == '0' || this.routeTimeMasterList[index].VehicleRouteList.length == 0){
              this.lastIndex = this.routeTimeMasterList[index].VehicleRouteList.length;

              var currentElement = this.routeTimeMasterList[index].VehicleRouteList[parseInt(this.lastIndex)-1];
              this.routeTimeMasterList[index].VehicleRouteList.splice(0, 0, new VehicleRouteList());
            }
          }
        )
      }else{
        this.lastIndex = this.routeTimeMasterList[index].VehicleRouteList.length;

        var currentElement = this.routeTimeMasterList[index].VehicleRouteList[parseInt(this.lastIndex)-1];
        this.routeTimeMasterList[index].VehicleRouteList.splice(0, 0, new VehicleRouteList());
      }
    }

    clearRecordItem(routeIndex,index){
      this.routeTimeMasterList[routeIndex].VehicleRouteList.splice(index, 1);
      if(this.routeTimeMasterList[routeIndex].VehicleRouteList.length == 0){
        this.routeTimeMasterList[routeIndex].IsTableOpen = false;
      }
    }

    validateList(index) : any{
      let invalidCount = 0;
      let message = "";

      this.routeTimeMasterList[index].VehicleRouteList.filter(function (element,index) {

        if((element.Vehicle_Id == null || element.Vehicle_Id == '' ||element.Vehicle_Id == 0))
        {
          message = message == "" ? "Please Select Vehicle#"+index+"#Vehicle_Id_" :message;
          invalidCount = invalidCount + 1;
        }
        else if((element.Route_Id == null || element.Route_Id == '' ||element.Route_Id == 0))
        {
          message = message == "" ? "Please Enter Route#"+index+"#Route_Id_" :message;
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

    saveVehicleRouteTimeMapList(index) {

      // this.routeTimeMasterList.map(row => {
      //   row.IsError = 'N';
      // });
      this.successMessage ="";
      this.errorMessage = "";
      var returnMsg = this.validateList(index);
      if(returnMsg == "true"){

        this.routeTimeMasterList[index].Route_Date = new Date(this.routeTimeMasterList[index].Route_Date_Dt).toLocaleString();
        this._commonService.saveVehicleRouteTimeMapList( this.userId,this.routeTimeMasterList[index].Route_Date,this.routeTimeMasterList[index].VehicleRouteList)
        .subscribe((data) => {
          let obj :any ={};
          obj = this.commonHelper.commonAlertForSamePageRtnObj(data)
          debugger;
          this.errorMessage =obj.msgType =='S'?'':obj.message;
          this.successMessage = obj.msgType =='S'?obj.message:'';
          this.routeTimeMasterList[index].IsError =  obj.msgType == 'S'? 'N':'Y';
          if(obj.msgType =='S'){
            this.viewWeekData();
          }

        }, error => this.errorMessage = error)
      }
      else{
        this.routeTimeMasterList[index].IsError = 'Y';
        this.msgArray = returnMsg.split("#");
        this.errorMessage = this.msgArray[0];
        // this.renderer.selectRootElement('#'+this.msgArray[2]+this.msgArray[1]).focus();
      }
    }
    clearRoutTime(rtId :number,  routeId:string,routeDate,routeIndex:number){
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
          this._commonService.deleteVehicleRouteTimeMap(rtId, this.userId).subscribe((data) => {
            let ret = this.commonHelper.activeInactiveAlert('Deleted', data);
            if (ret == 'S') {
              this.ViewVehicleRouteByDate(routeIndex,routeDate)
            }
          }, error => console.error(error))
        }
      })
    }
    cancel() {
      this.errorMessage = '';
      this.isViewVehicleRouteTimeMap = false;
      this.IsAddEdit = false;
    }
}

function VehicleRouteTimeMapFun(isInserted) {

  let obj ={
    RT_ID :'',
    Vehicle_Id : '',
    Route_Id : '',
    Route_Date : '',
    Route_Date_Dt:'',
    Route_Start_Time :'',
    Route_End_Time : '',
    Route_Ids:'',
    Created_By :'',
    Created_Date :'',
    Modified_By :'',
    Modified_Date :'',
    IsInserted : isInserted,
    Vehicle_CategoryDesc :'',
    Route_Name:'',
    Year:'',
    Month:'',
    Week:'',
    Day:'',
    IsTableOpen:false,
    IsError:'N',
    VehicleRouteList:[],
    TotalCount:0
};
  return obj;
}

function VehicleRouteDtl(){
  let obj ={
    RT_ID :'',
    Vehicle_Id : '',
    Route_Id : '',
    Route_Date : '',
    Route_Date_Dt:'',
    Route_Start_Time :'',
    Route_End_Time : '',
    Route_Ids:'',
    Created_By :'',
    Created_Date :'',
    Modified_By :'',
    Modified_Date :'',
    IsInserted : '',
    Vehicle_CategoryDesc :'',
    Route_Name:'',
    Year:'',
    Month:'',
    Week:'',
    Day:'',
    IsTableOpen:false,
    IsError :'N',
    TotalCount:0
}
return obj;
}

export class VehicleRouteList {
  RT_ID :'';
  Vehicle_Id : '';
  Route_Id : '';
  Route_Date : '';
  Route_Date_Dt:'';
  Route_Start_Time :'';
  Route_End_Time : '';
  Route_Ids:'';
  Created_By :'';
  Created_Date :'';
  Modified_By :'';
  Modified_Date :'';
  IsInserted : '';
  Vehicle_CategoryDesc :'';
  Route_Name:'';
  Year:'';
  Month:'';
  Week:'';
  Day:'';
  IsTableOpen:false;
  IsError :'N';
  TotalCount:0;
}
