import { AdminCommonHelperComponent } from './../../AdminCommonHelper/AdminCommonHelper.component';
import { ProtoServicesService } from './../../../Services/proto-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { DropdownList } from 'src/app/models/DropdownList';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-add-edit-route',
  templateUrl: './add-edit-route.component.html',
  styleUrls: ['./add-edit-route.component.scss']
})
/************************************* Developed By RAJESH *******************************/
export class AddEditRouteComponent implements OnInit {
  routeObj :any ={};

  title: string = "Create";
  routeId: number;
  errorMessage: any ='';
  StatusList : Observable<DropdownList[]>;
  RouteList : Observable<DropdownList[]>;
  SelectedStatus : string = 'A';
  userId : string = localStorage.getItem('userId');
  isInserted : string = 'I';
  msgType : string = '';
  message : string = '';

  constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
    private _commonService : ProtoServicesService, private _router: Router, private el : ElementRef, private renderer: Renderer2) {
      if (this._avRoute.snapshot.params["id"]) {
        this.routeId = this._avRoute.snapshot.params["id"];
        this.isInserted = 'U';
      }
    }
    commonHelper = new AdminCommonHelperComponent(this._router);


// longitude = 20.728218;
// latitude = 52.128973;

// markers = [
// { latitude: 52.228973, longitude: 20.728218 }
// ];

// placeMarker(position: any) {
// const lat = position.coords.lat;
// const lng = position.coords.lng;

// this.markers.push({ latitude: lat, longitude: lng });
// }



    ngOnInit():void {

      this.getCommonList();
      debugger;
      if (this.routeId > 0) {
        this.title = "Edit";
        this._commonService.getRouteById(this.routeId)
          .subscribe((resp) =>
          {
            this.routeObj = resp
            , error => this.errorMessage = error
          });
      }else {
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
      if(this.routeObj.Route_Name == ''){
        this.errorMessage = "Please Enter Route Name";
        this.renderer.selectRootElement('#Route_Name').focus();
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
              this.commonHelper.commonAlert('Inserted', data, '/master/route-master')

            }, error => this.errorMessage = error)
        }
        else if (this.title == "Edit") {
          this.routeObj.IsInserted = 'U';
          this._commonService.saveRoute(this.routeObj)
            .subscribe((data) => {
              this.commonHelper.commonAlert('Updated', data, '/master/route-master')
            }, error => this.errorMessage = error)
        }
      }

    }

    cancel() {
      this._router.navigate(['/master/route-master']);
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
