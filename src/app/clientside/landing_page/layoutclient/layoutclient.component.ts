import { Component,VERSION,OnInit,AfterViewInit } from '@angular/core';
import { NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Root_Header_Master } from '../../clientmodels/Category/Root_Header_Master';
import { Root_Catg_Master } from '../../clientmodels/Category/Root_Catg_Master';
import { CategoryService } from '../../client_services/category.service';
import { Observable } from "rxjs";

import '../../../../assets/LandingPage/js/Langingmain.js';

declare var $: any;
declare var require: any;
@Component({
  selector: 'app-layoutclient',
  templateUrl: './layoutclient.component.html',
  styleUrls: ['./layoutclient.component.css']
})
export class LayoutclientComponent implements OnInit {


  Root_Header_ID:number=1;
  showproduct = true;
  showHeader = true;
  showFooter = true;
  constructor(private router: Router, private activatedRoute: ActivatedRoute,private categoryService: CategoryService) {}

  ngOnInit(): void {
  }

  Root_Catg_Masters : [] ; // Observable<Root_Catg_Master[]>;
  Root_Header_Masters :[] ; // Observable<Root_Header_Master[]>;

  GetRootHeaderData()
  {

    this.categoryService.GetRootHeaderDataList().subscribe(
      (data) =>
       {
         this.Root_Header_Masters = data;
      }
    )
  }
  ngAfterViewInit() {

    // Mobile Navigation
  if ($('.nav-menu').length) {

    this.GetRootHeaderData();
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }
}

}
