import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingcartComponent } from './shoppingcart.component';

const routes: Routes = [
  {
    path: '',
    component: ShoppingcartComponent,
    data: {
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ShoppingcartRoutes{}
