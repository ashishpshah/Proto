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
  selector: 'app-street-list',
  templateUrl: './street-list.component.html',
  styleUrls: ['./street-list.component.scss']
})
/************************************* Developed By RAJESH *******************************/
export class StreetListComponent implements OnInit {

  loading: boolean = true;
  IsAddEdit = false;
  streetMaster: [];
  selectedStreetMaster: [];
  userId: string = localStorage.getItem('userId');
  msgType: string = '';
  message: string = '';
  @ViewChild('dt') table: Table;

  constructor(private _commonService: ProtoServicesService, private _router: Router, private primengConfig: PrimeNGConfig) {}
  commonHelper = new AdminCommonHelperComponent(this._router);

  ngOnInit(): void {
    this.getStreetList();
  }

  getStreetList() {
    this._commonService.getStreetList('0','N').subscribe(
      (data) => {
        this.streetMaster = data;
        this.loading = false;
      }
    );
  }

  openInsertPage() {
    this._router.navigate(['/master/add-edit-street']);
  }

  openEditPage(id) {
    this._router.navigate(['/master/add-edit-street', id]);
  }

  deleteItem(streetId) {
    Swal.fire({
      icon: 'warning',
      title: 'Do you want to delete?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
    }).then((result) => {
      debugger;
      if (result.isConfirmed) {
        this._commonService.deleteStreet(streetId, this.userId).subscribe((data) => {
          let ret = this.commonHelper.activeInactiveAlert('Deleted', data);
          if (ret == 'S') {
            this.getStreetList();
          }
        }, error => console.error(error))
      }
    })
  }

  activateItem(streetId) {
    this._commonService.activeStreet(streetId, this.userId).subscribe((data) => {
      let ret = this.commonHelper.activeInactiveAlert('Activated', data);
      if (ret == 'S') {
        this.getStreetList();
      }
    }, error => console.error(error))
  }

}
