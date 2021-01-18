import { shopingcart } from './../../../models/productlist';
import { CategoryService } from './../../client_services/category.service';
import { HeaderComponent } from './../landing_page/header/header.component';
import { Item_Master } from './../../../models/Item_Master';
import { Client_commonService } from './../../client_services/client_common.service';
import { Component, OnInit,AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from "rxjs";

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.scss']
})
export class ShoppingcartComponent implements OnInit {


  shopingcart_ : Observable<shopingcart[]>;
  Item_Master_ : any;
  shippingcharge:number =15;
  Subtotal:number =0;
  Grandtotal:number =0;
  Itemcount:number =0;
  constructor
  (
    private route: ActivatedRoute,
    private router: Router,
    public Client_commonService_: Client_commonService,
    //private categoryService : CategoryService
  )
  {
  }

  //commonHelper = new HeaderComponent(this.Client_commonService_);

  ngOnInit()
  {

    this.calculatecartvalue();

  }

  deleteItem(item){
    this.Client_commonService_.deleteItem(item);
    this.Item_Master_ = this.Client_commonService_.getItems();
    this.calculatecartvalue();
    // let domItem = document.getElementById(item.Item_ID);
    // setTimeout(() =>{
    // domItem.classList.add('delete-style');
    // domItem.parentNode.removeChild(domItem);
    // },1000);

  }

  minuseQty(item){
    debugger
    this.Client_commonService_.minuseQty(item);
    this.Item_Master_ = this.Client_commonService_.getItems();
    this.calculatecartvalue();
    // let domItem = document.getElementById(item.Item_ID);
    // setTimeout(() =>{
    // domItem.classList.add('delete-style');
    // domItem.parentNode.removeChild(domItem);
    // },1000);

  }

  PluseQty(item){
    debugger;
    this.Client_commonService_.addQty(item);
    this.Item_Master_ = this.Client_commonService_.getItems();

    this.calculatecartvalue();
    // let domItem = document.getElementById(item.Item_ID);
    // setTimeout(() =>{
    // domItem.classList.add('delete-style');
    // domItem.parentNode.removeChild(domItem);
    // },1000);

  }

  items$ = this.Client_commonService_.items$;

  calculatecartvalue()
  {
    debugger;
    this.Item_Master_ = this.Client_commonService_.getItems();
    this.Subtotal=0;
    this.Grandtotal=0;
    this.Itemcount =  this.Item_Master_.length

    for (var index in this.Item_Master_) {

      this.Subtotal +=  this.Item_Master_[index].TotalPrice
    }

   this.Grandtotal= this.Subtotal+ this.shippingcharge
  }

}
