import { DropdownList } from 'src/app/models/DropdownList';
import {
  AdminCommonHelperComponent
} from './../../AdminCommonHelper/AdminCommonHelper.component';
import {
  PrimeNGConfig
} from 'primeng/api';
import {
  Router
} from '@angular/router';
import {
  ProtoServicesService
} from './../../../Services/proto-services.service';
import {
  Component,
  OnInit,
  ViewChild, Renderer2
} from '@angular/core';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import {
  Table
} from 'primeng/table';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
/************************************* Developed By RAJESH *******************************/
export class CategoryListComponent implements OnInit {

  loading: boolean = true;
  IsAddEdit = false;
  categoryMaster: [];
  selectedCategoryMaster: [];
  userId: string = localStorage.getItem('userId');
  msgType: string = '';
  message: string = '';
  @ViewChild('dt') table: Table;

  //----------- Add Edit
  categoryObj: any = {};

  title: string = "Create";
  categoryId: number;
  errorMessage: any = '';
  StatusList: Observable<DropdownList[]>;
  CategoryList: Observable<DropdownList[]>;
  DepartmentList: Observable<DropdownList[]>;
  SelectedStatus: string = 'A';
  isInserted: string = 'I';
  //-----------------

  Image_File: File;
  Image_Path: string = "assets/images/no-image-available.jpg";
  Old_Image_Path: string = "";

  constructor(private _commonService: ProtoServicesService, private _router: Router, private primengConfig: PrimeNGConfig, private renderer: Renderer2) {


    this.Image_Path = null;

  }
  commonHelper = new AdminCommonHelperComponent(this._router);
  warningMessage: string = this.commonHelper.commonWarningMessage;
  deleteTooltip: string = this.commonHelper.deleteTooltip;
  restoreTooltip: string = this.commonHelper.restoreTooltip;
  required: string = this.commonHelper.required;
  ngOnInit(): void {
    debugger;
    this.getCategoryList();
    this.previewImage();
  }

  getCategoryList() {
    this._commonService.getCategoryList('0').subscribe(
      (data) => {
        this.categoryMaster = data;
        this.loading = false;
      }
    );
  }

  // openInsertPage() {
  //   this._router.navigate(['/master/add-edit-category']);
  // }

  // openEditPage(id) {
  //   this._router.navigate(['/master/add-edit-category', id]);
  // }

  deleteItem(categoryId) {
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
        this._commonService.deleteCategory(categoryId, this.userId).subscribe((data) => {
          let ret = this.commonHelper.activeInactiveAlert('Deleted', data);
          if (ret == 'S') {
            this.getCategoryList();
          }
        }, error => console.error(error))
      }
    })
  }

  activateItem(categoryId) {
    this._commonService.activeCategory(categoryId, this.userId).subscribe((data) => {
      let ret = this.commonHelper.activeInactiveAlert('Activated', data);
      if (ret == 'S') {
        this.getCategoryList();
      }
    }, error => console.error(error))
  }

  //============== CRUD functionality

  addEditOpen(id: any): void {
    this.errorMessage = '';
    this.IsAddEdit = true;
    this.categoryId = id;

    this.getCommonList();

    if (this.categoryId > 0) {
      this.title = "Edit";
      this._commonService.getCategoryById(this.categoryId)
        .subscribe((resp) => {

          this.categoryObj = resp
          this.previewImage();
          this.categoryObj.SelectedDepartment = resp.Department.split(',')
            , error => this.errorMessage = error
        });
    } else {
      this.title = "Create";
      this.categoryObj = CategoryFun(this.isInserted);
      this.previewImage();
    }

    window.scroll(0,0);
  }

  getCommonList() {
    this._commonService.GetLovDetailByColumn("ACTIVEINACTIVE").subscribe(
      (data) => {
        this.StatusList = data;
      }
    )

    this._commonService.GetActiveRootCategoryList().subscribe(
      (data) => {
        this.CategoryList = data;
      }
    )
    this._commonService.GetActiveDepartmentList("").subscribe(
      (data) => {
        this.DepartmentList = data;
      }
    )

  }

  validate() {
    let Department = this.categoryObj.SelectedDepartment != null ? this.categoryObj.SelectedDepartment.length : 0;
    if (Department == null || Department == '' || Department == '0' || Department == 0) {
      this.errorMessage = "Please Select Department";
      return false;
    }
    else if (this.categoryObj.RCatg_ID == null || this.categoryObj.RCatg_ID == '' || this.categoryObj.RCatg_ID == '0' || this.categoryObj.RCatg_ID == 0) {
      this.errorMessage = "Please Select Root Category";
      // this.renderer.selectRootElement('#RCatg_ID').focus();
      return false;
    }
    else if (this.categoryObj.Catg_Name == '') {
      this.errorMessage = "Please Enter Category Name";
      this.renderer.selectRootElement('#Catg_Name').focus();
      return false;
    }
    else if (this.categoryObj.Catg_Name_D == '') {
      this.errorMessage = "Please Enter Category Name (Danish)";
      this.renderer.selectRootElement('#Catg_Name_D').focus();
      return false;
    }
    else if (this.categoryObj.Display_Seq_No == '' || this.categoryObj.Display_Seq_No == '0' || this.categoryObj.Display_Seq_No == 0) {
      this.errorMessage = "Please Enter Display Seq No";
      this.renderer.selectRootElement('#Display_Seq_No').focus();
      return false;
    }
    else {
      return true;
    }
  }

  saveCategory() {
    debugger;
    if (this.validate()) {
      debugger;

      const formData = new FormData();

      if (this.Image_File != null) {
        formData.append('file', this.Image_File, this.Image_File.name);
      }

      this.categoryObj.Created_By = this.userId;
      this.categoryObj.Department = this.categoryObj.SelectedDepartment.join(',');
      if (this.title == "Create") {
        this.categoryObj.IsInserted = 'I';

        formData.append('jsonObj', JSON.stringify(this.categoryObj));

        // this._commonService.saveCategory(this.categoryObj)
        this._commonService.saveCategoryWithImage(formData)
          .subscribe((data) => {
            this.commonHelper.commonAlerts('Inserted', data, '/master/category-master', '/master/add-edit-category')

          }, error => this.errorMessage = error)
      }
      else if (this.title == "Edit") {
        this.categoryObj.IsInserted = 'U';

        formData.append('jsonObj', JSON.stringify(this.categoryObj));

        // this._commonService.saveCategory(this.categoryObj)
        this._commonService.saveCategoryWithImage(formData)
          .subscribe((data) => {
            this.commonHelper.commonAlerts('Updated', data, '/master/category-master', '/master/add-edit-category')
          }, error => this.errorMessage = error)
      }
    }
  }


  previewImage() {

    debugger;

    this.Image_Path = null;

    if (this.categoryObj.Image_Path == "" || this.categoryObj.Catg_ID == 0) {
      this.Image_Path = environment.Default_Image_Path;
    }
    else {
      this.Image_Path = environment.Api_Host + this.categoryObj.Image_Path;
    }
  }


  ChangeImage(event) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.Image_File = file;

      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.Image_Path = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);

      if (!this.validateFile(this.Image_File.name)) {
        alert('Selected file format is not supported');
        this.Image_File = null;
        return false;
      }
    }
  }

  validateFile(name: String) {

    let allImages: Array<string> = ['png', 'jpg', 'jpeg', 'gif', 'tiff', 'bpg'];

    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (allImages.indexOf(ext.toLowerCase()) === -1) {
      return false;
    }
    else {
      return true;
    }
  }


  cancel() {
    this.errorMessage = '';
    this.IsAddEdit = false;
    // this._router.navigate(['/master/category-master']);
  }
}

function CategoryFun(isInserted) {

  let obj = {
    Catg_ID: '',
    RCatg_ID: '',
    Catg_Name: '',
    Catg_Name_D: '',
    Display_Seq_No: '',
    Status: 'A',
    Created_By: '',
    Created_Date: '',
    Modified_By: '',
    Modified_Date: '',
    IsDeleted: '',
    IsInserted: isInserted,
    Department: '',
    SelectedDepartment: '',
    Image_Path: environment.Default_Image_Path
  };
  return obj;
}
