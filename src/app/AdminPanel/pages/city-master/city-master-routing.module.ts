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
        path: 'city-master',
        loadChildren: () => import('./city-list/city-list.module').then(m => m.CityListModule)
      },
      {
        path: 'add-edit-city',
        loadChildren: () => import('./add-edit-city/add-edit-city.module').then(m => m.AddEditCityModule)
      }
      ,{
        path: 'add-edit-city/:id',
        loadChildren: () => import('./add-edit-city/add-edit-city.module').then(m => m.AddEditCityModule)
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
export class CityMasterRoutingModule { }
