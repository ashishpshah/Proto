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
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
/************************************* Developed By RAJESH *******************************/
export class CityListComponent implements OnInit {

  loading: boolean = true;
  IsAddEdit = false;
  cityMaster: [];
  selectedCityMaster: [];
  userId: string = localStorage.getItem('userId');
  msgType: string = '';
  message: string = '';
  @ViewChild('dt') table: Table;
  stateId : string;
  constructor(private _commonService: ProtoServicesService, private _router: Router, private primengConfig: PrimeNGConfig) {}
  commonHelper = new AdminCommonHelperComponent(this._router);
  warningMessage : string  = this.commonHelper.commonWarningMessage;
  ngOnInit(): void {
    this.getCityList();
  }

  getCityList() {
    this._commonService.getCityList('0').subscribe(
      (data) => {
        this.cityMaster = data;
        this.loading = false;
      }
    );
  }

  getCityListByStateId(stateId) {
    this._commonService.getCityList(stateId).subscribe(
      (data) => {
        this.cityMaster = data;
      }
    );
    return this.cityMaster;
  }

  openInsertPage() {
    this._router.navigate(['/master/add-edit-city']);
  }

  openEditPage(id,stateId) {
    this._router.navigate(['/master/add-edit-city', id,stateId]);
  }

  deleteItem(cityId,stateId) {
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
        this._commonService.deleteCity(stateId,cityId).subscribe((data) => {
          let ret = this.commonHelper.activeInactiveAlert('Deleted', data);
          if (ret == 'S') {
            this.getCityList();
          }
        }, error => console.error(error))
      }
    })
  }

}
