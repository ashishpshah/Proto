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
        path: 'street-master',
        loadChildren: () => import('./street-list/street-list.module').then(m => m.StreetListModule)
      },
      {
        path: 'add-edit-street',
        loadChildren: () => import('./add-edit-street/add-edit-street.module').then(m => m.AddEditStreetModule)
      }
      ,{
        path: 'add-edit-street/:id',
        loadChildren: () => import('./add-edit-street/add-edit-street.module').then(m => m.AddEditStreetModule)
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
export class StreetMasterRoutingModule { }
