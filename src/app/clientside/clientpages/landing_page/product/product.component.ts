import { Client_commonService } from './../../../client_services/client_common.service';
import { Item_Master } from './../../../../models/Item_Master';
import { Component, OnInit } from '@angular/core';
import { NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from '@angular/router';
import { AdminCommonHelperComponent } from 'src/app/AdminPanel/pages/AdminCommonHelper/AdminCommonHelper.component';

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

  listSliderUrl = []

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private Client_commonService_: Client_commonService,
  ){

  }
  commonHelper = new AdminCommonHelperComponent(this.router);
  currency : string  = this.commonHelper.currency;
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
    debugger;
    this.listSliderUrl = ['http://proto.a2hosted.com/assets/img/slider/grosary1.png','http://proto.a2hosted.com/assets/img/slider/grosary2.png','http://proto.a2hosted.com/assets/img/slider/grosary3.png']
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
