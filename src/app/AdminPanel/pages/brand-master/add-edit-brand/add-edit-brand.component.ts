import { AdminCommonHelperComponent } from '../../AdminCommonHelper/AdminCommonHelper.component';
import { ProtoServicesService } from '../../../Services/proto-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { DropdownList } from 'src/app/models/DropdownList';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-add-edit-brand',
  templateUrl: './add-edit-brand.component.html',
  styleUrls: ['./add-edit-brand.component.scss']
})
/************************************* Developed By RAJESH *******************************/
export class AddEditbrandComponent implements OnInit {
  brandObj :any ={};

  title: string = "Create";
  brandId: number;
  errorMessage: any ='';
  StatusList : Observable<DropdownList[]>;
  brandList : Observable<DropdownList[]>;
  SelectedStatus : string = 'A';
  userId : string = localStorage.getItem('userId');
  isInserted : string = 'I';
  msgType : string = '';
  message : string = '';

  constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
    private _commonService : ProtoServicesService, private _router: Router, private el : ElementRef, private renderer: Renderer2) {
      if (this._avRoute.snapshot.params["id"]) {
        this.brandId = this._avRoute.snapshot.params["id"];
        this.isInserted = 'U';
      }
    }
    commonHelper = new AdminCommonHelperComponent(this._router);

    ngOnInit():void {

      this.getCommonList();
      debugger;
      if (this.brandId > 0) {
        this.title = "Edit";
        this._commonService.getbrandList(this.brandId)
          .subscribe((resp) =>
          {
            this.brandObj = resp
            , error => this.errorMessage = error
          });
      }else {
        this.brandObj = brandFun(this.isInserted);
      }
    }

    getCommonList(){
       this._commonService.GetLovDetailByColumn("ACTIVEINACTIVE").subscribe(
        (data) =>
         {
            this.StatusList = data;
        }
      )

      // this._commonService.GetActiveRootbrandList().subscribe(
      //   (data) =>
      //    {
      //       this.brandList = data;
      //   }
      // )

    }

    validate(){
      if(this.brandObj.RCatg_ID == null || this.brandObj.RCatg_ID == '' || this.brandObj.RCatg_ID == '0' || this.brandObj.RCatg_ID == 0 )
      {
        this.errorMessage = "Please Select Root brand";
        // this.renderer.selectRootElement('#RCatg_ID').focus();
        return false;
      }
      else if(this.brandObj.Catg_Name == ''){
        this.errorMessage = "Please Enter brand Name";
        this.renderer.selectRootElement('#Catg_Name').focus();
        return false;
      }
      else if(this.brandObj.Catg_Name_D == '')
      {
        this.errorMessage = "Please Enter brand Name (Danish)";
        this.renderer.selectRootElement('#Catg_Name_D').focus();
        return false;
      }
      else if(this.brandObj.Display_Seq_No == '' || this.brandObj.Display_Seq_No == '0' || this.brandObj.Display_Seq_No == 0 )
      {
        this.errorMessage = "Please Enter Display Seq No";
        this.renderer.selectRootElement('#Display_Seq_No').focus();
        return false;
      }
      else{
        return true;
      }
    }

    savebrand() {
      if(this.validate()){
        this.brandObj.Created_By = this.userId;
        if (this.title == "Create") {
          this.brandObj.IsInserted = 'I';
          this._commonService.savebrand(this.brandObj)
            .subscribe((data) => {
              this.commonHelper.commonAlert('Inserted', data, '/master/brand-master')

            }, error => this.errorMessage = error)
        }
        else if (this.title == "Edit") {
          this.brandObj.IsInserted = 'U';
          this._commonService.savebrand(this.brandObj)
            .subscribe((data) => {
              this.commonHelper.commonAlert('Updated', data, '/master/brand-master')
            }, error => this.errorMessage = error)
        }
      }

    }

    cancel() {
      this._router.navigate(['/master/brand-master']);
    }

}


function brandFun(isInserted) {

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
