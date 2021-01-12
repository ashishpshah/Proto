import { DropdownList } from './../../../../models/DropdownList';
import { AdminCommonHelperComponent } from './../../AdminCommonHelper/AdminCommonHelper.component';
import { DropdownListInt } from './../../../../models/DropdownListInt';
import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl,FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs";
import { ProtoServicesService } from "../../../Services/proto-services.service";

@Component({
  selector: 'app-add-edit-root-header',
  templateUrl: './add-edit-root-header.component.html',
  styleUrls: ['./add-edit-root-header.component.scss']
})
export class AddEditRootHeaderComponent implements OnInit {

    rootHeaderObj :any ={};

    title: string = "Create";
    rootHeaderId: number;
    errorMessage: any ='';
    StatusList : Observable<DropdownList[]>;
    SelectedStatus : string = 'A';
    userId : string = localStorage.getItem('userId');
    isInserted : string = 'I';
    msgType : string = '';
    message : string = '';

  constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
    private _commonService : ProtoServicesService, private _router: Router, private el : ElementRef) {
      if (this._avRoute.snapshot.params["id"]) {
        this.rootHeaderId = this._avRoute.snapshot.params["id"];
        this.isInserted = 'U';
      }
    }

  commonHelper = new AdminCommonHelperComponent(this._router);
  ngOnInit():void {

    this.getCommonList();
    if (this.rootHeaderId > 0) {
      this.title = "Edit";
      this._commonService.getRootHeaderById(this.rootHeaderId)
        .subscribe((resp) =>
        {
          this.rootHeaderObj = resp
          , error => this.errorMessage = error
        });
    }else {
      this.rootHeaderObj = RootHeaderFun(this.isInserted);
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
    // ('#Root_Name').focus();
    if(this.rootHeaderObj.Root_Name == ''){
      this.errorMessage = "Please Enter Root Name";
      // const invalidControl = this.el.nativeElement.querySelector('#Root_Name');
      // if (invalidControl) {
      //   invalidControl.focus();
      // }
      return false;
    }
    else if(this.rootHeaderObj.Root_Name_D == '')
    {
      this.errorMessage = "Please Enter Root Name (Danish)";
      return false;
    }
    else if(this.rootHeaderObj.Display_Seq_No == '' || this.rootHeaderObj.Display_Seq_No == '0' || this.rootHeaderObj.Display_Seq_No == 0 )
    {
      this.errorMessage = "Please Enter Display Seq No";
      return false;
    }
    else{
      return true;
    }
  }
  saveRootHeader() {
    if(this.validate()){
      this.rootHeaderObj.Created_By = this.userId;
      if (this.title == "Create") {
        //this.itemForm.value.IsInserted = 'I';
        this.rootHeaderObj.IsInserted = 'I';
        this._commonService.saveRootHeader(this.rootHeaderObj)
          .subscribe((data) => {
            this.commonHelper.commonAlert('Inserted', data, '/master/root-header-master')

          }, error => this.errorMessage = error)
      }
      else if (this.title == "Edit") {
        this.rootHeaderObj.IsInserted = 'U';
        this._commonService.saveRootHeader(this.rootHeaderObj)
          .subscribe((data) => {
            this.commonHelper.commonAlert('Updated', data, '/master/root-header-master')
          }, error => this.errorMessage = error)
      }
    }

  }

  cancel() {
    this._router.navigate(['/master/root-header-master']);
  }
}


function RootHeaderFun(isInserted) {

  let obj ={
  Root_Header_ID :'',
  Root_Name : '',
  Root_Name_D : '',
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
