import { Client_commonService } from './../../../client_services/client_common.service';
import { Item_Master } from './../../../../models/Item_Master';
import { Component, OnInit } from '@angular/core';
import { NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public data;
  Item_Masters : Observable<Item_Master[]>;
  shoppingcartlist : Observable<Item_Master[]>;
  isShown: boolean = false ;
  isShown1: boolean = true ;
  public isActive:boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private Client_commonService_: Client_commonService,
  ){

  }

  slideActivate(ngbSlideEvent: NgbSlideEvent) {
    console.log(ngbSlideEvent.source);
    console.log(ngbSlideEvent.paused);
    console.log(NgbSlideEventSource.INDICATOR);
    console.log(NgbSlideEventSource.ARROW_LEFT);
    console.log(NgbSlideEventSource.ARROW_RIGHT);
  }
  onClickwhishlist(Item_Masters)
  {


    Item_Masters.Activewishlist = !Item_Masters.Activewishlist;

    if(Item_Masters.Activewishlist)
    {
      this.Client_commonService_.addwishlist(Item_Masters);
    }else{
      this.Client_commonService_.removewhishlist(Item_Masters);
    }

  }
  GetProductItem(){

    this.Client_commonService_.GetProductItem().subscribe(
      (data) =>
       {
         this.Item_Masters = data;

         this.shoppingcartlist = this.Client_commonService_.getItems();

         for (var index in this.Item_Masters)
         {
              for (var index1 in this.shoppingcartlist)
              {
                  if(this.Item_Masters[index].Item_ID == this.shoppingcartlist[index1].Item_ID)
                  {
                    this.Item_Masters[index].OrderQty=this.shoppingcartlist[index1].OrderQty
                    this.Item_Masters[index].showaddbtn=false
                    this.Item_Masters[index].showplusebtn=true
                  }

              }
         }
      }
    )
  }

  toggleShow(Item_Masters)
  {

   Item_Masters.showaddbtn = false;
   Item_Masters.showplusebtn = true;

  }
  PluseQty(item)
  {

    this.Client_commonService_.addQty(item);
    item.OrderQty += 1

  }

  minuseQty(item){

    this.Client_commonService_.minuseQty(item);
    item.OrderQty -= 1

    if(item.OrderQty <= 0)
    {
      item.OrderQty=1
      this.Client_commonService_.deleteItem(item);
      item.showaddbtn = true;
      item.showplusebtn = false;
    }
  }


  ngOnInit(): void {
    this.GetProductItem();

// array of json for product list

    this.data ={

      result:status,

      productList:[

        {

          '_id': '5e804e29a915bb6a2297cfed',

          'index': 0,

          'price': '$31.79',

          'picture': '/assets/img/slider/slide_2.jpg',

          'name': 'Duffy Houston',

          'company': 'EQUITAX',

          'stock': 88

        },

        {

          '_id': '5e804e29c0165da9c25fdf9c',

          'index': 1,

          'price': '$32.92',

          'picture': '/assets/img/slider/slide_3.jpg',

          'name': 'Sanford Stanley',

          'company': 'ZILLA',

          'stock': 42

        },

        {

          '_id': '5e804e29421be457e0764462',

          'index': 2,

          'price': '$26.05',

          'picture': '/assets/img/slider/slide_2.jpg',

          'name': 'Tracey Fleming',

          'company': 'RODEMCO',

          'stock': 85

        },

        {

          '_id': '5e804e296cd363835b6b1904',

          'index': 3,

          'price': '$34.00',

          'picture': '/assets/img/slider/slide_3.jpg',

          'name': 'Howe Ruiz',

          'company': 'ARCTIQ',

          'stock': 27

        },

        {

          '_id': '5e804e29f434203d0037bf41',

          'index': 4,

          'price': '$14',

          'picture': '/assets/img/slider/slide_2.jpg',

          'name': 'Powers Kaufman',

          'company': 'EXOSPACE',

          'stock': 44

        },

        {

          '_id': '5e804e295884556517418658',

          'index': 5,

          'price': '$48.41',

          'picture': '/assets/img/slider/slide_3.jpg',

          'name': 'Pugh Pierce',

          'company': 'ZILPHUR',

          'stock': 64

        }
      ]

    }

  }


  addToCart(Item_Mastercart) {

    this.Client_commonService_.addToCart1(Item_Mastercart);
  }




}
