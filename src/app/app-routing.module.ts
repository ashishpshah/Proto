import { ProductComponent } from './clientside/landing_page/product/product.component';
import { AppComponent } from './app.component';
import { SubcategoryModule } from './clientside/clientpages/subcategory/subcategory.modules';
import { Landing_pageComponent } from './clientside/landing_page/landing_page/landing_page.component';
import { BasicLoginComponent } from './AdminPanel/pages/auth/login/basic-login/basic-login.component';
import { SubcategoryComponent } from './clientside/clientpages/subcategory/subcategory.component';
import { BasicLoginModule } from './AdminPanel/pages/auth/login/basic-login/basic-login.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './AdminPanel/layout/admin/admin.component';
import {AuthComponent} from './AdminPanel/layout/auth/auth.component';
import { LayoutclientComponent } from './clientside/landing_page/layoutclient/layoutclient.component';


const routes: Routes = [
  {
    path: '',
    component: Landing_pageComponent,
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutclientComponent,
    //redirectTo: '',
    //pathMatch: 'full',
    children: [
      {
        path: 'subcategory/:string',
        loadChildren: () => import('./clientside/clientpages/subcategory/subcategory.modules').then(m => m.SubcategoryModule),
      },
    ],
  },
  {
    path: 'login',
    loadChildren: () => import('./AdminPanel/pages/auth/login/basic-login/basic-login.module').then(m => m.BasicLoginModule),
  },
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
        loadChildren: () => import('./AdminPanel/pages/dashboard/dashboard-default/dashboard-default.module').then(m => m.DashboardDefaultModule)
      },

      {
        path: 'master',
        loadChildren: () => import('./AdminPanel/pages/item-master/item-master.module').then(m => m.ItemMasterModule)
      },

      {
        path: 'basic',
        loadChildren: () => import('./AdminPanel/pages/ui-elements/basic/basic.module').then(m => m.BasicModule)
      },

      {
        path: 'notifications',
        loadChildren: () => import('./AdminPanel/pages/ui-elements/advance/notifications/notifications.module').then(m => m.NotificationsModule)
      },
      {
        path: 'bootstrap-table',
        loadChildren: () => import('./AdminPanel/pages/ui-elements/tables/bootstrap-table/basic-bootstrap/basic-bootstrap.module').then(m => m.BasicBootstrapModule),
      },
      // {
      //   path: 'map',
      //   loadChildren: () => import('./pages/map/google-map/google-map.module').then(m => m.GoogleMapModule),
      // },

      {
        path: 'user',
        loadChildren: () => import('./AdminPanel/pages/user/profile/profile.module').then(m => m.ProfileModule)
      }, {
        path: 'simple-page',
        loadChildren: () => import('./AdminPanel/pages/simple-page/simple-page.module').then(m => m.SimplePageModule)
      }
    ]
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () => import('./AdminPanel/pages/auth/auth.module').then(m => m.AuthModule)
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
