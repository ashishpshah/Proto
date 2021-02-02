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
  selector: 'app-vehicle-route-list',
  templateUrl: './vehicle-route-list.component.html',
  styleUrls: ['./vehicle-route-list.component.scss']
})
/************************************* Developed By RAJESH *******************************/
export class VehicleRouteListComponent implements OnInit {

  loading: boolean = true;
  IsAddEdit = false;
  vehicleRouteMaster: any[] = [];
  selectedVehicleRouteMaster: [];
  userId: string = localStorage.getItem('userId');
  msgType: string = '';
  message: string = '';
  @ViewChild('dt') table: Table;
  IsRowEdit : boolean =false;

  //----------- Add Edit
  vehicleRouteObj :any ={};

  title: string = "Create";
  mapId: number;
  errorMessage: any ='';
  StatusList : Observable<DropdownList[]>;
  VehicleList : Observable<DropdownList[]>;
  RouteList : Observable<DropdownList[]>;
  SelectedStatus : string = 'A';
  isInserted : string = 'I';
  //-----------------

  constructor(private _commonService: ProtoServicesService, private _router: Router, private primengConfig: PrimeNGConfig, private renderer: Renderer2) {}
  commonHelper = new AdminCommonHelperComponent(this._router);
  warningMessage : string  = this.commonHelper.commonWarningMessage;
  deleteTooltip : string  = this.commonHelper.deleteTooltip;
  restoreTooltip : string  = this.commonHelper.restoreTooltip;
  required : string  = this.commonHelper.required;
  ngOnInit(): void {
    this.getVehicleRouteList();
  }

  getVehicleRouteList() {
    this._commonService.getVehicleRouteList('0').subscribe(
      (data) => {
        this.vehicleRouteMaster = data;
        this.vehicleRouteMaster.map(row => {
          row.isEditable = false;
        });
        this.loading = false;
      }
    );
  }

  deleteItem(mapId) {
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
        this._commonService.deleteVehicleRoute(mapId, this.userId).subscribe((data) => {
          let ret = this.commonHelper.activeInactiveAlert('Deleted', data);
          if (ret == 'S') {
            this.getVehicleRouteList();
          }
        }, error => console.error(error))
      }
    })
  }

  activateItem(mapId) {
    this._commonService.activeVehicleRoute(mapId, this.userId).subscribe((data) => {
      let ret = this.commonHelper.activeInactiveAlert('Activated', data);
      if (ret == 'S') {
        this.getVehicleRouteList();
      }
    }, error => console.error(error))
  }

    //============== CRUD functionality

    openEditPage(row){
      this.getCommonList();
      this.IsAddEdit = false;
      this.IsRowEdit = true;
      this.vehicleRouteMaster.filter(row => row.isEditable).map(r => { r.isEditable = false; return r })

      row.SelectedRoute = row.Route_Ids.split(',').map(item => parseInt(item) ? parseInt(item) : item);
      row.isEditable = true;
     }
     cancelUpdate(row) {
      this.IsRowEdit = false;
      row.isEditable = false;
      this.getVehicleRouteList();
    }
    updateVehicleRoute(item : any) {
      if(this.validateInline(item)){
        item.Created_By = this.userId;
        item.IsInserted = 'U';

        item.Route_Ids = item.SelectedRoute.join(',');
          this._commonService.saveVehicleRoute(item)
            .subscribe((data) => {
              this.commonHelper.commonAlerts('Updated', data, '/master/vehicle-route-master', '/master/add-edit-brand')
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
      if(item.Vehicle_No == null || item.Vehicle_No == '' || item.Vehicle_No == '0' || item.Vehicle_No == 0 )
      {
        this.errorMessage = "Please Select Vehicle";
        // this.renderer.selectRootElement('#Root_Header_ID').focus();
        return false;
      }else if(item.SelectedRoute == null || item.SelectedRoute == '' || item.SelectedRoute == '0' || item.SelectedRoute == 0 )
      {
        this.errorMessage = "Please Select atleast one Route";
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
      this.IsRowEdit = false;
      this.mapId = id;

      this.getCommonList();

      if (this.mapId > 0) {
        this.title = "Edit";
        this._commonService.getVehicleRouteById(this.mapId)
          .subscribe((resp) =>
          {

            this.vehicleRouteObj = resp

            this.vehicleRouteObj.SelectedRoute = resp.Route_Ids.split(',')
            , error => this.errorMessage = error
          });
      }else {
        this.title = "Create";
        this.vehicleRouteObj = VehicleRouteFun(this.isInserted);
      }
    }

    getCommonList(){
       this._commonService.GetLovDetailByColumn("ACTIVEINACTIVE").subscribe(
        (data) =>
         {
            this.StatusList = data;
        }
      )
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

    validate(){
      if(this.vehicleRouteObj.Vehicle_Id == null || this.vehicleRouteObj.Vehicle_Id == '' || this.vehicleRouteObj.Vehicle_Id == '0' || this.vehicleRouteObj.Vehicle_Id == 0 )
      {
        this.errorMessage = "Please Select Vehicle";
        return false;
      }
      else if(this.vehicleRouteObj.SelectedRoute == null || this.vehicleRouteObj.SelectedRoute == '' || this.vehicleRouteObj.SelectedRoute == '0' || this.vehicleRouteObj.SelectedRoute == 0 )
      {
        this.errorMessage = "Please Select Route";
        // this.renderer.selectRootElement('#RCatg_ID').focus();
        return false;
      }
      else{
        return true;
      }
    }

    saveVehicleRoute() {

      if(this.validate()){
        this.vehicleRouteObj.Created_By = this.userId;
        this.vehicleRouteObj.Route_Ids = this.vehicleRouteObj.SelectedRoute.join(',');
        if (this.title == "Create") {
          this.vehicleRouteObj.IsInserted = 'I';
          this._commonService.saveVehicleRoute(this.vehicleRouteObj)
            .subscribe((data) => {
              this.commonHelper.commonAlerts('Inserted', data,'/master/vehicle-route-master', '/master/add-edit-category')

            }, error => this.errorMessage = error)
        }
        else if (this.title == "Edit") {
          this.vehicleRouteObj.IsInserted = 'U';
          this._commonService.saveVehicleRoute(this.vehicleRouteObj)
            .subscribe((data) => {
              this.commonHelper.commonAlerts('Updated', data,'/master/vehicle-route-master', '/master/add-edit-category')
            }, error => this.errorMessage = error)
        }
      }
    }

    cancel() {
      this.errorMessage = '';
      this.IsAddEdit = false;
    }
}

function VehicleRouteFun(isInserted) {

  let obj ={
    Map_Id :'',
    Vehicle_Id : '',
    Route_ID : '',
    Route_Ids : '',
    Vehicle_No :'',
    Route_Name :'',
    Status : 'A',
    Created_By :'',
    Created_Date :'',
    Modified_By :'',
    Modified_Date :'',
    IsDeleted :'',
    IsInserted : isInserted,
    Route :'',
    SelectedRoute:''
};
  return obj;
}
