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
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss']
})
/************************************* Developed By RAJESH *******************************/
export class brandListComponent implements OnInit {

  loading: boolean = true;
  IsAddEdit = false;
  brandMaster: [];
  selectedbrandMaster: [];
  userId: string = localStorage.getItem('userId');
  msgType: string = '';
  message: string = '';
  @ViewChild('dt') table: Table;

  //----------- Add Edit
  brandObj :any ={};

  title: string = "Create";
  brandId: number;
  errorMessage: any ='';
  StatusList : Observable<DropdownList[]>;
  brandList : Observable<DropdownList[]>;
  DepartmentList : Observable<DropdownList[]>;
  SelectedStatus : string = 'A';
  isInserted : string = 'I';
  //-----------------

  constructor(private _commonService: ProtoServicesService, private _router: Router, private primengConfig: PrimeNGConfig, private renderer: Renderer2) {}
  commonHelper = new AdminCommonHelperComponent(this._router);
  warningMessage : string  = this.commonHelper.commonWarningMessage;
  ngOnInit(): void {
    this.getbrandList();
    this.getCommonList();
  }

  getbrandList() {

    this._commonService.getbrandList(0).subscribe(
      (data) => {
        this.brandMaster = data;
        this.loading = false;
      }
    );
  }

  openInsertPage() {
    this._router.navigate(['/master/add-edit-brand']);
  }

  openEditPage(id) {
    this._router.navigate(['/master/add-edit-brand', id]);
  }

  deleteBrand(Brand_ID) {
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
        this._commonService.deletebrand(Brand_ID, this.userId).subscribe((data) => {
          let ret = this.commonHelper.activeInactiveAlert('Deleted', data);
          if (ret == 'S') {
            this.getbrandList();
          }
        }, error => console.error(error))
      }
    })
  }

  activateItem(brandId) {
    this._commonService.activebrand(brandId, this.userId).subscribe((data) => {
      let ret = this.commonHelper.activeInactiveAlert('Activated', data);
      if (ret == 'S') {
        this.getbrandList();
      }
    }, error => console.error(error))
  }

    //============== CRUD functionality

    addEditOpen(id : any):void {
      this.errorMessage = '';
      this.IsAddEdit = true;
      this.brandId = id;

      this.getCommonList();

      if (this.brandId > 0) {
        this.title = "Edit";
        this._commonService.getbrandList(this.brandId)
          .subscribe((resp) =>
          {

            this.brandObj = resp
            this.brandObj.SelectedDepartment = resp.Department.split(',')
            , error => this.errorMessage = error
          });
      }else {
        this.title = "Create";
        this.brandObj = brandFun(this.isInserted);
      }
    }

    getCommonList(){
       this._commonService.GetLovDetailByColumn("ACTIVEINACTIVE").subscribe(
        (data) =>
         {
            this.StatusList = data;
        }
      )

      // this._commonService.GetActiveRootbrandList().subscribe(
      //   (data) =>
      //    {
      //       this.brandList = data;
      //   }
      // )
      this._commonService.GetActiveDepartmentList("").subscribe(
        (data) =>
         {
            this.DepartmentList = data;
        }
      )

    }

    validate(){
      if(this.brandObj.Brand_Name == null || this.brandObj.Brand_Name == '')
      {
        this.errorMessage = "Please Select Brand Name";
        return false;
      }
      else if(this.brandObj.Brand_NameD == null || this.brandObj.Brand_NameD == '')
      {
        this.errorMessage = "Please Select Brand Name denis";
        // this.renderer.selectRootElement('#RCatg_ID').focus();
        return false;
      }
      else
      {
        return true;
      }
    }

    savebrand() {
      debugger;
      if(this.validate()){
        this.brandObj.Created_By = this.userId;
        if (this.title == "Create") {
          this.brandObj.IsInserted = 'I';
          this._commonService.savebrand(this.brandObj)
            .subscribe((data) => {
              this.commonHelper.commonAlerts('Inserted', data,'/master/brand-master', '/master/add-edit-brand')

            }, error => this.errorMessage = error)
        }
        // else if (this.title == "Edit") {
        //   this.brandObj.IsInserted = 'U';
        //   this._commonService.savebrand(this.brandObj)
        //     .subscribe((data) => {
        //       this.commonHelper.commonAlerts('Updated', data,'/master/brand-master', '/master/add-edit-brand')
        //     }, error => this.errorMessage = error)
        // }
      }
    }

    cancel() {
      this.errorMessage = '';
      this.IsAddEdit = false;
      // this._router.navigate(['/master/brand-master']);
    }

    editBrandmaster(item: any)
    {
      item.editable = !item.editable;

      if (!item.editable) {
        debugger;
        item.IsInserted = 'U';
        item.Created_By=this.userId;
        this._commonService.savebrand(item)
          .subscribe((data) => {
            this.commonHelper.commonAlerts('Updated', data,'/master/brand-master', '/master/add-edit-brand')
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
    cancleBrandmaster(row) {
      debugger;
      row.editable = false
    }
}

function brandFun(isInserted) {

  let obj ={
    Brand_ID :'',
    Brand_Name : '',
    Brand_NameD : '',
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
