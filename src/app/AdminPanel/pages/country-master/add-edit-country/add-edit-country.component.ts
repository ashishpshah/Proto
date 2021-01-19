import { AdminCommonHelperComponent } from '../../AdminCommonHelper/AdminCommonHelper.component';
import { ProtoServicesService } from '../../../Services/proto-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { DropdownList } from 'src/app/models/DropdownList';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-add-edit-country',
  templateUrl: './add-edit-country.component.html',
  styleUrls: ['./add-edit-country.component.scss']
})
/************************************* Developed By RAJESH *******************************/
export class AddEditCountryComponent implements OnInit {
  countryObj :any ={};

  title: string = "Create";
  countryId: number;
  errorMessage: any ='';
  StatusList : Observable<DropdownList[]>;
  CountryList : Observable<DropdownList[]>;
  SelectedStatus : string = 'A';
  userId : string = localStorage.getItem('userId');
  isInserted : string = 'I';
  msgType : string = '';
  message : string = '';

  constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
    private _commonService : ProtoServicesService, private _router: Router, private el : ElementRef, private renderer: Renderer2) {
      if (this._avRoute.snapshot.params["id"]) {
        this.countryId = this._avRoute.snapshot.params["id"];
        this.isInserted = 'U';
      }
    }
    commonHelper = new AdminCommonHelperComponent(this._router);

    ngOnInit():void {

      if (this.countryId > 0) {
        this.title = "Edit";
        this._commonService.getCountryById(this.countryId)
          .subscribe((resp) =>
          {
            this.countryObj = resp
            , error => this.errorMessage = error
          });
      }else {
        this.countryObj = CountryFun(this.isInserted);
      }
    }

    validate(){
    if(this.countryObj.Country_Code == ''){
        this.errorMessage = "Please Enter Country Code";
        this.renderer.selectRootElement('#Country_Code').focus();
        return false;
      }
      else if(this.countryObj.Country_Name == '')
      {
        this.errorMessage = "Please Enter Country Name";
        this.renderer.selectRootElement('#Country_Name').focus();
        return false;
      }
      else{
        return true;
      }
    }

    saveCountry() {
      if(this.validate()){
        this.countryObj.Operated_By = this.userId;
        if (this.title == "Create") {
          this.countryObj.IsInserted = 'I';
          this._commonService.saveCountry(this.countryObj)
            .subscribe((data) => {
              this.commonHelper.commonAlert('Inserted', data, '/master/country-master')

            }, error => this.errorMessage = error)
        }
        else if (this.title == "Edit") {
          this.countryObj.IsInserted = 'U';
          this._commonService.saveCountry(this.countryObj)
            .subscribe((data) => {
              this.commonHelper.commonAlert('Updated', data, '/master/country-master')
            }, error => this.errorMessage = error)
        }
      }
    }

    cancel() {
      this._router.navigate(['/master/country-master']);
    }

}


function CountryFun(isInserted) {

  let obj ={
    Country_Id :'',
    Country_Code : '',
    Country_Name : '',
    Operated_By : '',

  IsInserted : isInserted
};
  return obj;
}
