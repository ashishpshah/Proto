import { ShoppingcartRoutes } from './shoppingcart.routing';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingcartComponent } from './shoppingcart.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ShoppingcartRoutes
  ],
  declarations: [ShoppingcartComponent]
})
export class ShoppingcartModule { }
