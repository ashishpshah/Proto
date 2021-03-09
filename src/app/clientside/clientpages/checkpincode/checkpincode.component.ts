import { MyValidators } from './../../../my-validators';
import { AdminCommonHelperComponent } from './../../../AdminPanel/pages/AdminCommonHelper/AdminCommonHelper.component';
import { ProtoServicesService } from './../../../AdminPanel/Services/proto-services.service';
import { DropdownList } from './../../../models/DropdownList';
import { AuthenticationServiceService } from './../../client_services/authenticationService.service';
import { Component, Input, OnInit, ElementRef, Renderer2,ViewChild,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl,FormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Observable } from "rxjs";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-checkpincode',
  templateUrl: './checkpincode.component.html',
  styleUrls: ['./checkpincode.component.scss']
})

export class CheckpincodeComponent implements OnInit {

  CreateFrom: FormGroup;
  CheckPincode: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';
  title: string = "Create Customer";
  errorMessage: any ='';
  loading = false;
  msgType : string = '';
  message : string = '';
  pincode :string ='';
  Townname : string = '';
  showpicodemodel:any =true;
  showcreatemodel:any =false;
  hideModal: boolean = false;
  isshowcvrdiv:any =false ;
  isshoweandiv:any =false;
  LetterList : Observable<DropdownList[]>;
  FloorList : Observable<DropdownList[]>;
  PageList : Observable<DropdownList[]>;
  CustTypeList : Observable<DropdownList[]>;
  Streetlist : Observable<DropdownList[]>;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;
  keyword = 'name';
  Captcha : string ='';
  reCaptcha : string = '';
  CreateFromObj :any ={};

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _AuthenticationServiceService : AuthenticationServiceService,
    private _commonService : ProtoServicesService,
    private renderer: Renderer2
)

{
  this.CreateFrom = formBuilder.group
  ({
    'name': ['', Validators.required, MyValidators.notstring('Guest')],
    'email': ['', [Validators.required, Validators.email]]
  })
}
commonHelper = new AdminCommonHelperComponent(this.router);

selectEvent(item) {

  this.CreateFromObj.StreetName=item.name;
  // do something with selected item
}

onChangeSearch(search: string) {
if(search.length >0)
{

  this.pincode  =this.CreateFromObj.Zipcode;
  this._commonService.GetStreetnamebysearch(search,this.pincode).subscribe(
    (data) =>
     {
        this.Streetlist = data;
    }
  )
}

}

onFocused(e) {
  // do something
}


ngOnInit() {

 // this.showpicodemodel= true;

 this.getCommonList();
 this.CreateFromObj = CustomerCreateFun();

this.CheckPincode = this.formBuilder.group({
  Pincode: ['', Validators.required],
});


}


get f() { return this.CreateFrom.controls; }

get P() { return this.CheckPincode.controls; }

getCommonList(){

   this._commonService.GetLovDetailByColumn("LETTERTYPE").subscribe(
    (data) =>
     {
        this.LetterList = data;
    }
  )

  this._commonService.GetLovDetailByColumn("FlOORTYPE").subscribe(
    (data) =>
     {
      this.FloorList =  data;
    }
  )

  this._commonService.GetLovDetailByColumn("PAGETYPE").subscribe(
    (data) =>
     {
      this.PageList =  data;
    }
  )

  this._commonService.GetLovDetailByColumn("CUSTTYPE").subscribe(
    (data) =>
     {
      this.CustTypeList =  data;
    }
  )
}

CheckPincodevalid() {

  this.loading = true;
  if (!this.CheckPincode.valid) {
    this.loading = false;
    return;
  }

    this.pincode=this.CheckPincode.value.Pincode;
    this._AuthenticationServiceService.CheckPincodeValidation(this.pincode)
    .subscribe((data) => {

      if (data != null && data != "e" && data != "r" && data != "o") {

        let splitData = data.toString().split("|");
        this.msgType = splitData.length > 0 ? splitData[0] :'E';
        this.message = splitData.length > 1 ? splitData[1] :'Something went wrong!';

        if (this.msgType == 'S') {
          this.showcreatemodel =true;
          this.showpicodemodel =false;
          this.Townname = splitData.length > 1 ? splitData[2] :'';
          this.CreateFromObj.Zipcode= this.pincode;
          this.CreateFromObj.Town= this.Townname;
          this.ReCaptcha();
          this.errorMessage='';
         // Swal.fire('Your Pincode is valid!', this.message, 'success')
        }else {
          this.errorMessage = this.message;
        }

      }else
      {
        this.errorMessage = 'Something went wrong!';
      }
    }, error => {this.errorMessage = error ; this.loading = false;})

}
  ReCaptcha(){
    this.reCaptcha = this.commonHelper.GenerateCaptchaNumber(4);
  }
validateEmail(email) {
  const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regularExpression.test(String(email).toLowerCase());
 }
validate(){




  if(this.CreateFromObj.Customer_Type == ''){
    this.errorMessage = "Please Select  Customer Type";
    this.renderer.selectRootElement('#Customer_Type').focus();
    return false;
  }
  else if(this.CreateFromObj.Email == '')
  {

    this.errorMessage = "Please Enter Email";
    this.renderer.selectRootElement('#Email').focus();
    return false;
  }
  else if(this.validateEmail(this.CreateFromObj.Email) == false)
  {

    this.errorMessage = "Please Enter Valid Email";
    this.renderer.selectRootElement('#Email').focus();
    return false;
  }
  else if(this.CreateFromObj.Compuny_Name == '')
  {
    this.errorMessage = "Please Enter Company Name";
    this.renderer.selectRootElement('#Compuny_Name').focus();
    return false;
  }
  else if(this.CreateFromObj.FirstName == '')
  {
    this.errorMessage = "Please Enter First Name";
    this.renderer.selectRootElement('#FirstName').focus();
    return false;
  }
  else if(this.CreateFromObj.LastName == '')
  {
    this.errorMessage = "Please Enter Last Name";
    this.renderer.selectRootElement('#LastName').focus();
    return false;
  }
  else if(this.CreateFromObj.Zipcode == '' || this.CreateFromObj.Zipcode == '0' || this.CreateFromObj.Zipcode == 0 )
  {
    this.errorMessage = "Please Enter Zip code";
    this.renderer.selectRootElement('#Zipcode').focus();
    return false;
  }
  else if(this.CreateFromObj.Town == '')
  {
    this.errorMessage = "Please Enter Town";
    this.renderer.selectRootElement('#Town').focus();
    return false;
  }
  else if(this.CreateFromObj.StreetName == '')
  {
    this.errorMessage = "Please Enter Street Name";
    this.renderer.selectRootElement('#StreetName').focus();
    return false;
  }
  else if(this.CreateFromObj.StreetNo == '')
  {
    this.errorMessage = "Please Enter Street No";
    this.renderer.selectRootElement('#StreetNo').focus();
    return false;
  }
  else if(this.CreateFromObj.MobileNo == '' || this.CreateFromObj.MobileNo == '0' || this.CreateFromObj.MobileNo == 0 )
  {
    this.errorMessage = "Please Enter Mobile No";
    this.renderer.selectRootElement('#MobileNo').focus();
    return false;
  }

  else if(this.CreateFromObj.Password == '' || this.CreateFromObj.Password == '0' || this.CreateFromObj.Password == 0 )
  {
    this.errorMessage = "Please Enter Password";
    this.renderer.selectRootElement('#Password').focus();
    return false;
  }
  else if(this.CreateFromObj.ReapeatPassword == '' || this.CreateFromObj.ReapeatPassword == '0' || this.CreateFromObj.ReapeatPassword == 0 )
  {
    this.errorMessage = "Please Enter Reapeat Password";
    this.renderer.selectRootElement('#ReapeatPassword').focus();
    return false;
  }
  else if(this.CreateFromObj.ReapeatPassword != this.CreateFromObj.Password )
  {
    this.errorMessage = "Please Enter Valid Reapeat Password";
    this.renderer.selectRootElement('#ReapeatPassword').focus();
    return false;
  }
  else if(this.CreateFromObj.Customer_Type != '')
  {
    if(this.CreateFromObj.Customer_Type =='PROFESSION')
    {

     if(this.CreateFromObj.CVR == '' || this.CreateFromObj.CVR == '0' || this.CreateFromObj.CVR == 0 )
      {
        this.errorMessage = "Please Enter CVR";
        this.renderer.selectRootElement('#CVR').focus();
        return false;
      }
      else{
        return true;
      }

    }
    else if(this.CreateFromObj.Customer_Type =='PUBLIC')
    {
      if(this.CreateFromObj.CVR == '' || this.CreateFromObj.CVR == '0' || this.CreateFromObj.CVR == 0 )
      {
        this.errorMessage = "Please Enter CVR";
        this.renderer.selectRootElement('#CVR').focus();
        return false;
      }
      else if(this.CreateFromObj.CEANNoVR == '' || this.CreateFromObj.EANNo == '0' || this.CreateFromObj.EANNo == 0 )
      {
        this.errorMessage = "Please Enter EANNo";
        this.renderer.selectRootElement('#EANNo').focus();
        return false;
      }
      else{
        return true;
      }
    }
    else{
      return true;
    }

  }
  else{
    return true;
  }
}


createCustomer() {
  if(this.validate()){
    this.CreateFromObj.Created_By = 0;
    if (this.title == "Create Customer") {
      //this.itemForm.value.IsInserted = 'I';
      this.CreateFromObj.IsInserted = 'I';
      this._AuthenticationServiceService.SaveCustmerdata(this.CreateFromObj)
        .subscribe((data) => {
          this.commonHelper.commonAlert('Inserted', data, '/subcategory/1')

        }, error => this.errorMessage = error)
    }
  }
}

validateipcode() {

  if(this.CreateFromObj.Zipcode == '' || this.CreateFromObj.Zipcode == '0' || this.CreateFromObj.Zipcode == 0 )
    {
      this.errorMessage = "Please Enter Zip code";
      this.renderer.selectRootElement('#Zipcode').focus();
      return false;
    }else{
      return true;
    }
  }

CheckPincodevalidet() {

  if(this.validateipcode()){


    this.pincode =this.CreateFromObj.ZipcodeCheck;
    this._AuthenticationServiceService.CheckPincodeValidation(this.pincode)
    .subscribe((data) => {

      if (data != null && data != "e" && data != "r" && data != "o") {

        let splitData = data.toString().split("|");
        this.msgType = splitData.length > 0 ? splitData[0] :'E';
        this.message = splitData.length > 1 ? splitData[1] :'Something went wrong!';

        if (this.msgType == 'S')
        {
          //this.hideModal = true;
          this.closeAddExpenseModal.nativeElement.click();
          this.Townname = splitData.length > 1 ? splitData[2] :'';
          this.CreateFromObj.Zipcode= this.pincode;
          this.CreateFromObj.Town= this.Townname;
          this.CreateFromObj.ZipcodeCheck='';

        }else
        {
          this.closeAddExpenseModal.nativeElement.click();
          this.errorMessage = "Please Enter  Valid Pincode";
        }

      }else
      {
        this.closeAddExpenseModal.nativeElement.click();
        this.errorMessage = "Please Enter  Valid Pincode";
      }
    }, error => {this.errorMessage = error ; this.loading = false;})
  }

}

changecustomertype(e) {
  console.log(e.target.value);

  if(this.CreateFromObj.Customer_Type =='PROFESSION')
  {
      this.isshowcvrdiv =true;
  }
  else if(this.CreateFromObj.Customer_Type =='PUBLIC')
  {
    this.isshowcvrdiv =true;
    this.isshoweandiv =true;
  }
  else if(this.CreateFromObj.Customer_Type =='PRIVATE')
  {
    this.isshowcvrdiv =false;
    this.isshoweandiv =false;

  }

}





get Email() { return this.CreateFrom.get('Email'); }
get Password() { return this.CreateFrom.get('Password'); }

get Pincode() { return this.CreateFrom.get('Pincode'); }

}

function CustomerCreateFun() {

  let obj ={
  Cust_Id :0,
  Email:'',
  User_Id : '',
  Password : '',
  ReapeatPassword : '',
  Customer_Type :'PRIVATE',
  FirstName : '',
  MiddleName : '',
  LastName :'',
  Zipcode : '',
  ZipcodeCheck : '',
  Town : '',
  StreetName :'',
  StreetNo : '',
  Letter : '',
  Floor :'',
  Page : '',
  DoorNo : '',
  MobileNo :'',
  AltMobileNo:'',
  CVR : '',
  EANNo : '',
  Compuny_Name :'',
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
