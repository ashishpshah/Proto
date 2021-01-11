import { Login_clientComponent } from './login_client.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: Login_clientComponent,
    data: {
      breadcrumb: 'About Us',
      icon: 'icofont-justify-all bg-c-green',
      breadcrumb_caption: 'Lorem Ipsum Dolor Sit Amet, Consectetur Adipisicing Elit - About Us',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class Login_clientRoutes{}

