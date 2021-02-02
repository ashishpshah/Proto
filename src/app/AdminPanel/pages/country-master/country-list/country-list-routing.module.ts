import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryListComponent } from './country-list.component';

const routes: Routes = [
  {
    path: '',
    component: CountryListComponent,
    data: {
      breadcrumb: 'Country Master',
      icon: 'icofont-layout  bg-c-orange',
      breadcrumb_caption: '',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountryListRoutingModule { }
