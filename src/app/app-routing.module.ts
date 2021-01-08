import { SubcategoryModule } from './pages/subcategory/subcategory.modules';
import { Landing_pageComponent } from './layout/landing_page/landing_page/landing_page.component';
import { BasicLoginComponent } from './pages/auth/login/basic-login/basic-login.component';
import { SubcategoryComponent } from './pages/subcategory/subcategory.component';
import { BasicLoginModule } from './pages/auth/login/basic-login/basic-login.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './layout/admin/admin.component';
import {AuthComponent} from './layout/auth/auth.component';


const routes: Routes = [
  {
    path: '',
    component: Landing_pageComponent,
    //redirectTo: '',
    //pathMatch: 'full',
    children: [
      {
        path: 'subcategory/:string',
        loadChildren: () => import('./pages/subcategory/subcategory.modules').then(m => m.SubcategoryModule),
        data: {showproduct: true}
      },
      {
        path: 'subcategory/:id',
        loadChildren: () => import('./pages/subcategory/subcategory.modules').then(m => m.SubcategoryModule),
        data: {showproduct: true}
      },
    ]
  },
  // { path: 'Subcategory/:string', component: SubcategoryComponent, data: {category: "/Cool", name: "Cool",showproduct: false} },
  { path: 'login', component: BasicLoginComponent, data: {showproduct: false} },
  // {
  //   path: 'login',
  //   loadChildren: () => import('./pages/auth/login/basic-login/basic-login.module').then(m => m.BasicLoginModule)
  // },

  {
    path: '',
    component: AdminComponent,
    children: [
      // {
      //   path: '',
      //   redirectTo: 'login',
      //   pathMatch: 'full'
      // },
      // {
      //   path: 'login',
      //   loadChildren: () => import('./pages/auth/login/basic-login/basic-login.module').then(m => m.BasicLoginModule)
      // },

      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard-default/dashboard-default.module').then(m => m.DashboardDefaultModule)
      },

      {
        path: 'master',
        loadChildren: () => import('./pages/item-master/item-master.module').then(m => m.ItemMasterModule)
      },

      {
        path: 'basic',
        loadChildren: () => import('./pages/ui-elements/basic/basic.module').then(m => m.BasicModule)
      },

      {
        path: 'notifications',
        loadChildren: () => import('./pages/ui-elements/advance/notifications/notifications.module').then(m => m.NotificationsModule)
      },
      {
        path: 'bootstrap-table',
        loadChildren: () => import('./pages/ui-elements/tables/bootstrap-table/basic-bootstrap/basic-bootstrap.module').then(m => m.BasicBootstrapModule),
      },
      // {
      //   path: 'map',
      //   loadChildren: () => import('./pages/map/google-map/google-map.module').then(m => m.GoogleMapModule),
      // },

      {
        path: 'user',
        loadChildren: () => import('./pages/user/profile/profile.module').then(m => m.ProfileModule)
      }, {
        path: 'simple-page',
        loadChildren: () => import('./pages/simple-page/simple-page.module').then(m => m.SimplePageModule)
      }
    ]
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
      }
    ]
  }

  // {
  //   path: '',
  //   redirectTo: 'dashboard',
  //   pathMatch: 'full'
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
