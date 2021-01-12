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
        path: 'root-header-master',
        loadChildren: () => import('./root-header-list/root-header-list.module').then(m => m.RootHeaderListModule)
      },
      {
        path: 'add-edit-root-header',
        loadChildren: () => import('./add-edit-root-header/add-edit-root-header.module').then(m => m.AddEditRootHeaderModule)
      }
      ,{
        path: 'add-edit-root-header/:id',
        loadChildren: () => import('./add-edit-root-header/add-edit-root-header.module').then(m => m.AddEditRootHeaderModule)
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
export class RootHeaderMasterRoutingModule { }
