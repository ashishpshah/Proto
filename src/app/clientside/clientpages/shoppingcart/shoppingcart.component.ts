import { shopingcart } from './../../../models/shopingcart';
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


  shopingcart_ : any [];
  Item_Master_ : any;
  shippingcharge:number =15;
  Subtotal:number =0;
  Grandtotal:number =0;
  Itemcount:number =0;
  itemname:string ='Fruit';
  username: string='';
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
  checkoutItem()
  {
    debugger;
    //localStorage.removeItem('Cust_userName');
    this.username = localStorage.getItem('Cust_userName');
    if( this.username== null || this.username== '' || this.username== undefined)
    {
      this.router.navigate(['/checkoutlogin']);
    }else{
      this.router.navigate(['/checkout']);
    }


  }

  deleteItem(item){
    this.Client_commonService_.deleteItem(item);
    this.Item_Master_ = this.Client_commonService_.getItems();
    this.calculatecartvalue();

  }

  minuseQty(item)
  {
    debugger
    this.Client_commonService_.minuseQty(item);
    this.Item_Master_ = this.Client_commonService_.getItems();
    this.calculatecartvalue();

  }

  PluseQty(item){
    debugger;
    this.Client_commonService_.addQty(item);
    this.Item_Master_ = this.Client_commonService_.getItems();

    this.calculatecartvalue();

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
   debugger;


   var groups = new Set(this.Item_Master_.map(item => item.CategoryName))
   this.shopingcart_ = [];
   groups.forEach(g =>
     this.shopingcart_.push({
       name: g,
       values: this.Item_Master_.filter(i => i.group === g)
     }
   ))

  }

}

function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach((item) => {
       const key = keyGetter(item);
       const collection = map.get(key);
       if (!collection) {
           map.set(key, [item]);
       } else {
           collection.push(item);
       }
  });
  return map;
}
