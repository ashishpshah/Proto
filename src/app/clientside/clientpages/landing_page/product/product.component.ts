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
  Item_Masters : any[] = [];
  shoppingcartlist : Observable<Item_Master[]>;
  isShown: boolean = false ;
  isShown1: boolean = true ;
  public isActive:boolean = false;
  ItemObj :any ={};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private Client_commonService_: Client_commonService,
  ){

  }

  imageObject = [{
    image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
    thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
    title: 'Hummingbirds are amazing creatures'
}, {
    image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/9.jpg',
    thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/9.jpg'
}, {
    image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/4.jpg',
    thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/4.jpg',
    title: 'Example with title.'
},{
    image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/7.jpg',
    thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/7.jpg',
    title: 'Hummingbirds are amazing creatures'
}, {
    image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/1.jpg',
    thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/1.jpg'
}, {
    image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/2.jpg',
    thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/2.jpg',
    title: 'Example two with title.'
}];

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
  imageClickHandler(e,Item_Masters) {
    debugger;
    console.log('image click', e);
  }
  GetProductItem(){

    this.Client_commonService_.GetProductItem().subscribe(
      (data) =>
       {
         this.Item_Masters = data;

         this.Item_Masters.map(row => {
          row.image = '/assets/img/img/No-Image.jpg';
        });

        this.Item_Masters.map(row => {
          row.thumbImage = '/assets/img/img/No-Image.jpg';
        });

        this.Item_Masters.map(row =>
          {
          row.title = 'Item Description.';
        });

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
    this.ItemObj =ItemFun();
    this.GetProductItem();
  }


  addToCart(Item_Mastercart) {

    this.Client_commonService_.addToCart1(Item_Mastercart);
  }




}

function ItemFun() {

  let obj ={
    Item_ID :'',
    Sub_Catg_ID : '',
    SR_NO : '',
    Catg_Id : 'A',
    Item_Name :'',
    Item_Name_D :'',
    Type_ID :'',
    Brand_ID :'',
    UOM :'',
    Qty : '',
    Price:'',
    Display_Seq_No: '',

    Status :'',
    HedaerName : '',
    TotalPrice : '',
    discount : 'A',
    shippingcharge :'',
    Subtotal :'',
    Grandtotal :'',
    CategoryName :'',
    showaddbtn :'',
    showplusebtn : '',
    OrderQty:'',
    Activewishlist: false,
};
  return obj;
}
