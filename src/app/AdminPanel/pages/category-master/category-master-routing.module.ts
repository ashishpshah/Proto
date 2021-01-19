import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Master',
      status: false
    },
    children: [
      {
        path: 'category-master',
        loadChildren: () => import('./category-list/category-list.module').then(m => m.CategoryListModule)
      },
      {
        path: 'add-edit-category',
        loadChildren: () => import('./add-edit-category/add-edit-category.module').then(m => m.AddEditCategoryModule)
      }
      ,{
        path: 'add-edit-category/:id',
        loadChildren: () => import('./add-edit-category/add-edit-category.module').then(m => m.AddEditCategoryModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
   declarations: [
  ]
})
export class CategoryMasterRoutingModule { }
