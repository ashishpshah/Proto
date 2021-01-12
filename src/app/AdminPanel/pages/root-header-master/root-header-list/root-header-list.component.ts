import { AdminCommonHelperComponent } from './../../AdminCommonHelper/AdminCommonHelper.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { ProtoServicesService } from "../../../Services/proto-services.service";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Table } from 'primeng/table';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root-header-list',
  templateUrl: './root-header-list.component.html',
  styleUrls: ['./root-header-list.component.scss']
})
export class RootHeaderListComponent implements OnInit {
  loading: boolean = true;
  IsAddEdit = false;
  rootHeaderMaster : [];
  selectedRootHeaderMaster : [];
  userId : string = localStorage.getItem('userId');
  msgType : string = '';
  message : string = '';
  @ViewChild('dt') table: Table;

  constructor( private _commonService : ProtoServicesService, private _router: Router, private primengConfig: PrimeNGConfig) { }
  commonHelper = new AdminCommonHelperComponent(this._router);

      ngOnInit(): void  {
        this.getRootHeaderList();
    }

    getRootHeaderList(){
      this._commonService.getRootHeaderList('0').subscribe(
        (data) =>
          {
          this.rootHeaderMaster =  data;
          this.loading = false;
        }
      );
    }

    openInsertPage(){
      this._router.navigate(['/master/add-edit-root-header']);
    }

    openEditPage(id){
      this._router.navigate(['/master/add-edit-root-header',id]);
    }

    deleteItem(rootHeaderId) {
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
          this._commonService.deleteRootHeader(rootHeaderId,this.userId).subscribe((data) => {
            let ret = this.commonHelper.activeInactiveAlert('Deleted',data);
              if (ret == 'S') {
                this.getRootHeaderList();
              }
        }, error => console.error(error))
        }
      })
    }

    activateItem(rootHeaderId) {
          this._commonService.activeRootHeader(rootHeaderId,this.userId).subscribe((data) => {
            let ret = this.commonHelper.activeInactiveAlert('Activated',data);
            if (ret == 'S') {
              this.getRootHeaderList();
            }
          }, error => console.error(error))
    }

}
