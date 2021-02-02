import { DropdownList } from 'src/app/models/DropdownList';
import {
  AdminCommonHelperComponent
} from '../../AdminCommonHelper/AdminCommonHelper.component';
import {
  PrimeNGConfig
} from 'primeng/api';
import {
  Router
} from '@angular/router';
import {
  ProtoServicesService
} from '../../../Services/proto-services.service';
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
  selector: 'app-type-list',
  templateUrl: './type-list.component.html',
  styleUrls: ['./type-list.component.scss']
})
/************************************* Developed By RAJESH *******************************/
export class typeListComponent implements OnInit {

  loading: boolean = true;
  IsAddEdit = false;
  typeMaster: [];
  selectedtypeMaster: [];
  userId: string = localStorage.getItem('userId');
  msgType: string = '';
  message: string = '';
  @ViewChild('dt') table: Table;

  //----------- Add Edit
  typeObj :any ={};

  title: string = "Create";
  typeId: number;
  errorMessage: any ='';
  StatusList : Observable<DropdownList[]>;
  typeList : Observable<DropdownList[]>;
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
    this.gettypeList();
    this.getCommonList();
  }

  gettypeList() {

    this._commonService.gettypeList().subscribe(
      (data) => {
        this.typeMaster = data;
        this.loading = false;
      }
    );
  }

  openInsertPage() {
    this._router.navigate(['/master/add-edit-type']);
  }

  openEditPage(id) {
    this._router.navigate(['/master/add-edit-type', id]);
  }

  deletetype(Type_ID) {
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
        this._commonService.deletetype(Type_ID, this.userId).subscribe((data) => {
          let ret = this.commonHelper.activeInactiveAlert('Deleted', data);
          if (ret == 'S') {
            this.gettypeList();
          }
        }, error => console.error(error))
      }
    })
  }


    //============== CRUD functionality

    addEditOpen(id : any):void {
      this.errorMessage = '';
      this.IsAddEdit = true;
      this.typeId = id;

      this.getCommonList();

      if (this.typeId > 0) {
        this.title = "Edit";
        this._commonService.gettypeById(this.typeId)
          .subscribe((resp) =>
          {

            this.typeObj = resp
            this.typeObj.SelectedDepartment = resp.Department.split(',')
            , error => this.errorMessage = error
          });
      }else {
        this.title = "Create";
        this.typeObj = typeFun(this.isInserted);
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
      if(this.typeObj.Type_Name == null || this.typeObj.Type_Name == '')
      {
        this.errorMessage = "Please Select type Name";
        return false;
      }
      else if(this.typeObj.Type_NameD == null || this.typeObj.Type_NameD == '')
      {
        this.errorMessage = "Please Select type Name denis";
        // this.renderer.selectRootElement('#RCatg_ID').focus();
        return false;
      }
      else
      {
        return true;
      }
    }

    savetype() {

      if(this.validate()){
        this.typeObj.Created_By = this.userId;
        if (this.title == "Create") {
          this.typeObj.IsInserted = 'I';
          this._commonService.savetype(this.typeObj)
            .subscribe((data) => {
              this.commonHelper.commonAlerts('Inserted', data,'/master/type-master', '/master/add-edit-brand')

            }, error => this.errorMessage = error)
        }
      }
    }

    cancel() {
      this.errorMessage = '';
      this.IsAddEdit = false;
      // this._router.navigate(['/master/type-master']);
    }

    edittypemaster(item: any)
    {
      item.editable = !item.editable;

      if (!item.editable) {

        item.IsInserted = 'U';
        item.Created_By=this.userId;
        this._commonService.savetype(item)
          .subscribe((data) => {
            this.commonHelper.commonAlerts('Updated', data,'/master/type-master', '/master/add-edit-brand')
          }, error => this.errorMessage = error)

          if(item.Status =="A")
          {
            item.StatusDesc ="Active"
          }else
          {
            item.StatusDesc ="InActive"
          }
      }
    }
    cancletypemaster(row) {

      row.editable = false
    }
}

function typeFun(isInserted) {

  let obj ={
    Type_ID :'',
    Type_Name : '',
    Type_NameD : '',
  Status : 'A',
  Created_By :'',
  Created_Date :'',
  Modified_By :'',
  Modified_Date :'',
  IsDeleted :'',
  IsInserted : isInserted,
  StatusDesc:'',
  editable: false
};
  return obj;
}
