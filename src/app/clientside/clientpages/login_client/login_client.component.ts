import { AuthenticationServiceService } from './../../client_services/authenticationService.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login_client',
  templateUrl: './login_client.component.html',
  styleUrls: ['./login_client.component.scss']
})
export class Login_clientComponent implements OnInit {


  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';
  title: string = "Login";
  errorMessage: any;
  loading = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _AuthenticationServiceService : AuthenticationServiceService
) {
    // redirect to home if already logged in

}

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required]
  });
  }

  get f() { return this.loginForm.controls; }

  login() {
    debugger;
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
            debugger;
              this.loginForm = this.formBuilder.group({resp});
            // localStorage.setItem('userId',  this.loginForm.value.resp.User_Id);
            // localStorage.setItem('userName',  this.loginForm.value.resp.User_Name);
            // localStorage.setItem('userType',  this.loginForm.value.resp.UserTypeDesc);
            this.loading = false;
            this.router.navigate(['/subcategory/1']);
          }

        }, error => {this.errorMessage = error ; this.loading = false;})

  }

  get Email() { return this.loginForm.get('Email'); }
  get Password() { return this.loginForm.get('Password'); }

}
