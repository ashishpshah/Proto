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
  Renderer2,
  ViewChild
} from '@angular/core';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import {
  Table
} from 'primeng/table';
import { Observable } from 'rxjs';

declare var $:any;

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



  //------------------------------
  countryObj :any ={};

  title: string = "Create";
  countryId: number;
  errorMessage: any ='';
  StatusList : Observable<DropdownList[]>;
  CountryList : Observable<DropdownList[]>;
  SelectedStatus : string = 'A';
  isInserted : string = 'I';

  //-------------------------------
  constructor(private _commonService: ProtoServicesService, private _router: Router, private primengConfig: PrimeNGConfig, private renderer: Renderer2) {}
  commonHelper = new AdminCommonHelperComponent(this._router);
  warningMessage : string  = this.commonHelper.commonWarningMessage;
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




  //=========================================
  isEditMode : boolean = false;
  openAddEditModal(id : any):void {
    this.errorMessage ='';
    if (id > 0) {
      this.title = "Edit";
      this._commonService.getCountryById(id)
        .subscribe((resp) =>
        {
          this.isEditMode = true;
          $("#myModal").modal('show');
          this.countryObj = resp
          , error => this.errorMessage = error
        });
    }else {
      this.isEditMode = false;
      $("#myModal").modal('show');
      this.countryObj = CountryFun(this.isInserted);
    }
  }

  validate(){
    if(this.countryObj.Country_Code == ''){
        this.errorMessage = "Please Enter Country Code";
        this.renderer.selectRootElement('#Country_Code').focus();
        return false;
      }
      else if(this.countryObj.Country_Name == '')
      {
        this.errorMessage = "Please Enter Country Name";
        this.renderer.selectRootElement('#Country_Name').focus();
        return false;
      }
      else{
        return true;
      }
    }

    saveCountry() {
      if(this.validate()){
        this.countryObj.Operated_By = this.userId;
        if (this.title == "Create") {
          this.countryObj.IsInserted = 'I';
          this._commonService.saveCountry(this.countryObj)
            .subscribe((data) => {

              this.commonHelper.commonAlerts('Inserted', data, '/master/country-master','/master/add-edit-country')
              $("#myModal").modal('hide');

            }, error => this.errorMessage = error)
        }
        else if (this.title == "Edit") {
          this.countryObj.IsInserted = 'U';
          this._commonService.saveCountry(this.countryObj)
            .subscribe((data) => {
              this.commonHelper.commonAlerts('Updated', data, '/master/country-master','/master/add-edit-country')
              $("#myModal").modal('hide');
            }, error => this.errorMessage = error)
        }
      }
    }

    cancel() {
      this._router.navigate(['/master/country-master']);
    }
}


function CountryFun(isInserted) {

  let obj ={
    Country_Id :'',
    Country_Code : '',
    Country_Name : '',
    Operated_By : '',

  IsInserted : isInserted
};
  return obj;
}
