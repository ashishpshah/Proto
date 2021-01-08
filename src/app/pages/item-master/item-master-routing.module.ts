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
        path: 'item-master',
        loadChildren: () => import('./item-list/item-list.module').then(m => m.ItemListModule)
      },
      {
        path: 'add-edit-item',
        loadChildren: () => import('./add-edit-item/add-edit-item.module').then(m => m.AddEditItemModule)
      }
      ,{
        path: 'add-edit-item/:id',
        loadChildren: () => import('./add-edit-item/add-edit-item.module').then(m => m.AddEditItemModule)
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
export class ItemMasterRoutingModule { }
