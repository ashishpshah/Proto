import { PrimeNGConfig } from 'primeng/api';
import { AdminCommonHelperComponent } from './../../AdminCommonHelper/AdminCommonHelper.component';
import { ProtoServicesService } from './../../../Services/proto-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { DropdownList } from 'src/app/models/DropdownList';
import { Observable } from 'rxjs';
import { CityListComponent } from '../../city-master/city-list/city-list.component';


@Component({
  selector: 'app-add-edit-state',
  templateUrl: './add-edit-state.component.html',
  styleUrls: ['./add-edit-state.component.scss']
})
/************************************* Developed By RAJESH *******************************/
export class AddEditStateComponent implements OnInit {
  stateObj :any ={};

  title: string = "Create";
  stateId: number;
  errorMessage: any ='';
  CountryList : Observable<DropdownList[]>;
  StateList : Observable<DropdownList[]>;
  SelectedStatus : string = 'A';
  userId : string = localStorage.getItem('userId');
  isInserted : string = 'I';
  msgType : string = '';
  message : string = '';

  constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
    private _commonService : ProtoServicesService, private _router: Router, private el : ElementRef, private renderer: Renderer2, private primengConfig: PrimeNGConfig) {
      if (this._avRoute.snapshot.params["id"]) {
        this.stateId = this._avRoute.snapshot.params["id"];
        this.isInserted = 'U';
      }
    }
    commonHelper = new AdminCommonHelperComponent(this._router);
    warningMessage : string  = this.commonHelper.commonWarningMessage;
    cityComponent = new CityListComponent(this._commonService,this._router,this.primengConfig);
    ngOnInit():void {

      this.getCommonList();
      debugger;
      if (this.stateId > 0) {
        this.title = "Edit";
        this._commonService.getStateById(this.stateId)
          .subscribe((resp) =>
          {
            this.stateObj = resp
            , error => this.errorMessage = error
          });
      }else {
        this.stateObj = StateFun(this.isInserted);
      }
    }

    getCommonList(){
      this._commonService.GetCountryList().subscribe(
        (data) =>
         {
            this.CountryList = data;
        }
      )
    }

    validate(){
      if(this.stateObj.Country_ID == null || this.stateObj.Country_ID == '' || this.stateObj.Country_ID == '0' || this.stateObj.Country_ID == 0 )
      {
        this.errorMessage = "Please Select Country";
        // this.renderer.selectRootElement('#RCatg_ID').focus();
        return false;
      }
      else if(this.stateObj.State_Code == ''){
        this.errorMessage = "Please Enter State Code";
        this.renderer.selectRootElement('#State_Code').focus();
        return false;
      }
      else if(this.stateObj.State_Name == '')
      {
        this.errorMessage = "Please Enter State Name";
        this.renderer.selectRootElement('#State_Name').focus();
        return false;
      }
      else{
        return true;
      }
    }

    saveState() {
      if(this.validate()){
        this.stateObj.Operated_By = this.userId;
        if (this.title == "Create") {
          this.stateObj.IsInserted = 'I';
          this._commonService.saveState(this.stateObj)
            .subscribe((data) => {
              this.commonHelper.commonAlert('Inserted', data, '/master/state-master')

            }, error => this.errorMessage = error)
        }
        else if (this.title == "Edit") {
          this.stateObj.IsInserted = 'U';
          this._commonService.saveState(this.stateObj)
            .subscribe((data) => {
              this.commonHelper.commonAlert('Updated', data, '/master/state-master')
            }, error => this.errorMessage = error)
        }
      }
    }

    cancel() {
      this._router.navigate(['/master/state-master']);
    }

}


function StateFun(isInserted) {

  let obj ={
    State_ID :'',
    State_Code : '',
    Country_ID : '',
    Countryname : '',
    State_Name :'',
    Operated_By :'',
  IsInserted : isInserted
};
  return obj;
}
