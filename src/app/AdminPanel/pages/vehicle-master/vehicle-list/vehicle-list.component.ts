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
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
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
  StatusList : Observable<DropdownList[]>;
  VehicleTypeList : Observable<DropdownList[]>;
  VehicleCategoryList : Observable<DropdownList[]>;
  SelectedStatus : string = 'A';
  isInserted : string = 'I';
  //-----------------

  constructor(private _commonService: ProtoServicesService, private _router: Router, private primengConfig: PrimeNGConfig, private renderer: Renderer2) {}
  commonHelper = new AdminCommonHelperComponent(this._router);

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
      debugger;
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

    //============== CRUD functionality

    addEditOpen(id : any):void {
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
            // this.vehicleObj.SelectedDepartment = resp.Department.split(',')
            , error => this.errorMessage = error
          });
      }else {
        this.title = "Create";
        this.vehicleObj = VehicleFun(this.isInserted);
      }
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
      this._commonService.GetVehicleCategoryList("0").subscribe(
        (data) =>
         {
            this.VehicleCategoryList = data;
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
      else{
        return true;
      }
    }

    saveVehicle() {
      debugger;
      if(this.validate()){
        this.vehicleObj.Created_By = this.userId;
        // this.vehicleObj.Department = this.vehicleObj.SelectedDepartment.join(',');
        if (this.title == "Create") {
          this.vehicleObj.IsInserted = 'I';
          this._commonService.saveVehicle(this.vehicleObj)
            .subscribe((data) => {
              this.commonHelper.commonAlerts('Inserted', data,'/master/vehicle-master', '/master/add-edit-vehicle')

            }, error => this.errorMessage = error)
        }
        else if (this.title == "Edit") {
          this.vehicleObj.IsInserted = 'U';
          this._commonService.saveVehicle(this.vehicleObj)
            .subscribe((data) => {
              this.commonHelper.commonAlerts('Updated', data,'/master/vehicle-master', '/master/add-edit-vehicle')
            }, error => this.errorMessage = error)
        }
      }
    }

    cancel() {
      this.errorMessage = '';
      this.IsAddEdit = false;
      // this._router.navigate(['/master/vehicle-master']);
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
};
  return obj;
}
