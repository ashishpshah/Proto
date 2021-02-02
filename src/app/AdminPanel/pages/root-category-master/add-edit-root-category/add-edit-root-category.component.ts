import { AdminCommonHelperComponent } from './../../AdminCommonHelper/AdminCommonHelper.component';
import { ProtoServicesService } from './../../../Services/proto-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { DropdownList } from 'src/app/models/DropdownList';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-edit-root-category',
  templateUrl: './add-edit-root-category.component.html',
  styleUrls: ['./add-edit-root-category.component.scss']
})
/************************************* Developed By RAJESH *******************************/
export class AddEditRootCategoryComponent implements OnInit {

    rootCategoryObj :any ={};

    title: string = "Create";
    rootCategoryId: number;
    errorMessage: any ='';
    StatusList : Observable<DropdownList[]>;
    RootList : Observable<DropdownList[]>;
    SelectedStatus : string = 'A';
    userId : string = localStorage.getItem('userId');
    isInserted : string = 'I';
    msgType : string = '';
    message : string = '';

  constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
    private _commonService : ProtoServicesService, private _router: Router, private el : ElementRef, private renderer: Renderer2) {
      if (this._avRoute.snapshot.params["id"]) {
        this.rootCategoryId = this._avRoute.snapshot.params["id"];
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

      if (this.rootCategoryId > 0) {
        this.title = "Edit";
        this._commonService.getRootCategoryById(this.rootCategoryId)
          .subscribe((resp) =>
          {
            this.rootCategoryObj = resp
            , error => this.errorMessage = error
          });
      }else {
        this.rootCategoryObj = RootCategoryFun(this.isInserted);
      }
    }

    getCommonList(){
       this._commonService.GetLovDetailByColumn("ACTIVEINACTIVE").subscribe(
        (data) =>
         {
            this.StatusList = data;
        }
      )

      this._commonService.GetActiveRootList().subscribe(
        (data) =>
         {
            this.RootList = data;
        }
      )

    }

    validate(){
      if(this.rootCategoryObj.Root_Header_ID == null || this.rootCategoryObj.Root_Header_ID == '' || this.rootCategoryObj.Root_Header_ID == '0' || this.rootCategoryObj.Root_Header_ID == 0 )
      {
        this.errorMessage = "Please Select Root";
        // this.renderer.selectRootElement('#Root_Header_ID').focus();
        return false;
      }
      else if(this.rootCategoryObj.RCatg_Name == ''){
        this.errorMessage = "Please Enter Root Category Name";
        this.renderer.selectRootElement('#RCatg_Name').focus();
        return false;
      }
      else if(this.rootCategoryObj.RCatg_Name_D == '')
      {
        this.errorMessage = "Please Enter Root Category Name (Danish)";
        this.renderer.selectRootElement('#RCatg_Name_D').focus();
        return false;
      }
      else if(this.rootCategoryObj.Display_Seq_No == '' || this.rootCategoryObj.Display_Seq_No == '0' || this.rootCategoryObj.Display_Seq_No == 0 )
      {
        this.errorMessage = "Please Enter Display Seq No";
        this.renderer.selectRootElement('#Display_Seq_No').focus();
        return false;
      }
      else{
        return true;
      }
    }

    saveRootCategory() {
      if(this.validate()){
        this.rootCategoryObj.Created_By = this.userId;
        if (this.title == "Create") {
          this.rootCategoryObj.IsInserted = 'I';
          this._commonService.saveRootCategory(this.rootCategoryObj)
            .subscribe((data) => {
              this.commonHelper.commonAlert('Inserted', data, '/master/root-category-master')

            }, error => this.errorMessage = error)
        }
        else if (this.title == "Edit") {
          this.rootCategoryObj.IsInserted = 'U';
          this._commonService.saveRootCategory(this.rootCategoryObj)
            .subscribe((data) => {
              this.commonHelper.commonAlert('Updated', data, '/master/root-category-master')
            }, error => this.errorMessage = error)
        }
      }

    }

    cancel() {
      this._router.navigate(['/master/root-category-master']);
    }

}

function RootCategoryFun(isInserted) {

  let obj ={
  RCatg_ID :'',
  Root_Header_ID : '',
  RCatg_Name : '',
  RCatg_Name_D : '',
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
