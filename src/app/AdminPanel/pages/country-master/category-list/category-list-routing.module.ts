import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListComponent } from './category-list.component';

const routes: Routes = [
  {
    path: '',
    component: CategoryListComponent,
    data: {
      breadcrumb: 'Category List',
      icon: 'icofont-layout bg-c-blue',
      breadcrumb_caption: 'Category List',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryListRoutingModule { }
