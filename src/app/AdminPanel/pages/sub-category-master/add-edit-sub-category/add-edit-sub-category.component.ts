import { AdminCommonHelperComponent } from './../../AdminCommonHelper/AdminCommonHelper.component';
import { ProtoServicesService } from './../../../Services/proto-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { DropdownList } from 'src/app/models/DropdownList';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-add-edit-sub-category',
  templateUrl: './add-edit-sub-category.component.html',
  styleUrls: ['./add-edit-sub-category.component.scss']
})
/************************************* Developed By RAJESH *******************************/
export class AddEditSubCategoryComponent implements OnInit {
  subCategoryObj :any ={};

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
  CategoryListById: any[] = [];
  selectedSubCategoryList: [];
  loading: boolean = false;
  isListDivShow : boolean = false;
  isFromEdit : boolean = false;
  msgArray : any[] = [];
  constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
    private _commonService : ProtoServicesService, private _router: Router, private el : ElementRef, private renderer: Renderer2) {
      if (this._avRoute.snapshot.params["id"]) {
        this.categoryId = this._avRoute.snapshot.params["id"];
        this.isInserted = 'U';
        this.isFromEdit = true;
      }
    }
    commonHelper = new AdminCommonHelperComponent(this._router);

    ngOnInit():void {

      this.getCommonList();
      if (this.categoryId > 0) {
        this.title = "Edit";
        this._commonService.getSubCategoryById(this.categoryId)
          .subscribe((resp) =>
          {
            this.subCategoryObj = resp
            , error => this.errorMessage = error
          });
      }else {
        this.isFromEdit = false;
        this.subCategoryObj = CategoryFun(this.isInserted);
      }
    }

    getCommonList(){
       this._commonService.GetLovDetailByColumn("ACTIVEINACTIVE").subscribe(
        (data) =>
         {
            this.StatusList = data;
        }
      )

      this._commonService.GetActiveCategoryList().subscribe(
        (data) =>
         {
            this.CategoryList = data;
        }
      )

    }
    getCategoryListbyId(categoryId){
      this.loading = true;

      this._commonService.getSubCategoryByCategoryId(categoryId).subscribe(
        (data) =>
         {
            localStorage.setItem('isSelectCategory',  categoryId);
            this.isListDivShow = true;
            this.CategoryListById = data;
            this.errorMessage = '';
            this.loading = false;
        }
      )
    }
    lastIndex: any = 0;
    addNewRow(){
       this.lastIndex = this.CategoryListById.length;
      var currentElement = this.CategoryListById[parseInt(this.lastIndex)-1];
      this.CategoryListById.splice(0, 0, CategoryFun(this.isInserted));
    }
    validate(){
      if(this.subCategoryObj.Catg_ID == null || this.subCategoryObj.Catg_ID == '' || this.subCategoryObj.Catg_ID == '0' || this.subCategoryObj.Catg_ID == 0 )
      {
        this.errorMessage = "Please Select Category";
        // this.renderer.selectRootElement('#RCatg_ID').focus();
        return false;
      }
      else if(this.subCategoryObj.Sub_Catg_Name == ''){
        this.errorMessage = "Please Enter Sub Category Name";
        this.renderer.selectRootElement('#Sub_Catg_Name').focus();
        return false;
      }
      else if(this.subCategoryObj.Sub_Catg_Name_D == '')
      {
        this.errorMessage = "Please Enter Sub Category Name (Danish)";
        this.renderer.selectRootElement('#Sub_Catg_Name_D').focus();
        return false;
      }
      else if(this.subCategoryObj.Display_Seq_No == '' || this.subCategoryObj.Display_Seq_No == '0' || this.subCategoryObj.Display_Seq_No == 0 )
      {
        this.errorMessage = "Please Enter Display Seq No";
        this.renderer.selectRootElement('#Display_Seq_No').focus();
        return false;
      }
      else{
        return true;
      }
    }

    validateList() : any{
      debugger;
      let invalidCount = 0;
      let message = "";
      this.CategoryListById.filter(function (element,index) {
        if(element.Sub_Catg_Name == null || element.Sub_Catg_Name == '')
        {
          message = message == "" ? "Please Enter Sub Category#"+index+"#Sub_Catg_Name_" :message;
          // this.renderer.selectRootElement('#Sub_Catg_Name_'+index).focus();
          invalidCount = invalidCount + 1;
        }else if(element.Sub_Catg_Name_D == null || element.Sub_Catg_Name_D == '')
        {
          message = message == "" ? "Please Enter Sub Category (Danish)#"+index+"#Sub_Catg_Name_D_" :message;
          // this.renderer.selectRootElement('#Sub_Catg_Name_D_'+index).focus();
          invalidCount = invalidCount + 1;
        }
        else if(element.Display_Seq_No == null || element.Display_Seq_No == '' || element.Display_Seq_No == 0 )
        {
          message = message == "" ? "Please Enter Display Seq No#"+index+"#Display_Seq_No_":message;
          // this.renderer.selectRootElement('#Display_Seq_No_'+index).focus();
          invalidCount = invalidCount + 1;
        }
      });
      message = message == "" ? "true" : message;
     return message;
    }

    saveCategory() {
      var returnMsg = this.validateList();
      debugger;
      if(returnMsg == "true"){
        this._commonService.saveSubCategory( this.userId,localStorage.getItem('isSelectCategory'),this.CategoryListById)
        .subscribe((data) => {
          this.commonHelper.commonAlert('Saved', data, '/master/sub-category-master')

        }, error => this.errorMessage = error)
      }
      else{
        this.msgArray = returnMsg.split("#");

        this.errorMessage = this.msgArray[0];
        this.renderer.selectRootElement('#'+this.msgArray[2]+this.msgArray[1]).focus();

      }
    }
    updateSubCategory(){
      if(this.validate()){
        debugger;
        let subCatList : any[];
        this.subCategoryObj.IsInserted = 'U';
        this.subCategoryObj.IsUpdate = 'Y';
        this.CategoryListById.push(this.subCategoryObj);
        this._commonService.saveSubCategory( this.userId,localStorage.getItem('isSelectCategory'),this.CategoryListById)
        .subscribe((data) => {
          this.commonHelper.commonAlert('Updated', data, '/master/sub-category-master')

        }, error => this.errorMessage = error)

      }
    }
    cancel() {
      this._router.navigate(['/master/sub-category-master']);
    }

    activateItem(subCategoryId) {
      this._commonService.activeSubCategory(subCategoryId, this.userId).subscribe((data) => {
        let ret = this.commonHelper.activeInactiveAlert('Activated', data);
        if (ret == 'S') {
          let catId =localStorage.getItem('isSelectCategory');
          this.getCategoryListbyId(catId);
        }
      }, error => console.error(error))
    }

    deleteItem(subCategoryId, index) {
      if(subCategoryId == '' ){
        this.CategoryListById.splice(index, 1);
      }else{
        Swal.fire({
          icon: 'warning',
          title: 'Do you want to delete?',
          text: "You won't be able to revert this!",
          showCancelButton: true,
          confirmButtonColor: 'green',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Delete',
        }).then((result) => {
          if (result.isConfirmed) {
            this._commonService.deleteSubCategory(subCategoryId, this.userId).subscribe((data) => {
              let ret = this.commonHelper.activeInactiveAlert('Deleted', data);
              if (ret == 'S') {
                 let catId =localStorage.getItem('isSelectCategory');
                 this.getCategoryListbyId(catId);
                // this.getSubCategoryList();
              }
            }, error => console.error(error))
          }
        })
      }

    }


}


function CategoryFun(isInserted) {

  let obj ={
    Sub_Catg_ID :'',
    Catg_ID : '',
    Sub_Catg_Name : '',
    Sub_Catg_Name_D : '',
  Display_Seq_No :'',
  Status : 'A',
  Created_By :'',
  Created_Date :'',
  Modified_By :'',
  Modified_Date :'',
  IsDeleted :'',
  IsInserted : isInserted,
  IsUpdate : ''
};
  return obj;
}
