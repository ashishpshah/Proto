import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryListComponent } from './country-list.component';

const routes: Routes = [
  {
    path: '',
    component: CountryListComponent,
    data: {
      breadcrumb: 'Country List',
      icon: 'icofont-layout bg-c-blue',
      breadcrumb_caption: 'Country List',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountryListRoutingModule { }
