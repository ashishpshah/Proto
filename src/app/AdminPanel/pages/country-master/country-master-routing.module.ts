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
        path: 'country-master',
        loadChildren: () => import('./country-list/country-list.module').then(m => m.CountryListModule)
        // ,children: [
        //   {
        //     path: 'add-edit-country',
        //     loadChildren: () => import('./add-edit-country/add-edit-country.module').then(m => m.AddEditCountryModule)
        //   }
        //  ]
      },
      {
        path: 'add-edit-country',
        loadChildren: () => import('./add-edit-country/add-edit-country.module').then(m => m.AddEditCountryModule)
      }
      ,{
        path: 'add-edit-country/:id',
        loadChildren: () => import('./add-edit-country/add-edit-country.module').then(m => m.AddEditCountryModule)
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
export class CountryMasterRoutingModule { }
