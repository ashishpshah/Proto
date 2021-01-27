import { Catg_Master } from './../../../models/Catg_Master';
import { StreetListComponent } from './../../../AdminPanel/pages/street-master/street-list/street-list.component';
import { brandMasterModule } from './../../../AdminPanel/pages/brand-master/brand-master.module';
import { Client_commonService } from './../../client_services/client_common.service';
import { Item_Master } from './../../../models/Item_Master';
import { CategoryService } from '../../client_services/category.service';
import { Sub_Catg_Master } from '../../../models/Sub_Catg_Master';
import { Component, OnInit,AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from "rxjs";
import { BrandMaster } from 'src/app/models/BrandMaster';
import { TypeMaster } from 'src/app/models/TypeMaster';

declare var $: any;
declare var require: any;
@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})

export class SubcategoryComponent implements OnInit {
  errorMessage: string;
  category: string;
  categoryName: string;
  subcategoryName: string;
  _listFilter: string;
  cat_id: number =0;
  RCatg_ID: number =0;
  Root_Header_ID: number=0;
  Item_Masters : Observable<Item_Master[]>;
  Catg_Master : Observable<Catg_Master[]>;
  Sub_Catg_Master : Observable<Sub_Catg_Master[]>;
  public isCollapsed = true;
  HeaderName:string='';
  shoppingcartlist : Observable<Item_Master[]>;
  BrandMaster_ : Observable<BrandMaster[]>;
  TypeMaster_ : Observable<TypeMaster[]>;
  //productInfoCart : Observable<Item_Master[]>;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private Client_commonService_: Client_commonService
  ){

  }

  ngOnInit()
  {

    debugger;

      this.router.routeReuseStrategy.shouldReuseRoute = () => false;

      this.subcategoryName = this.route.snapshot.paramMap.get('string');
      // this.categoryName = this.route.snapshot.data['name'];
      // this.category = this.route.snapshot.data['category'];
      this.Root_Header_ID=parseInt(this.subcategoryName);
      this.RCatg_ID=parseInt(this.subcategoryName);
      this.PageLoaditembyRCatg_ID(this.RCatg_ID);
      this.GetCatg_MasterList(this.Root_Header_ID);
      this.GetBrandByType(this.RCatg_ID,'RootHeader');
      this.GetTypeByType(this.RCatg_ID,'RootHeader');



  }

  toggleShow(Item_Masters)
  {
   debugger;
   Item_Masters.showaddbtn = false;
   Item_Masters.showplusebtn = true;

  }
  PluseQty(item)
  {
    debugger;
    this.Client_commonService_.addQty(item);
    item.OrderQty += 1

  }

  minuseQty(item){
    debugger
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

  addToCart(Item_Mastercart) {
    this.Client_commonService_.addToCart1(Item_Mastercart);
  }

  PageLoaditembyRCatg_ID(RCatg_ID :number){

    this.Client_commonService_.PageLoaditembyRCatg_ID(RCatg_ID).subscribe(
      (data) =>
       {
         this.Item_Masters = data;
         this.CheckshopingcartQty()
      }
    )
  }

  GetBrandByType(ID :number,Type: string){

    this.Client_commonService_.GetBrandByType(ID,Type).subscribe(
      (data) =>
       {
         this.BrandMaster_ = data;
      }
    )
  }

  GetTypeByType(ID :number,Type: string){

    this.Client_commonService_.GetTypeByType(ID,Type).subscribe(
      (data) =>
       {
         this.TypeMaster_ = data;
      }
    )
  }

  getItemList(cat_ids :number){

    this.Client_commonService_.getItemList(cat_ids).subscribe(
      (data) =>
       {
         this.Item_Masters = data;
         this.CheckshopingcartQty()

      }
    )

    this.GetBrandByType(cat_ids,'Category');
    this.GetTypeByType(cat_ids,'Category');
  }

  CheckshopingcartQty()
  {
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

  GetCatg_MasterList(Root_Header_ID :number){

    this.Client_commonService_.GetCatg_MasterList(Root_Header_ID).subscribe(
      (data) =>
       {
         this.Catg_Master = data;

      }
    )
  }
  filterByCategory(cat_ids)
  {
    this.Client_commonService_.getItemList(cat_ids).subscribe(
      (data) =>
       {
         this.Item_Masters = data;
         this.CheckshopingcartQty()

      }
    )
    this.GetBrandByType(cat_ids,'Category');
    this.GetTypeByType(cat_ids,'Category');
  }
  getItemListBysubcategory(Sub_Catg_ID)
  {
    debugger;
    this.Client_commonService_.getItemListBysubcategory(Sub_Catg_ID).subscribe(
      (data) =>
       {
        // this.Item_Masters = any [];
         this.Item_Masters = data;
         //this.CheckshopingcartQty()

      }
    )

    this.GetBrandByType(Sub_Catg_ID,'SubCategory');
    this.GetTypeByType(Sub_Catg_ID,'SubCategory');
  }

  ngAfterViewInit() {

    $('#carouselExample').on('slide.bs.carousel', function (e) {

      var $e = $(e.relatedTarget);
      var idx = $e.index();
      var itemsPerSlide = 7;
      var totalItems = $('.carousel-item').length;

      if (idx >= totalItems-(itemsPerSlide-1)) {
          var it = itemsPerSlide - (totalItems - idx);
          for (var i=0; i<it; i++) {
              // append slides to end
              if (e.direction=="left") {
                  $('.carousel-item').eq(i).appendTo('.carousel-inner');
              }
              else {
                  $('.carousel-item').eq(0).appendTo('.carousel-inner');
              }
          }
      }
  });

  }
  SubCategoryList(cat_ids)
  {
    this.filterByCategory(cat_ids);
  }

  GetItemListBysubcategory_List(Sub_Catg_ID)
  {
    this.getItemListBysubcategory(Sub_Catg_ID)
  }
}
