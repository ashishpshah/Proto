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
  ViewChild,Renderer2
} from '@angular/core';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import {
  Table
} from 'primeng/table';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
/************************************* Developed By RAJESH *******************************/
export class DepartmentListComponent implements OnInit {

  loading: boolean = true;
  IsAddEdit = false;
  departmentMaster: [];
  selectedDepartmentMaster: [];
  userId: string = localStorage.getItem('userId');
  msgType: string = '';
  message: string = '';
  @ViewChild('dt') table: Table;

  //----------- Add Edit
  departmentObj :any ={};

  title: string = "Create";
  departmentId: number;
  errorMessage: any ='';
  StatusList : Observable<DropdownList[]>;
  DepartmentList : Observable<DropdownList[]>;
  SelectedStatus : string = 'A';
  isInserted : string = 'I';
  //-----------------

  constructor(private _commonService: ProtoServicesService, private _router: Router, private primengConfig: PrimeNGConfig, private renderer: Renderer2) {}
  commonHelper = new AdminCommonHelperComponent(this._router);
  warningMessage : string  = this.commonHelper.commonWarningMessage;
  deleteTooltip : string  = this.commonHelper.deleteTooltip;
  restoreTooltip : string  = this.commonHelper.restoreTooltip;
  required : string  = this.commonHelper.required;
  ngOnInit(): void {
    this.getDepartmentList();
  }

  getDepartmentList() {
    this._commonService.getDepartmentList('0').subscribe(
      (data) => {
        this.departmentMaster = data;
        this.loading = false;
      }
    );
  }

  deleteItem(departmentId) {
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
        this._commonService.deleteDepartment(departmentId, this.userId).subscribe((data) => {
          let ret = this.commonHelper.activeInactiveAlert('Deleted', data);
          if (ret == 'S') {
            this.getDepartmentList();
          }
        }, error => console.error(error))
      }
    })
  }

  activateItem(departmentId) {
    this._commonService.activeDepartment(departmentId, this.userId).subscribe((data) => {
      let ret = this.commonHelper.activeInactiveAlert('Activated', data);
      if (ret == 'S') {
        this.getDepartmentList();
      }
    }, error => console.error(error))
  }

    //============== CRUD functionality
    addEditOpen(id : any):void {
      this.errorMessage = '';
      this.IsAddEdit = true;
      this.departmentId = id;
      let idLen = id.length;
      this.getCommonList();

      if (idLen > 0) {
        this.title = "Edit";
        this.isInserted = "U";
        this._commonService.getDepartmentById(this.departmentId)
          .subscribe((resp) =>
          {
            this.departmentObj = resp
            , error => this.errorMessage = error
          });
      }else {
        this.isInserted = "I";
        this.title = "Create";
        this.departmentObj = DepartmentFun(this.isInserted);
      }
    }

    getCommonList(){
       this._commonService.GetLovDetailByColumn("ACTIVEINACTIVE").subscribe(
        (data) =>
         {
            this.StatusList = data;
        }
      )
    }

    validate(){
      if(this.departmentObj.DEPT_Code == ''){
        this.errorMessage = "Y";
        this.renderer.selectRootElement('#DEPT_Code').focus();
        return false;
      }
      else if(this.departmentObj.DEPT_Name == '')
      {
        this.errorMessage = "Y";
        this.renderer.selectRootElement('#DEPT_Name').focus();
        return false;
      }
      else if(this.departmentObj.DEPT_Name_D == '')
      {
        this.errorMessage = "Y";
        this.renderer.selectRootElement('#DEPT_Name_D').focus();
        return false;
      }
      else{
        return true;
      }
    }

    saveDepartment() {
      if(this.validate()){
        this.departmentObj.Created_By = this.userId;
        if (this.title == "Create") {
          this.departmentObj.IsInserted = 'I';
          this._commonService.saveDepartment(this.departmentObj)
            .subscribe((data) => {
              this.commonHelper.commonAlerts('Inserted', data,'/master/department-master', '/master/add-edit-category')
            }, error => this.errorMessage = error)
        }
        else if (this.title == "Edit") {
          this.departmentObj.IsInserted = 'U';
          this._commonService.saveDepartment(this.departmentObj)
            .subscribe((data) => {
              this.commonHelper.commonAlerts('Updated', data,'/master/department-master', '/master/add-edit-category')
            }, error => this.errorMessage = error)
        }
      }
    }

    cancel() {
      this.errorMessage = '';
      this.IsAddEdit = false;
    }
}

function DepartmentFun(isInserted) {

  let obj ={
    DEPT_Code :'',
    DEPT_Name : '',
    DEPT_Name_D : '',
    Description : '',
    Image :'',
  Status : 'A',
  Created_By :'',
  Created_Date :'',
  Modified_By :'',
  Modified_Date :'',
  IsDeleted :'',
  IsInserted : isInserted
};
  return obj;
}
