import { AdminCommonHelperComponent } from './../../AdminCommonHelper/AdminCommonHelper.component';
import { PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';
import { ProtoServicesService } from './../../../Services/proto-services.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-root-category-list',
  templateUrl: './root-category-list.component.html',
  styleUrls: ['./root-category-list.component.scss']
})
/************************************* Developed By RAJESH *******************************/
export class RootCategoryListComponent implements OnInit {

  loading: boolean = true;
  IsAddEdit = false;
  rootCategoryMaster : [];
  selectedRootCategoryMaster : [];
  userId : string = localStorage.getItem('userId');
  msgType : string = '';
  message : string = '';
  @ViewChild('dt') table: Table;

  constructor( private _commonService : ProtoServicesService, private _router: Router, private primengConfig: PrimeNGConfig) { }
  commonHelper = new AdminCommonHelperComponent(this._router);

  ngOnInit(): void  {
    this.getRootCategoryList();
}

getRootCategoryList(){
  this._commonService.getRootCategoryList('0').subscribe(
    (data) =>
      {
      this.rootCategoryMaster =  data;
      this.loading = false;
    }
  );
}

openInsertPage(){
  this._router.navigate(['/master/add-edit-root-category']);
}

openEditPage(id){
  this._router.navigate(['/master/add-edit-root-category',id]);
}

deleteItem(rootCategoryId) {
  // var ans = confirm("Are you sure ? You want to delete it?");
  Swal.fire({
    icon: 'warning',
    title: 'Do you want to delete?',
    text:"You won't be able to revert this!",
    // showDenyButton: true,
    showCancelButton: true,
    confirmButtonColor: 'green',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Delete',
    // denyButtonText: 'Cancel',
  }).then((result) => {
    debugger;
    if (result.isConfirmed) {
      this._commonService.deleteRootCategory(rootCategoryId,this.userId).subscribe((data) => {
        let ret = this.commonHelper.activeInactiveAlert('Deleted',data);
          if (ret == 'S') {
            this.getRootCategoryList();
          }
    }, error => console.error(error))
    }
  })
}

activateItem(rootCategoryId) {
      this._commonService.activeRootCategory(rootCategoryId,this.userId).subscribe((data) => {
        let ret = this.commonHelper.activeInactiveAlert('Activated',data);
        if (ret == 'S') {
          this.getRootCategoryList();
        }
      }, error => console.error(error))
}

}
