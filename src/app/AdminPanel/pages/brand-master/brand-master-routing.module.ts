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
        path: 'brand-master',
        loadChildren: () => import('./brand-list/brand-list.module').then(m => m.brandListModule)
      },
      {
        path: 'add-edit-brand',
        loadChildren: () => import('./add-edit-brand/add-edit-brand.module').then(m => m.AddEditbrandModule)
      }
      ,{
        path: 'add-edit-brand/:id',
        loadChildren: () => import('./add-edit-brand/add-edit-brand.module').then(m => m.AddEditbrandModule)
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
export class brandMasterRoutingModule { }
