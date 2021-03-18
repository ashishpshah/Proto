import { VehicleRouteTimeMapModule } from './AdminPanel/pages/vehicle-route-time-map/vehicle-route-time-map.module';
import { RouteTimeModule } from './AdminPanel/pages/route-time-mgmt/route-time-mgmt.module';
import { typeMasterModule } from './AdminPanel/pages/type-master/type-master.module';
import { CheckoutComponent } from './clientside/clientpages/checkout/checkout.component';
import { WhishlistComponent } from './clientside/clientpages/whishlist/whishlist.component';
import { CheckpincodeComponent } from './clientside/clientpages/checkpincode/checkpincode.component';
import { CheckpincodeRoutes } from './clientside/clientpages/checkpincode/checkpincode.routing';
import { Login_clientModule } from './clientside/clientpages/login_client/login_client.modules';
import { Login_clientComponent } from './clientside/clientpages/login_client/login_client.component';
import { LayoutclientComponent } from './clientside/clientpages/landing_page/layoutclient/layoutclient.component';
import { Landing_pageComponent } from './clientside/clientpages/Main_landing_page/landing_page.component';
import { ProductComponent } from './clientside/clientpages/landing_page/product/product.component';
import { AppComponent } from './app.component';
import { SubcategoryModule } from './clientside/clientpages/subcategory/subcategory.modules';
import { BasicLoginComponent } from './AdminPanel/pages/auth/login/basic-login/basic-login.component';
import { SubcategoryComponent } from './clientside/clientpages/subcategory/subcategory.component';
import { BasicLoginModule } from './AdminPanel/pages/auth/login/basic-login/basic-login.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './AdminPanel/layout/admin/admin.component';
import {AuthComponent} from './AdminPanel/layout/auth/auth.component';
import { ShoppingcartComponent } from './clientside/clientpages/shoppingcart/shoppingcart.component';

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
      {
        path: 'custlogin',

        loadChildren: () => import('./clientside/clientpages/login_client/login_client.modules').then(m => m.Login_clientModule),
      },
      {
        path: 'checkoutlogin',
        loadChildren: () => import('./clientside/clientpages/login_client/login_client.modules').then(m => m.Login_clientModule),
      },
      {
        path: 'create-user',
        component: CheckpincodeComponent,
        //loadChildren: () => import('./clientside/clientpages/checkpincode/checkpincode.module').then(m => m.CheckpincodeModule),
      },
      {
        path: 'shoppingcart',
        component: ShoppingcartComponent,
      },
      {
        path: 'whishlist',
        component: WhishlistComponent,
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
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
        path: 'master',
         loadChildren: () => import('./AdminPanel/pages/root-header-master/root-header-master.module').then(m => m.RootHeaderMasterModule)
      },
      {
        path: 'master',
         loadChildren: () => import('./AdminPanel/pages/root-category-master/root-category-master.module').then(m => m.RootCategoryMasterModule)
      },
      {
        path: 'master',
         loadChildren: () => import('./AdminPanel/pages/category-master/category-master.module').then(m => m.CategoryMasterModule)
      },
      {
        path: 'master',
         loadChildren: () => import('./AdminPanel/pages/sub-category-master/sub-category-master.module').then(m => m.SubCategoryMasterModule)
      },
      {
        path: 'master',
         loadChildren: () => import('./AdminPanel/pages/country-master/country-master.module').then(m => m.CountryMasterModule)


      },
      // {
      //   path: 'master/country-master',
      //   loadChildren: () => import('./AdminPanel/pages/country-master/country-master.module').then(m => m.CountryMasterModule)
      //  },
      {
        path: 'master',
         loadChildren: () => import('./AdminPanel/pages/state-master/state-master.module').then(m => m.StateMasterModule)
      },

      {
        path: 'master',
         loadChildren: () => import('./AdminPanel/pages/city-master/city-master.module').then(m => m.CityMasterModule)
      },
      {
        path: 'master',
         loadChildren: () => import('./AdminPanel/pages/street-master/street-master.module').then(m => m.StreetMasterModule)
      },
      {
        path: 'master',
         loadChildren: () => import('./AdminPanel/pages/route-master/route-master.module').then(m => m.RouteMasterModule)

      },
      {
        path: 'master',
         loadChildren: () => import('./AdminPanel/pages/department-master/department-master.module').then(m => m.DepartmentMasterModule)

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
      },
      {
        path: 'master',
         loadChildren: () => import('./AdminPanel/pages/brand-master/brand-master.module').then(m => m.brandMasterModule)


      },
      {
        path: 'master',
         loadChildren: () => import('./AdminPanel/pages/type-master/type-master.module').then(m => m.typeMasterModule)


      },
      {
        path: 'master',
         loadChildren: () => import('./AdminPanel/pages/vehicle-master/vehicle-master.module').then(m => m.VehicleMasterModule)

      },
      {
        path: 'master',
         loadChildren: () => import('./AdminPanel/pages/pincode-master/pincode-master.module').then(m => m.PincodeMasterModule)

      },
      {
        path: 'master',
         loadChildren: () => import('./AdminPanel/pages/vehicle-route-master/vehicle-route-master.module').then(m => m.VehicleRouteMasterModule)

      },
       {
        path: 'master',
         loadChildren: () => import('./AdminPanel/pages/driver-master/driver-master.module').then(m => m.DriverMasterModule)
      },
      {
        path: 'master',
         loadChildren: () => import('./AdminPanel/pages/route-time-mgmt/route-time-mgmt.module').then(m => m.RouteTimeModule)
      },
      {
        path: 'master',
         loadChildren: () => import('./AdminPanel/pages/vehicle-route-time-detail/vehicle-route-time-detail.module').then(m => m.VehicleRouteTimeDetailModule)
      },
      {
        path: 'master',
         loadChildren: () => import('./AdminPanel/pages/vehicle-route-time-map/vehicle-route-time-map.module').then(m => m.VehicleRouteTimeMapModule)
      },
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
