import { CheckoutRoutes } from './checkout.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { CheckoutComponent } from './checkout.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CheckoutRoutes
  ],
  declarations: [CheckoutComponent]
})
export class CheckoutModule { }
