import { AdminCommonHelperComponent } from './../../AdminCommonHelper/AdminCommonHelper.component';
import { ProtoServicesService } from './../../../Services/proto-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { DropdownList } from 'src/app/models/DropdownList';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-add-edit-street',
  templateUrl: './add-edit-street.component.html',
  styleUrls: ['./add-edit-street.component.scss']
})
/************************************* Developed By RAJESH *******************************/
export class AddEditStreetComponent implements OnInit {
  streetObj :any ={};

  title: string = "Create";
  streetId: number;
  errorMessage: any ='';
  StatusList : Observable<DropdownList[]>;
  CityList : Observable<DropdownList[]>;
  SelectedStatus : string = 'A';
  userId : string = localStorage.getItem('userId');
  isInserted : string = 'I';
  msgType : string = '';
  message : string = '';

  constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
    private _commonService : ProtoServicesService, private _router: Router, private el : ElementRef, private renderer: Renderer2) {
      if (this._avRoute.snapshot.params["id"]) {
        this.streetId = this._avRoute.snapshot.params["id"];
        this.isInserted = 'U';
      }
    }
    commonHelper = new AdminCommonHelperComponent(this._router);
    warningMessage : string  = this.commonHelper.commonWarningMessage;
    ngOnInit():void {

      this.getCommonList();
      if (this.streetId > 0) {
        this.title = "Edit";
        this._commonService.getStreetById(this.streetId)
          .subscribe((resp) =>
          {
            resp.Street_Longitude = resp.Street_Longitude == 0 || resp.Street_Longitude == '0' ? '':resp.Street_Longitude;
            resp.Street_Latitude = resp.Street_Latitude == 0 || resp.Street_Latitude == '0' ? '':resp.Street_Latitude;
            this.streetObj = resp
            , error => this.errorMessage = error
          });
      }else {
        this.streetObj = StreetFun(this.isInserted);
      }
    }

    getCommonList(){
       this._commonService.GetLovDetailByColumn("ACTIVEINACTIVE").subscribe(
        (data) =>
         {
            this.StatusList = data;
        }
      )

      this._commonService.GetAllCityList().subscribe(
        (data) =>
         {
            this.CityList = data;
        }
      )
    }

    validate(){
      if(this.streetObj.City_ID == null || this.streetObj.City_ID == '' || this.streetObj.City_ID == '0' || this.streetObj.City_ID == 0 )
      {
        this.errorMessage = "Please Select City";
        // this.renderer.selectRootElement('#RCatg_ID').focus();
        return false;
      }
      else if(this.streetObj.Street_Name == ''){
        this.errorMessage = "Please Enter Street Name";
        this.renderer.selectRootElement('#Street_Name').focus();
        return false;
      }
      else{
        return true;
      }
    }

    saveStreet() {
      if(this.validate()){
        this.streetObj.Created_By = this.userId;
        if (this.title == "Create") {
          this.streetObj.IsInserted = 'I';
          this._commonService.saveStreet(this.streetObj)
            .subscribe((data) => {
              this.commonHelper.commonAlert('Inserted', data, '/master/street-master')
            }, error => this.errorMessage = error)
        }
        else if (this.title == "Edit") {
          this.streetObj.IsInserted = 'U';
          this._commonService.saveStreet(this.streetObj)
            .subscribe((data) => {
              this.commonHelper.commonAlert('Updated', data, '/master/street-master')
            }, error => this.errorMessage = error)
        }
      }
    }

    cancel() {
      this._router.navigate(['/master/street-master']);
    }
}

function StreetFun(isInserted) {

  let obj ={
    Street_Id :'',
    City_ID : '',
    State_ID : '',
    Country_ID : '',
    Country_Name :'',
    State_Name :'',
    City_Name :'',
    Street_Name :'',
    Street_NearBy :'',
    Street_Landmark :'',
    Street_Longitude :'',
    Street_Latitude :'',
    StatusDesc :'',
    Created_By :'',
    Created_Date :'',
    Modified_By :'',
    Modified_Date :'',
    IsDeleted :'',
    IsInserted : isInserted,
    Status : 'A',
};
  return obj;
}
