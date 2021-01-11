import { Login_clientRoutes } from './login_client.routing';
import { Login_clientComponent } from './login_client.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    Login_clientRoutes,
    FormsModule,
    HttpClientModule
  ],
  declarations: [Login_clientComponent]
})
export class Login_clientModule { }
