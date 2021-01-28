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
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.scss']
})
/************************************* Developed By RAJESH *******************************/
export class RouteListComponent implements OnInit {

  loading: boolean = true;
  IsAddEdit = false;
  routeMaster: [];
  selectedRouteMaster: [];
  userId: string = localStorage.getItem('userId');
  msgType: string = '';
  message: string = '';
  @ViewChild('dt') table: Table;

  constructor(private _commonService: ProtoServicesService, private _router: Router, private primengConfig: PrimeNGConfig) {}
  commonHelper = new AdminCommonHelperComponent(this._router);
  warningMessage : string  = this.commonHelper.commonWarningMessage;
  ngOnInit(): void {
    this.getRouteList();
  }

  getRouteList() {
    this._commonService.getRouteList().subscribe(
      (data) => {
        this.routeMaster = data;
        this.loading = false;
      }
    );
  }

  openInsertPage() {
    this._router.navigate(['/master/add-edit-route']);
  }

  openEditPage(id) {
    this._router.navigate(['/master/add-edit-route', id]);
  }

  deleteItem(routeId) {
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
        this._commonService.deleteRoute(routeId, this.userId).subscribe((data) => {
          let ret = this.commonHelper.activeInactiveAlert('Deleted', data);
          if (ret == 'S') {
            this.getRouteList();
          }
        }, error => console.error(error))
      }
    })
  }

  activateItem(routeId) {
    this._commonService.activeRoute(routeId, this.userId).subscribe((data) => {
      let ret = this.commonHelper.activeInactiveAlert('Activated', data);
      if (ret == 'S') {
        this.getRouteList();
      }
    }, error => console.error(error))
  }


  openRouteInfo(routeId){

  }
}
