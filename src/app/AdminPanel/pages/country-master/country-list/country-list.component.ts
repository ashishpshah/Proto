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
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
/************************************* Developed By RAJESH *******************************/
export class CountryListComponent implements OnInit {

  loading: boolean = true;
  IsAddEdit = false;
  countryMaster: [];
  selectedCountryMaster: [];
  userId: string = localStorage.getItem('userId');
  msgType: string = '';
  message: string = '';
  @ViewChild('dt') table: Table;

  constructor(private _commonService: ProtoServicesService, private _router: Router, private primengConfig: PrimeNGConfig) {}
  commonHelper = new AdminCommonHelperComponent(this._router);

  ngOnInit(): void {
    this.getCountryList();
  }

  getCountryList() {
    this._commonService.getCountryList().subscribe(
      (data) => {
        this.countryMaster = data;
        this.loading = false;
      }
    );
  }

  openInsertPage() {
    this._router.navigate(['/master/add-edit-country']);
  }

  openEditPage(id) {
    this._router.navigate(['/master/add-edit-country', id]);
  }

  deleteItem(countryId) {
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
        this._commonService.deleteCountry(countryId, this.userId).subscribe((data) => {
          let ret = this.commonHelper.activeInactiveAlert('Deleted', data);
          if (ret == 'S') {
            this.getCountryList();
          }
        }, error => console.error(error))
      }
    })
  }
}
