import { HeaderComponent } from './../landing_page/header/header.component';
import { Client_commonService } from './../../client_services/client_common.service';
import { User_Customer_Master } from './../../../models/User_Customer_Master';
import { AuthenticationServiceService } from './../../client_services/authenticationService.service';
import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login_client',
  templateUrl: './login_client.component.html',
  styleUrls: ['./login_client.component.scss']
})
export class Login_clientComponent implements OnInit {

  @ViewChild(HeaderComponent, { static: false }) childC: HeaderComponent;
  loginForm: FormGroup;
  //custmerdata: User_Customer_Master;
  submitted = false;
  returnUrl: string;
  error = '';
  title: string = "Login";
  errorMessage: any;
  custmerdataObj :any ={};
  loading = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _AuthenticationServiceService : AuthenticationServiceService,
    public Client_commonService_: Client_commonService,
) {
    // redirect to home if already logged in

}

  ngOnInit() {



    this.returnUrl = window.location.pathname;

    //this.returnUrl = this.route.snapshot.paramMap.get('string');

    this.loginForm = this.formBuilder.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required]
  });
  }

  get f() { return this.loginForm.controls; }

  login() {

    this.loading = true;
    if (!this.loginForm.valid) {
      this.loading = false;
      return;
    }
      this._AuthenticationServiceService.Login(this.loginForm.value)
        .subscribe(resp => {

          if (resp == null) {
            this.errorMessage = "User Invalid";
          }else{

            this.custmerdataObj =resp;

            // localStorage.removeItem('CustId');
            // localStorage.removeItem('Cust_userName');
            // localStorage.removeItem('userId');


            this.Client_commonService_.setWithExpiryLocalStorage("Cust_Id", this.custmerdataObj.Cust_Id, 300000)
            this.Client_commonService_.setWithExpiryLocalStorage("Cust_userName", this.custmerdataObj.FirstName, 300000)
            this.loading = false;
            this.Client_commonService_.setCurrentUserName(this.custmerdataObj.FirstName);
            //this.childC.updateloginvalue();
            if(this.returnUrl == '/checkoutlogin')
            {
              this.router.navigate(['/shoppingcart']);
            }else
            {
              this.router.navigate(['/subcategory/1']);
            }

          }

        }, error => {this.errorMessage = error ; this.loading = false;})

  }

  get Email() { return this.loginForm.get('Email'); }
  get Password() { return this.loginForm.get('Password'); }

}
