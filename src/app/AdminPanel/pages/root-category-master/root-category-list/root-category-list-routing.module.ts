import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RootCategoryListComponent } from './root-category-list.component';

const routes: Routes = [
  {
    path: '',
    component: RootCategoryListComponent,
    data: {
      breadcrumb: 'Root Category List',
      icon: 'icofont-layout bg-c-blue',
      breadcrumb_caption: 'Root Category List',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RootCategoryListRoutingModule { }
