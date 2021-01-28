import { AdminCommonHelperComponent } from './../../AdminCommonHelper/AdminCommonHelper.component';
import { ProtoServicesService } from './../../../Services/proto-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { DropdownList } from 'src/app/models/DropdownList';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.scss']
})
/************************************* Developed By RAJESH *******************************/
export class AddEditCategoryComponent implements OnInit {
  categoryObj :any ={};

  title: string = "Create";
  categoryId: number;
  errorMessage: any ='';
  StatusList : Observable<DropdownList[]>;
  CategoryList : Observable<DropdownList[]>;
  SelectedStatus : string = 'A';
  userId : string = localStorage.getItem('userId');
  isInserted : string = 'I';
  msgType : string = '';
  message : string = '';

  constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
    private _commonService : ProtoServicesService, private _router: Router, private el : ElementRef, private renderer: Renderer2) {
      if (this._avRoute.snapshot.params["id"]) {
        this.categoryId = this._avRoute.snapshot.params["id"];
        this.isInserted = 'U';
      }
    }
    commonHelper = new AdminCommonHelperComponent(this._router);

    ngOnInit():void {

      this.getCommonList();

      if (this.categoryId > 0) {
        this.title = "Edit";
        this._commonService.getCategoryById(this.categoryId)
          .subscribe((resp) =>
          {
            this.categoryObj = resp
            , error => this.errorMessage = error
          });
      }else {
        this.categoryObj = CategoryFun(this.isInserted);
      }
    }

    getCommonList(){
       this._commonService.GetLovDetailByColumn("ACTIVEINACTIVE").subscribe(
        (data) =>
         {
            this.StatusList = data;
        }
      )

      this._commonService.GetActiveRootCategoryList().subscribe(
        (data) =>
         {
            this.CategoryList = data;
        }
      )

    }

    validate(){
      if(this.categoryObj.RCatg_ID == null || this.categoryObj.RCatg_ID == '' || this.categoryObj.RCatg_ID == '0' || this.categoryObj.RCatg_ID == 0 )
      {
        this.errorMessage = "Please Select Root Category";
        // this.renderer.selectRootElement('#RCatg_ID').focus();
        return false;
      }
      else if(this.categoryObj.Catg_Name == ''){
        this.errorMessage = "Please Enter Category Name";
        this.renderer.selectRootElement('#Catg_Name').focus();
        return false;
      }
      else if(this.categoryObj.Catg_Name_D == '')
      {
        this.errorMessage = "Please Enter Category Name (Danish)";
        this.renderer.selectRootElement('#Catg_Name_D').focus();
        return false;
      }
      else if(this.categoryObj.Display_Seq_No == '' || this.categoryObj.Display_Seq_No == '0' || this.categoryObj.Display_Seq_No == 0 )
      {
        this.errorMessage = "Please Enter Display Seq No";
        this.renderer.selectRootElement('#Display_Seq_No').focus();
        return false;
      }
      else{
        return true;
      }
    }

    saveCategory() {
      if(this.validate()){
        this.categoryObj.Created_By = this.userId;
        if (this.title == "Create") {
          this.categoryObj.IsInserted = 'I';
          this._commonService.saveCategory(this.categoryObj)
            .subscribe((data) => {
              this.commonHelper.commonAlert('Inserted', data, '/master/category-master')

            }, error => this.errorMessage = error)
        }
        else if (this.title == "Edit") {
          this.categoryObj.IsInserted = 'U';
          this._commonService.saveCategory(this.categoryObj)
            .subscribe((data) => {
              this.commonHelper.commonAlert('Updated', data, '/master/category-master')
            }, error => this.errorMessage = error)
        }
      }

    }

    cancel() {
      this._router.navigate(['/master/category-master']);
    }

}


function CategoryFun(isInserted) {

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
