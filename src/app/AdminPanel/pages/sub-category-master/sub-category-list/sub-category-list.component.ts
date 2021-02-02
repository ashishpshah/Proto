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
  ViewChild
} from '@angular/core';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import {
  Table
} from 'primeng/table';

@Component({
  selector: 'app-sub-category-list',
  templateUrl: './sub-category-list.component.html',
  styleUrls: ['./sub-category-list.component.scss']
})
/************************************* Developed By RAJESH *******************************/
export class SubCategoryListComponent implements OnInit {

  loading: boolean = true;
  IsAddEdit = false;
  subCategoryMaster: [];
  selectedSubCategoryMaster: [];
  userId: string = localStorage.getItem('userId');
  msgType: string = '';
  message: string = '';
  @ViewChild('dt') table: Table;

  constructor(private _commonService: ProtoServicesService, private _router: Router, private primengConfig: PrimeNGConfig) {}
  commonHelper = new AdminCommonHelperComponent(this._router);
  warningMessage : string  = this.commonHelper.commonWarningMessage;
  deleteTooltip : string  = this.commonHelper.deleteTooltip;
  restoreTooltip : string  = this.commonHelper.restoreTooltip;
  required : string  = this.commonHelper.required;
  ngOnInit(): void {
    localStorage.setItem('isSelectCategory',  '');
    this.getSubCategoryList();
  }

  getSubCategoryList() {
    this._commonService.getSubCategoryList('0').subscribe(
      (data) => {
        this.subCategoryMaster = data;
        this.loading = false;
      }
    );
  }

  openInsertPage() {
    this._router.navigate(['/master/add-edit-sub-category']);
  }

  openEditPage(id) {
    this._router.navigate(['/master/add-edit-sub-category', id]);
  }

  deleteItem(subCategoryId) {
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
            this.getSubCategoryList();
          }
        }, error => console.error(error))
      }
    })
  }

  activateItem(subCategoryId) {
    this._commonService.activeSubCategory(subCategoryId, this.userId).subscribe((data) => {
      let ret = this.commonHelper.activeInactiveAlert('Activated', data);
      if (ret == 'S') {
        this.getSubCategoryList();
      }
    }, error => console.error(error))
  }

}
