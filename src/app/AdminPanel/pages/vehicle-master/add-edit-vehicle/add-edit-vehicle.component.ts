import { AdminCommonHelperComponent } from '../../AdminCommonHelper/AdminCommonHelper.component';
import { ProtoServicesService } from '../../../Services/proto-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { DropdownList } from 'src/app/models/DropdownList';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-add-edit-vehicle',
  templateUrl: './add-edit-vehicle.component.html',
  styleUrls: ['./add-edit-vehicle.component.scss']
})
/************************************* Developed By RAJESH *******************************/
export class AddEditVehicleComponent implements OnInit {
  vehicleObj :any ={};

  title: string = "Create";
  vehicleId: number;
  errorMessage: any ='';
  StatusList : Observable<DropdownList[]>;
  VehicleList : Observable<DropdownList[]>;
  SelectedStatus : string = 'A';
  userId : string = localStorage.getItem('userId');
  isInserted : string = 'I';
  msgType : string = '';
  message : string = '';

  constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
    private _commonService : ProtoServicesService, private _router: Router, private el : ElementRef, private renderer: Renderer2) {
      if (this._avRoute.snapshot.params["id"]) {
        this.vehicleId = this._avRoute.snapshot.params["id"];
        this.isInserted = 'U';
      }
    }
    commonHelper = new AdminCommonHelperComponent(this._router);
    warningMessage : string  = this.commonHelper.commonWarningMessage;
    ngOnInit():void {

      this.getCommonList();

      if (this.vehicleId > 0) {
        this.title = "Edit";
        this._commonService.getVehicleById(this.vehicleId)
          .subscribe((resp) =>
          {
            this.vehicleObj = resp
            , error => this.errorMessage = error
          });
      }else {
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

      this._commonService.GetVehicleCategoryList("0").subscribe(
        (data) =>
         {
            this.VehicleList = data;
        }
      )

    }

    validate(){
      if(this.vehicleObj.RCatg_ID == null || this.vehicleObj.RCatg_ID == '' || this.vehicleObj.RCatg_ID == '0' || this.vehicleObj.RCatg_ID == 0 )
      {
        this.errorMessage = "Please Select Root Vehicle";
        // this.renderer.selectRootElement('#RCatg_ID').focus();
        return false;
      }
      else if(this.vehicleObj.Catg_Name == ''){
        this.errorMessage = "Please Enter Vehicle Name";
        this.renderer.selectRootElement('#Catg_Name').focus();
        return false;
      }
      else if(this.vehicleObj.Catg_Name_D == '')
      {
        this.errorMessage = "Please Enter Vehicle Name (Danish)";
        this.renderer.selectRootElement('#Catg_Name_D').focus();
        return false;
      }
      else if(this.vehicleObj.Display_Seq_No == '' || this.vehicleObj.Display_Seq_No == '0' || this.vehicleObj.Display_Seq_No == 0 )
      {
        this.errorMessage = "Please Enter Display Seq No";
        this.renderer.selectRootElement('#Display_Seq_No').focus();
        return false;
      }
      else{
        return true;
      }
    }

    saveVehicle() {
      if(this.validate()){
        this.vehicleObj.Created_By = this.userId;
        if (this.title == "Create") {
          this.vehicleObj.IsInserted = 'I';
          this._commonService.saveVehicle(this.vehicleObj)
            .subscribe((data) => {
              this.commonHelper.commonAlert('Inserted', data, '/master/vehicle-master')

            }, error => this.errorMessage = error)
        }
        else if (this.title == "Edit") {
          this.vehicleObj.IsInserted = 'U';
          this._commonService.saveVehicle(this.vehicleObj)
            .subscribe((data) => {
              this.commonHelper.commonAlert('Updated', data, '/master/vehicle-master')
            }, error => this.errorMessage = error)
        }
      }

    }

    cancel() {
      this._router.navigate(['/master/vehicle-master']);
    }

}


function VehicleFun(isInserted) {

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
