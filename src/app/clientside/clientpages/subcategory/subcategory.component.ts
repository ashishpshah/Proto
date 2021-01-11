

import { CategoryService } from '../../client_services/category.service';
import { Sub_Catg_Master } from '../../clientmodels/Category/Sub_Catg_Master';
import { Item_Master } from '../../clientmodels/Category/Item_Master';
import { Catg_Master } from '../../clientmodels/Category/Catg_Master';
import { Component, OnInit,AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from "rxjs";

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
  ){

  }

  ngOnInit() {


      this.router.routeReuseStrategy.shouldReuseRoute = () => false;

      this.subcategoryName = this.route.snapshot.paramMap.get('string');
      // this.categoryName = this.route.snapshot.data['name'];
      // this.category = this.route.snapshot.data['category'];
      this.Root_Header_ID=parseInt(this.subcategoryName);
      this.RCatg_ID=parseInt(this.subcategoryName);
      this.PageLoaditembyRCatg_ID(this.RCatg_ID);
      this.GetCatg_MasterList(this.Root_Header_ID);

      //console.log('category/subcategory: ' + this.category +'/'+ this.subcategoryName);

  }

  PageLoaditembyRCatg_ID(RCatg_ID :number){

    this.categoryService.PageLoaditembyRCatg_ID(RCatg_ID).subscribe(
      (data) =>
       {
         this.Item_Masters = data;

        //  data.forEach(function (value) {
        //
        //   this.HeaderName = value.HedaerName;
        //   return;
        // });
      }
    )
  }

  getItemList(cat_ids :number){

    this.categoryService.getItemList(cat_ids).subscribe(
      (data) =>
       {
         this.Item_Masters = data;

      }
    )
  }

  GetCatg_MasterList(Root_Header_ID :number){

    this.categoryService.GetCatg_MasterList(Root_Header_ID).subscribe(
      (data) =>
       {
         this.Catg_Master = data;

      }
    )
  }
  filterByCategory(cat_ids)
  {
    this.categoryService.getItemList(cat_ids).subscribe(
      (data) =>
       {
         this.Item_Masters = data;

      }
    )
  }
  getItemListBysubcategory(Sub_Catg_ID)
  {
    this.categoryService.getItemListBysubcategory(Sub_Catg_ID).subscribe(
      (data) =>
       {
         this.Item_Masters = data;

      }
    )
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
    //let instances = m.Carousel.init(elems, this.options);

    // $("#myCarousel").on("slide.bs.carousel", function(e) {
    //   var $e = $(e.relatedTarget);
    //   var idx = $e.index();
    //   var itemsPerSlide = 5;
    //   var totalItems = $(".carousel-item").length;

    //   if (idx >= totalItems - (itemsPerSlide - 1)) {
    //     var it = (totalItems - idx*itemsPerSlide);
    //     for (var i = 0; i < it; i++) {
    //       // append slides to end
    //       if (e.direction == "left") {
    //         $(".carousel-item")
    //           .eq(i)
    //           .appendTo(".carousel-inner");
    //       } else {
    //         $(".carousel-item")
    //           .eq(0)
    //           .appendTo($(this).find(".carousel-inner"));
    //       }
    //     }
    //   }
    // });




  }
  SubCategoryList(cat_ids)
  {
    this.filterByCategory(cat_ids);
    // this.categoryService.SubCategoryList(cat_ids).subscribe(
    //   (data) =>
    //    {
    //      this.Sub_Catg_Master = data;
    //
    //   }
    // )
  }
}
