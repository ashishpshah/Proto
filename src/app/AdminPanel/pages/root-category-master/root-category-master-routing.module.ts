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
        path: 'root-category-master',
        loadChildren: () => import('./root-category-list/root-category-list.module').then(m => m.RootCategoryListModule)
      },
      {
        path: 'add-edit-root-category',
        loadChildren: () => import('./add-edit-root-category/add-edit-root-category.module').then(m => m.AddEditRootCategoryModule)
      }
      ,{
        path: 'add-edit-root-category/:id',
        loadChildren: () => import('./add-edit-root-category/add-edit-root-category.module').then(m => m.AddEditRootCategoryModule)
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
export class RootCategoryMasterRoutingModule { }
