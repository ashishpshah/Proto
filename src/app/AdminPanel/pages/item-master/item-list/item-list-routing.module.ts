import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ItemListComponent} from './item-list.component';

const routes: Routes = [
  {
    path: '',
    component: ItemListComponent,
    data: {
      breadcrumb: 'Item List',
      icon: 'icofont-layout bg-c-blue',
      breadcrumb_caption: 'Item Master List',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemListRoutingModule { }
