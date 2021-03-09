import { DropdownList } from './../../../../models/DropdownList';
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
  ViewChild,ElementRef, Renderer2,
} from '@angular/core';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import {
  Table
} from 'primeng/table';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.scss']
})
/************************************* Developed By RAJESH *******************************/
export class RouteListComponent implements OnInit {

  loading: boolean = true;
  IsAddEdit = false;
  routeMaster: [];
  selectedRouteMaster: [];
  userId: string = localStorage.getItem('userId');
  msgType: string = '';
  message: string = '';
  @ViewChild('dt') table: Table;

  //----------------- Add Edit
  routeObj :any ={};

  title: string = "Create";
  routeId: number;
  errorMessage: any ='';
  StatusList : Observable<DropdownList[]>;
  RouteList : Observable<DropdownList[]>;
  SelectedStatus : string = 'A';
  isInserted : string = 'I';
  //--------------------------
  constructor(private _commonService: ProtoServicesService, private _router: Router, private primengConfig: PrimeNGConfig, private el : ElementRef, private renderer: Renderer2) {}
  commonHelper = new AdminCommonHelperComponent(this._router);
  warningMessage : string  = this.commonHelper.commonWarningMessage;
  deleteTooltip : string  = this.commonHelper.deleteTooltip;
  restoreTooltip : string  = this.commonHelper.restoreTooltip;
  required : string  = this.commonHelper.required;

  ngOnInit(): void {
    this.getRouteList();
  }

  getRouteList() {
    this._commonService.getRouteList().subscribe(
      (data) => {
        this.routeMaster = data;
        this.loading = false;
      }
    );
  }

  openInsertPage() {
    this._router.navigate(['/master/add-edit-route']);
  }

  openEditPage(id) {
    this._router.navigate(['/master/add-edit-route', id]);
  }

  deleteItem(routeId) {
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
        this._commonService.deleteRoute(routeId, this.userId).subscribe((data) => {
          let ret = this.commonHelper.activeInactiveAlert('Deleted', data);
          if (ret == 'S') {
            this.getRouteList();
          }
        }, error => console.error(error))
      }
    })
  }

  activateItem(routeId) {
    this._commonService.activeRoute(routeId, this.userId).subscribe((data) => {
      let ret = this.commonHelper.activeInactiveAlert('Activated', data);
      if (ret == 'S') {
        this.getRouteList();
      }
    }, error => console.error(error))
  }


  openRouteInfo(routeId){

  }

//============== CRUD functionality
addEditOpen(id : any):void {
  this.errorMessage = '';
  this.IsAddEdit = true;
  this.routeId = id;
  this.getCommonList();
  if (this.routeId > 0) {
    this.title = "Edit";
    this._commonService.getRouteById(this.routeId)
      .subscribe((resp) =>
      {
        this.routeObj = resp
        , error => this.errorMessage = error
      });
  }else {
    this.title = "Create";
    this.routeObj = RouteFun(this.isInserted);
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
  if(this.routeObj.Route_From == ''){
    this.errorMessage = "Please Enter Route From";
    this.renderer.selectRootElement('#Route_From').focus();
    return false;
  }else if(this.routeObj.Route_To == ''){
    this.errorMessage = "Please Enter Route To";
    this.renderer.selectRootElement('#Route_To').focus();
    return false;
  }
  else{
    return true;
  }
}

saveRoute() {
  if(this.validate()){
    this.routeObj.Created_By = this.userId;
    if (this.title == "Create") {
      this.routeObj.IsInserted = 'I';
      this._commonService.saveRoute(this.routeObj)
        .subscribe((data) => {
          this.commonHelper.commonAlerts('Inserted', data,'/master/route-master', '/master/add-edit-category')

        }, error => this.errorMessage = error)
    }
    else if (this.title == "Edit") {
      this.routeObj.IsInserted = 'U';
      this._commonService.saveRoute(this.routeObj)
        .subscribe((data) => {
          this.commonHelper.commonAlerts('Updated', data,'/master/route-master', '/master/add-edit-category')
        }, error => this.errorMessage = error)
    }
  }

}

cancel() {
  this.errorMessage = '';
  this.IsAddEdit = false;
  // this._router.navigate(['/master/category-master']);
}

}


function RouteFun(isInserted) {

  let obj ={
    Route_ID :'',
    Route_Name : '',
    Route_From : '',
    Route_To : '',
    RouteDetailCount : '',
    RouteInfo : '',
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
