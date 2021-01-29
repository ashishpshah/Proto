import { stringify } from '@angular/compiler/src/util';
import { AdminCommonHelperComponent } from './../../../AdminPanel/pages/AdminCommonHelper/AdminCommonHelper.component';
import { Client_commonService } from './../../client_services/client_common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  Cust_id:string
  AddresList  : any [];
  CreateAddressObj :any ={};
  errorMessage: any ='';
  shopingcart_ : any [];
  Item_Master_ : any;
  shippingcharge:number =15;
  Subtotal:number =0;
  Grandtotal:number =0;
  Itemcount:number;
  HeaderLabel:string='Checkout - Address';
  NextBtnLabel:string='Continue to Delivery Method';
  PrevBtnLabel:string='Back To Basket';
  MethosTypes:string
  Isaddress: boolean=true;
  Ispayment: boolean=false;
  Isdelivery: boolean=false;
  Isorderview: boolean=false;

  constructor(  private route: ActivatedRoute,
    private router: Router,
    public Client_commonService_: Client_commonService,
    private renderer: Renderer2) { }

  ngOnInit()
  {
    this.GetAddressList()
    this.CreateAddressObj= CreateAdresssFun()
    this.calculatecartvalue();
  }

  GotoNextmethod(Type: string)
  {

    if(Type =="address")
    {
      this.Isaddress = false
      this.Ispayment = false
      this.Isorderview = false
      this.Isdelivery = true
      this.HeaderLabel='Checkout - Delivery Method';
    }
    else  if(Type =="delivery")
    {
      this.Isaddress = false
      this.Isdelivery = false
      this.Ispayment = true
      this.Isorderview = false
      this.HeaderLabel='Checkout - Payment Method';


    }
    else  if(Type =="payment")
    {
      this.Isaddress = false
      this.Ispayment = false
      this.Isorderview = true
      this.Isdelivery = false
      this.HeaderLabel='Checkout - Order review';

    }

  }

  GotoPremethod(Type: string)
  {

   if(Type =="delivery")
    {
      this.Isaddress = true
      this.Isdelivery = false
      this.Ispayment = false
      this.Isorderview = false
      this.HeaderLabel='Checkout - Address';


    }
    else  if(Type =="payment")
    {
      this.Isaddress = false
      this.Ispayment = false
      this.Isorderview = false
      this.Isdelivery = true
      this.HeaderLabel='Checkout - Delivery Method';

    }
    else  if(Type =="orderview")
    {
      this.Isaddress = false
      this.Ispayment = true
      this.Isorderview = false
      this.Isdelivery = false
      this.HeaderLabel='Checkout - Payment Method';

    }

  }

  calculatecartvalue()
  {

    this.Item_Master_ = this.Client_commonService_.getItems();
    this.Subtotal=0;
    this.Grandtotal=0;
    this.Itemcount =  this.Item_Master_.length

    for (var index in this.Item_Master_) {

      this.Subtotal +=  this.Item_Master_[index].TotalPrice
    }

   this.Grandtotal= this.Subtotal+ this.shippingcharge



   var groups = new Set(this.Item_Master_.map(item => item.CategoryName))
   this.shopingcart_ = [];
   groups.forEach(g =>
     this.shopingcart_.push({
       name: g,
       values: this.Item_Master_.filter(i => i.group === g)
     }
   ))

  }
  OnclickCheckOutMethod(MethosType : string)
  {
    this.MethosTypes =MethosType;
    if(MethosType =="Address")
    {
      this.HeaderLabel='Checkout - Address';
      this.NextBtnLabel='Continue to Delivery Method';
      this.PrevBtnLabel='Back To Basket';
    }
    else if(MethosType =="Delivery")
    {
      this.HeaderLabel='Checkout - Delivery Method';
      this.NextBtnLabel='Continue to Payment Method';
      this.PrevBtnLabel='Back to Addresses';
    }
    else if(MethosType =="Payment")
    {
      this.HeaderLabel='Checkout - Payment Method';
      this.NextBtnLabel='Continue to Order review';
      this.PrevBtnLabel='Back to Shipping method';
    }
    else if(MethosType =="Order")
    {
      this.HeaderLabel='Checkout - Order review';
      this.NextBtnLabel='Place an order';
      this.PrevBtnLabel='Back to Payment method';
    }

  }

  GetAddressList()
  {


    this.Cust_id = this.Client_commonService_.getWithExpiryLocalStorage("Cust_Id")
     //localStorage.removeItem('Cust_Id');

    this.Client_commonService_.GetAddressList(this.Cust_id).subscribe(
      (data) =>
       {
         this.AddresList = data;

      }
    )
  }

  validate(){




  if(this.CreateAddressObj.FirstName == '')
    {
      this.errorMessage = "Please Enter First Name";
      this.renderer.selectRootElement('#FirstName').focus();
      return false;
    }
    else if(this.CreateAddressObj.LastName == '')
    {
      this.errorMessage = "Please Enter Last Name";
      this.renderer.selectRootElement('#LastName').focus();
      return false;
    }
    else if(this.CreateAddressObj.Zipcode == '' || this.CreateAddressObj.Zipcode == '0' || this.CreateAddressObj.Zipcode == 0 )
    {
      this.errorMessage = "Please Enter Zip code";
      this.renderer.selectRootElement('#Zipcode').focus();
      return false;
    }
    else if(this.CreateAddressObj.AddressLine1 == '')
    {
      this.errorMessage = "Please Enter AddressLine1";
      this.renderer.selectRootElement('#Town').focus();
      return false;
    }
    else if(this.CreateAddressObj.AddressLine2 == '')
    {
      this.errorMessage = "Please Enter AddressLine2";
      this.renderer.selectRootElement('#StreetName').focus();
      return false;
    }
    // else if(this.CreateAddressObj.StreetNo == '')
    // {
    //   this.errorMessage = "Please Enter Street No";
    //   this.renderer.selectRootElement('#StreetNo').focus();
    //   return false;
    // }
    else if(this.CreateAddressObj.MobileNo == '' || this.CreateAddressObj.MobileNo == '0' || this.CreateAddressObj.MobileNo == 0 )
    {
      this.errorMessage = "Please Enter Mobile No";
      this.renderer.selectRootElement('#MobileNo').focus();
      return false;
    }
    else
    {
      return true;
    }
  }
  commonHelper = new AdminCommonHelperComponent(this.router);
  createAddress()
  {
    if(this.validate()){

      this.CreateAddressObj.Created_By = 0;
      this.CreateAddressObj.Cust_Id = this.Cust_id;
        //this.itemForm.value.IsInserted = 'I';
        this.CreateAddressObj.IsInserted = 'I';
        this.Client_commonService_.SaveCustmerdata(this.CreateAddressObj)
          .subscribe((data) => {
            this.commonHelper.simpleAlert('Inserted', 'Record Saved successfully', 'success')
            this.GetAddressList()

          }, error => this.errorMessage = error)
    }
  }

}

function CreateAdresssFun() {

  let obj ={
    Cust_Id :0,
    Address_Id:0,
    FirstName : '',
    LastName : '',
    Zipcode : '',
    Town : '',
    StreetName : '',
    StreetNo :'',
    Letter : '',
  Floor : '',
  Page :'',
  DoorNo : '',
  MobileNo : '',
  IsDefault :false,
  AddressLine1 : '',
  AddressLine2 : '',

  Status : 'A',
  Created_By :'',
  Created_Date :'',
  Modified_By :'',
  Modified_Date :'',
  IsDeleted :'',
  IsInserted : 'A'
};
  return obj;
}
