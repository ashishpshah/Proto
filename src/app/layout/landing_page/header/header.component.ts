import { Root_Header_Master } from './../../../models/Category/Root_Header_Master';
import { Root_Catg_Master } from './../../../models/Category/Root_Catg_Master';
import { CategoryService } from './../../../Services/category.service';
import { Component, OnInit,ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Observable } from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private toggleButton: any;
  private sidebarVisible: boolean;

  Root_Header_ID:number=1;




  constructor(public location: Location, private element : ElementRef,private categoryService: CategoryService,) {
      this.sidebarVisible = false;
  }

  ngOnInit() {
      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
      this.GetRootHeaderData();
     // this.GetRoot_Catg_MasterList(this.Root_Header_ID);
  }
  Root_Catg_Masters :[] //Observable<Root_Catg_Master[]>;
  Root_Header_Masters : []//Observable<Root_Header_Master[]>;

  public generateStarsArray(Root_Header_ID): Array<any> {
    let stars = [];
    // this.stars = this.categoryService.GetRoot_Catg_MasterList(Root_Header_ID);
    // this.stars=this.Root_Catg_Masters;
    return stars;
}


  GetRootHeaderData(){


    //this.Root_Header_Masters = this.categoryService.GetRootHeaderDataList();

    this.categoryService.GetRootHeaderDataList().subscribe(
      (data) =>
       {
         this.Root_Header_Masters = data;

        //  data.forEach(function (value) {
        //   //console.log(value);
        //   debugger
        //   value.rootcat= this.categoryService.GetRoot_Catg_MasterList(value.Root_Header_ID);
        // });
      }
    )
  }

  sidebarOpen() {
      const toggleButton = this.toggleButton;
      const html = document.getElementsByTagName('html')[0];
      // console.log(html);
      // console.log(toggleButton, 'toggle');

      setTimeout(function(){
          toggleButton.classList.add('toggled');
      }, 500);
      html.classList.add('nav-open');

      this.sidebarVisible = true;
  };
  sidebarClose() {
      const html = document.getElementsByTagName('html')[0];
      // console.log(html);
      this.toggleButton.classList.remove('toggled');
      this.sidebarVisible = false;
      html.classList.remove('nav-open');
  };
  sidebarToggle() {
      // const toggleButton = this.toggleButton;
      // const body = document.getElementsByTagName('body')[0];
      if (this.sidebarVisible === false) {
          this.sidebarOpen();
      } else {
          this.sidebarClose();
      }
  };
  isHome() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }
      if( titlee === '/home' ) {
          return true;
      }
      else {
          return false;
      }
  }
  isDocumentation() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }
      if( titlee === '/documentation' ) {
          return true;
      }
      else {
          return false;
      }
  }
}