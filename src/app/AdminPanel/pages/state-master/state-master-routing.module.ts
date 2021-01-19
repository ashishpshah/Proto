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
        path: 'state-master',
        loadChildren: () => import('./state-list/state-list.module').then(m => m.StateListModule)
      },
      {
        path: 'add-edit-state',
        loadChildren: () => import('./add-edit-state/add-edit-state.module').then(m => m.AddEditStateModule)
      }
      ,{
        path: 'add-edit-state/:id',
        loadChildren: () => import('./add-edit-state/add-edit-state.module').then(m => m.AddEditStateModule)
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
export class StateMasterRoutingModule { }
