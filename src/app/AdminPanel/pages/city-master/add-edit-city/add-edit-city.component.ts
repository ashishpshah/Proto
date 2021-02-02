import { AdminCommonHelperComponent } from './../../AdminCommonHelper/AdminCommonHelper.component';
import { ProtoServicesService } from './../../../Services/proto-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { DropdownList } from 'src/app/models/DropdownList';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-add-edit-city',
  templateUrl: './add-edit-city.component.html',
  styleUrls: ['./add-edit-city.component.scss']
})
/************************************* Developed By RAJESH *******************************/
export class AddEditCityComponent implements OnInit {
  cityObj :any ={};

  title: string = "Create";
  cityId: number;
  stateId:string;
  errorMessage: any ='';
  StateList : Observable<DropdownList[]>;
  CityList : Observable<DropdownList[]>;
  SelectedStatus : string = 'A';
  userId : string = localStorage.getItem('userId');
  isInserted : string = 'I';
  msgType : string = '';
  message : string = '';

  constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
    private _commonService : ProtoServicesService, private _router: Router, private el : ElementRef, private renderer: Renderer2) {
      if (this._avRoute.snapshot.params["id"]) {
        this.cityId = this._avRoute.snapshot.params["id"];
        this.stateId = this._avRoute.snapshot.params["stateId"];
        this.isInserted = 'U';
      }
    }
    commonHelper = new AdminCommonHelperComponent(this._router);
    warningMessage : string  = this.commonHelper.commonWarningMessage;
  deleteTooltip : string  = this.commonHelper.deleteTooltip;
  restoreTooltip : string  = this.commonHelper.restoreTooltip;
  required : string  = this.commonHelper.required;

    ngOnInit():void {

      this.getCommonList();

      if (this.cityId > 0) {
        this.title = "Edit";
        this._commonService.getCityById(this.cityId,this.stateId)
          .subscribe((resp) =>
          {
            this.cityObj = resp
            , error => this.errorMessage = error
          });
      }else {
        this.cityObj = CityFun(this.isInserted);
      }
    }

    getCommonList(){

      this._commonService.GetStateList().subscribe(
        (data) =>
         {
            this.StateList = data;
        }
      )
    }

    validate(){
      if(this.cityObj.RCatg_ID == null || this.cityObj.RCatg_ID == '' || this.cityObj.RCatg_ID == '0' || this.cityObj.RCatg_ID == 0 )
      {
        this.errorMessage = "Please Select Root City";
        // this.renderer.selectRootElement('#RCatg_ID').focus();
        return false;
      }
      else if(this.cityObj.Catg_Name == ''){
        this.errorMessage = "Please Enter City Name";
        this.renderer.selectRootElement('#Catg_Name').focus();
        return false;
      }
      else if(this.cityObj.Catg_Name_D == '')
      {
        this.errorMessage = "Please Enter ategory Name (Danish)";
        this.renderer.selectRootElement('#Catg_Name_D').focus();
        return false;
      }
      else if(this.cityObj.Display_Seq_No == '' || this.cityObj.Display_Seq_No == '0' || this.cityObj.Display_Seq_No == 0 )
      {
        this.errorMessage = "Please Enter Display Seq No";
        this.renderer.selectRootElement('#Display_Seq_No').focus();
        return false;
      }
      else{
        return true;
      }
    }

    saveCity() {
      if(this.validate()){
        this.cityObj.Created_By = this.userId;
        if (this.title == "Create") {
          this.cityObj.IsInserted = 'I';
          this._commonService.saveCity(this.cityObj)
            .subscribe((data) => {
              this.commonHelper.commonAlert('Inserted', data, '/master/city-master')

            }, error => this.errorMessage = error)
        }
        else if (this.title == "Edit") {
          this.cityObj.IsInserted = 'U';
          this._commonService.saveCity(this.cityObj)
            .subscribe((data) => {
              this.commonHelper.commonAlert('Updated', data, '/master/city-master')
            }, error => this.errorMessage = error)
        }
      }

    }

    cancel() {
      this._router.navigate(['/master/city-master']);
    }

}


function CityFun(isInserted) {

  let obj ={
  Catg_ID :'',
  RCatg_ID : '',
  Catg_Name : '',
  Catg_Name_D : '',
  Display_Seq_No :'',
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
