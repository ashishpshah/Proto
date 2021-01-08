import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ItemMaster } from "../item-master-model";
import { Observable } from "rxjs";
// import { ItemMasterService } from "../item-master.service";
import { AddEditItemComponent } from "../add-edit-item/add-edit-item.component";
import { ProtoServicesService } from "../../../Services/proto-services.service";
import Swal from 'sweetalert2/dist/sweetalert2.js';


import { Table } from 'primeng/table';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  loading: boolean = true;
  IsAddEdit = false;
  itemMaster : Observable<ItemMaster[]>;
  selecteditemMaster : Observable<ItemMaster[]>;
  userId : string = localStorage.getItem('userId');
  msgType : string = '';
  message : string = '';
  // @ViewChild('viewPage') _viewPage: AddEditItemComponent;

  @ViewChild('dt') table: Table;
//, private primengConfig: PrimeNGConfig
  constructor( private _commonService : ProtoServicesService, private _router: Router, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void  {
     this.getItemList();

  }

  getItemList(){
    this._commonService.getItemList('0').subscribe(
      (data) =>
       {
        this.itemMaster =  data;
        this.loading = false;
      }
    );
  }
  openAddEdit(){
    this._router.navigate(['/master/add-edit-item']);
  }

  openEditItem(id){
    this._router.navigate(['/master/add-edit-item',id]);
  }

  deleteItem(itemId) {
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
      if (result.isConfirmed) {
        this._commonService.deleteItem(itemId,this.userId).subscribe((data) => {
          debugger;
          if (data != null && data != "e" && data != "r" && data != "o") {

            let splitData = data.toString().split("|");
            this.msgType = splitData.length > 0 ? splitData[0] :'E';
            this.message = splitData.length > 1 ? splitData[1] :'Something went wrong!';

            if (this.msgType == 'S') {
              Swal.fire('Deleted!', this.message, 'success')
              this.getItemList();
            }else {
              Swal.fire('Error', this.message, 'error')
            }

          }else{
            Swal.fire('Error', 'Something went wrong!', 'error')
          }

      }, error => console.error(error))
      }
    })

    // if (ans) {
    //     this._commonService.deleteItem(itemId,this.userId).subscribe((data) => {
    //         this.getItemList();
    //     }, error => console.error(error))
    // }
  }
  activateItem(itemId) {
        this._commonService.activeItem(itemId,this.userId).subscribe((data) => {
          if (data != null && data != "e" && data != "r" && data != "o") {

            let splitData = data.toString().split("|");
            this.msgType = splitData.length > 0 ? splitData[0] :'E';
            this.message = splitData.length > 1 ? splitData[1] :'Something went wrong!';

            if (this.msgType == 'S') {
              Swal.fire('Activated!', this.message, 'success')
              this.getItemList();
            }else {
              Swal.fire('Error', this.message, 'error')
            }

          }else{
            Swal.fire('Error', 'Something went wrong!', 'error')
          }
        }, error => console.error(error))
  }


}
