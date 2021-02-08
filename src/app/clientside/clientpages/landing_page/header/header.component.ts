import { Client_commonService } from './../../../client_services/client_common.service';
import { Component, OnInit,ElementRef,ViewChild,Input } from '@angular/core';
import { Login_clientComponent } from '../../login_client/login_client.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // @Input()  username : string='Login In';
  // @Input()  Logintext : string='Login In';
 // @Input()  Showcreate:boolean=true;


  private toggleButton: any;
  private sidebarVisible: boolean;

  Root_Header_ID:number=1;
  hideshowcrat: boolean=true;
  Itemcount:number =0;
  Item_Master_ : any;
  username : string='LOG IN';
  Logintext : string='LOG IN';
  Showcreate:boolean=true;
  Showlogin:boolean=true;
  Showlogout:boolean=false;





  constructor(
    private Client_commonService_: Client_commonService) {
      this.sidebarVisible = false;


  }
  updateloginvalue()
  {
    this.Client_commonService_.currentUserName$
    .subscribe(
    userName =>
    {
      if(userName== null)
      {
        this.username ="LOG IN";
        this.Logintext="LOG IN"
        this.Showcreate= true
        this.Showlogin= true
        this.Showlogout= false
      }else
      {
        this.username ="Welcome "+ userName+"";
        this.Logintext="LOG OUT"
        this.Showcreate= false
        this.Showlogin= false
        this.Showlogout= true
      }
    });
  }

  ngOnInit() {


    this.updateloginvalue();


      //const navbar: HTMLElement = this.element.nativeElement;
      //this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
      this.GetRootHeaderData();
      this.updatecartcount();
     // this.GetRoot_Catg_MasterList(this.Root_Header_ID);
  }

  items$ = this.Client_commonService_.items$;
  Root_Catg_Master :[] //Observable<Root_Catg_Master[]>;
  Root_Header_Masters : []//Observable<Root_Header_Master[]>;

  public generateStarsArray(Root_Header_ID): Array<any> {
    let stars = [];
    // this.stars = this.categoryService.GetRoot_Catg_MasterList(Root_Header_ID);
    // this.stars=this.Root_Catg_Masters;
    return stars;
}

Logout()
{

         localStorage.removeItem('CustId');
         localStorage.removeItem('Cust_userName');
         this.username ="LOG IN";
         this.Logintext="LOG IN"
         this.Showcreate= true
         this.Showlogin= true
         this.Showlogout= false
            // localStorage.removeItem('userId');
}
updatecartcount()
{
  this.Item_Master_ = this.Client_commonService_.getItems();
  this.Itemcount =  this.Item_Master_ != null? this.Item_Master_.length :0;
}

showcartevent()
{
  if(this.hideshowcrat == true)
  {
    this.hideshowcrat=false;
  }
  else if(this.hideshowcrat == false)
  {
    this.hideshowcrat=true;
  }

}
  GetRootHeaderData(){


    //this.Root_Header_Masters = this.categoryService.GetRootHeaderDataList();

    this.Client_commonService_.GetRootHeaderDataList().subscribe(
      (data) =>
       {
         this.Root_Header_Masters = data;

        //  data.forEach(function (value) {
        //   //console.log(value);
        //
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
  // isHome() {
  //   var titlee = this.location.prepareExternalUrl(this.location.path());
  //   if(titlee.charAt(0) === '#'){
  //       titlee = titlee.slice( 1 );
  //   }
  //     if( titlee === '/home' ) {
  //         return true;
  //     }
  //     else {
  //         return false;
  //     }
  // }
  // isDocumentation() {
  //   var titlee = this.location.prepareExternalUrl(this.location.path());
  //   if(titlee.charAt(0) === '#'){
  //       titlee = titlee.slice( 1 );
  //   }
  //     if( titlee === '/documentation' ) {
  //         return true;
  //     }
  //     else {
  //         return false;
  //     }
  // }
}
