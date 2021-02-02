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
declare var $:any;
@Component({
  selector: 'app-state-list',
  templateUrl: './state-list.component.html',
  styleUrls: ['./state-list.component.scss']
})
/************************************* Developed By RAJESH *******************************/
export class StateListComponent implements OnInit {

  loading: boolean = true;
  IsAddEdit = false;
  cityMaster: any[] =[];
  selectedCityMaster: [];
  stateMaster: [];
  selectedStateMaster: [];
  userId: string = localStorage.getItem('userId');
  msgType: string = '';
  message: string = '';
  @ViewChild('dt') table: Table;
  @ViewChild('dts') cityTable: Table;
  stateId : string ='0';
  stateName : string = '';
  msgArray : any[] = [];
  errorMessage: any ='';

  constructor(private _commonService: ProtoServicesService, private _router: Router, private primengConfig: PrimeNGConfig, private renderer: Renderer2) {}
  commonHelper = new AdminCommonHelperComponent(this._router);
  warningMessage : string  = this.commonHelper.commonWarningMessage;
  deleteTooltip : string  = this.commonHelper.deleteTooltip;
  restoreTooltip : string  = this.commonHelper.restoreTooltip;
  required : string  = this.commonHelper.required;
  ngOnInit(): void {
    this.getStateList();
  }

  getStateList() {
    this._commonService.getStateList('0').subscribe(
      (data) => {
        this.stateMaster = data;
        this.loading = false;
      }
    );
  }

  openInsertPage() {
    this._router.navigate(['/master/add-edit-state']);
  }

  openEditPage(id) {
    this._router.navigate(['/master/add-edit-state', id]);
  }

  deleteItem(stateId) {
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
        this._commonService.deleteState(stateId, this.userId).subscribe((data) => {
          let ret = this.commonHelper.activeInactiveAlert('Deleted', data);
          if (ret == 'S') {
            this.getStateList();
          }
        }, error => console.error(error))
      }
    })
  }

  activateItem(stateId) {
    this._commonService.activeState(stateId, this.userId).subscribe((data) => {
      let ret = this.commonHelper.activeInactiveAlert('Activated', data);
      if (ret == 'S') {
        this.getStateList();
      }
    }, error => console.error(error))
  }


  openCityModal(stateId){
    this.loading = false;
    this.getCityList(stateId);
  }
  getCityList(stateId) {
    this._commonService.getCityList(stateId).subscribe(
      (data) => {
        this.cityMaster = data;
        this.stateName = data[0].State_Name;
        this.stateId = data[0].State_ID;
        localStorage.setItem('stateId', this.stateId);
        $("#myModal").modal('show');
        this.loading = false;
      }
    );
  }

  lastIndex: any = 0;
    addNewRow(){
       this.lastIndex = this.cityMaster.length;
      var currentElement = this.cityMaster[parseInt(this.lastIndex)-1];
      this.cityMaster.splice(0, 0, CityFunction('I'));
    }

    validateList() : any{
      let invalidCount = 0;
      let message = "";
      this.cityMaster.filter(function (element,index) {
        if(element.City_Code == null || element.City_Code == '')
        {
          message = message == "" ? "Please Enter City Code#"+index+"#City_Code_" :message;
          invalidCount = invalidCount + 1;
        }
        else if(element.City_Name == null || element.City_Name == '')
        {
          message = message == "" ? "Please Enter City Name#"+index+"#City_Name_" :message;
          invalidCount = invalidCount + 1;
        }else if(element.Post_Code == null || element.Post_Code == '')
        {
          message = message == "" ? "Please Enter Post Code#"+index+"#Post_Code_" :message;
          // this.renderer.selectRootElement('#Sub_Catg_Name_D_'+index).focus();
          invalidCount = invalidCount + 1;
        }
      });
      message = message == "" ? "true" : message;
     return message;
    }

    saveCity() {
      this.errorMessage = "";
      var returnMsg = this.validateList();
      if(returnMsg == "true"){
        this._commonService.saveCityList( this.userId,localStorage.getItem('stateId'),this.cityMaster)
        .subscribe((data) => {

          this.commonHelper.commonAlert('Saved', data, '/master/state-master')
          $("#myModal").modal('hide');
        }, error => this.errorMessage = error)
      }
      else{
        this.msgArray = returnMsg.split("#");
        this.errorMessage = this.msgArray[0];
        this.renderer.selectRootElement('#'+this.msgArray[2]+this.msgArray[1]).focus();
      }
    }

    deleteCityItem(cityId, stateId,index) {
      if(cityId == ''){
        this.cityMaster.splice(index, 1);
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
            this._commonService.deleteCity(stateId,cityId).subscribe((data) => {
              let ret = this.commonHelper.activeInactiveAlert('Deleted', data);
              if (ret == 'S') {
                this.openCityModal(localStorage.getItem('stateId'));
              }
            }, error => console.error(error))
          }
        })
      }

    }

}

function CityFunction(isInserted) {

  let obj ={
    City_ID :'',
    State_ID : '',
    Country_ID : '',
    City_Code : '',
    City_Name :'',
    Operated_By : '',
  Created_Date :'',
  State_Name :'',
  Post_Code :'',
  IsInserted : isInserted,
  IsUpdate : ''
};
  return obj;
}
