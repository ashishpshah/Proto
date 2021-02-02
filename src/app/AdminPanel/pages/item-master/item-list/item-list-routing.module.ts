import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ItemListComponent} from './item-list.component';

const routes: Routes = [
  {
    path: '',
    component: ItemListComponent,
    data: {
      breadcrumb: 'Item Master',
      icon: 'icofont-layout  bg-c-orange',
      breadcrumb_caption: '',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemListRoutingModule { }
