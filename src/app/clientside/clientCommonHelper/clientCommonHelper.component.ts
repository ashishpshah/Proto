import { Client_commonService } from './../client_services/client_common.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Observable } from "rxjs";

@Component({
  selector: 'app-clientCommonHelper',
  templateUrl: './clientCommonHelper.component.html',
  styleUrls: ['./clientCommonHelper.component.scss']
})
export class ClientCommonHelperComponent implements OnInit {
  pageSize : any = 6;
  pageNo : any = 1;
  currency : string = "kr. ";
  paginationList : any[] = [];
  showingItems : number = 0;
  isFirstPageDisabled : boolean = false;
  isLastPageDisabled : boolean = false;
  firstPageNo : number = 1
  lastPageNo : number = 0;
  displayItems : any[] = [this.pageSize,"10","25","50","100"];
  sortBy : string = "";
  minPrice: number = 1;
  maxPrice: number = 2000;
  noRecordFound :string = 'Products not found';
  emptyCartMsg :string = 'Your cart is empty';
  shippingcharge:number =15;
  constructor(private _router: Router, private Client_commonService_ : Client_commonService,) { }

  ngOnInit() {
  }

  GeneratePaginationNo(totalCount : any, pageSize :any,pageNo:any){
    this.paginationList = [];
    pageSize = Math.floor(parseInt(pageSize)) == 0 ? totalCount : Math.floor(parseInt(pageSize));
      let pageLength : number = (totalCount % pageSize ==0) ? totalCount/pageSize : Math.floor((totalCount/pageSize)+1) ;
      for (let index = 1; index <= pageLength; index++) {
            this.paginationList.push(index)
      }
      this.showingItems = pageLength == pageNo ? totalCount : pageSize * pageNo;
      this.isLastPageDisabled = pageLength == pageNo ? true : false;
      this.isFirstPageDisabled = pageNo == 1 ? true : false;
      this.lastPageNo = pageLength;
      return this.paginationList;
  }


}

export class Pagination{
  Value : string;
  IsActive:boolean;
}
