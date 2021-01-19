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
        path: 'sub-category-master',
        loadChildren: () => import('./sub-category-list/sub-category-list.module').then(m => m.SubCategoryListModule)
      },
      {
        path: 'add-edit-sub-category',
        loadChildren: () => import('./add-edit-sub-category/add-edit-sub-category.module').then(m => m.AddEditSubCategoryModule)
      }
      ,{
        path: 'add-edit-sub-category/:id',
        loadChildren: () => import('./add-edit-sub-category/add-edit-sub-category.module').then(m => m.AddEditSubCategoryModule)
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
export class SubCategoryMasterRoutingModule { }
