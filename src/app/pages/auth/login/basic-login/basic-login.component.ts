import { ProtoServicesService } from './../../../../Services/proto-services.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-basic-login',
  templateUrl: './basic-login.component.html',
  styleUrls: ['./basic-login.component.scss']
})
export class BasicLoginComponent implements OnInit {

  loginForm: FormGroup;
  title: string = "Login";
  errorMessage: any;
  loading = false;

  constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
    private _commonService : ProtoServicesService, private _router: Router) {

      this.loginForm = this._fb.group({
        UserId: ['', [Validators.required]],
        Password: ['', [Validators.required]]
      })

    }

  ngOnInit() {
    document.querySelector('body').setAttribute('themebg-pattern', 'theme1');
  }

  login() {
    this.loading = true;
    if (!this.loginForm.valid) {
      this.loading = false;
      return;
    }
      this._commonService.Login(this.loginForm.value)
        .subscribe(resp => {

          if (resp == null) {
            this.errorMessage = "User Invalid";
          }else{
            debugger;
              this.loginForm = this._fb.group({resp});
              debugger;
            localStorage.setItem('userId',  this.loginForm.value.resp.User_Id);
            localStorage.setItem('userName',  this.loginForm.value.resp.User_Name);
            localStorage.setItem('userType',  this.loginForm.value.resp.UserTypeDesc);
            this.loading = false;
            this._router.navigate(['/dashboard']);
          }

        }, error => {this.errorMessage = error ; this.loading = false;})

  }


  get UserId() { return this.loginForm.get('UserId'); }
  get Password() { return this.loginForm.get('Password'); }
}
