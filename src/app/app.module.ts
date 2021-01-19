import { CheckoutComponent } from './clientside/clientpages/checkout/checkout.component';
import { ProductDirective } from './clientside/clientpages/landing_page/product/product.directive';
import { Login_clientComponent } from './clientside/clientpages/login_client/login_client.component';
import { LayoutclientComponent } from './clientside/clientpages/landing_page/layoutclient/layoutclient.component';
import { Landing_pageComponent } from './clientside/clientpages/Main_landing_page/landing_page.component';
import { HeaderComponent } from './clientside/clientpages/landing_page/header/header.component';
import { FooterComponent } from './clientside/clientpages/landing_page/footer/footer.component';
import { ProductComponent } from './clientside/clientpages/landing_page/product/product.component';
import { SubcategoryComponent } from './clientside/clientpages/subcategory/subcategory.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgSelect2Module } from 'ng-select2';
import { BasicLoginComponent } from './AdminPanel/pages/auth/login/basic-login/basic-login.component';
import { BrowserModule } from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './AdminPanel/layout/admin/admin.component';
import { BreadcrumbsComponent } from './AdminPanel/layout/admin/breadcrumbs/breadcrumbs.component';
import { TitleComponent } from './AdminPanel/layout/admin/title/title.component';
import { AuthComponent } from './AdminPanel/layout/auth/auth.component';
import {SharedModule} from './AdminPanel/shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
// import { AddEditItemComponent } from './pages/item-master/add-edit-item/add-edit-item.component';
// import { ItemListComponent } from './pages/item-master/item-list/item-list.component';
// import { ItemListComponent } from './pages/item-master/item-list/item-list.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import {NgxDataTableModule} from "angular-9-datatable";

import {TableModule} from 'primeng/table';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {DialogModule} from 'primeng/dialog';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {InputTextModule} from 'primeng/inputtext';
import {ProgressBarModule} from 'primeng/progressbar';
import {DropdownModule} from 'primeng/dropdown';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { CheckpincodeComponent } from './clientside/clientpages/checkpincode/checkpincode.component';
import { ShoppingcartComponent } from './clientside/clientpages/shoppingcart/shoppingcart.component';
import { WhishlistComponent } from './clientside/clientpages/whishlist/whishlist.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    BreadcrumbsComponent,
    TitleComponent,
    AuthComponent,
    HeaderComponent,
    FooterComponent,
    ProductComponent,
    Landing_pageComponent,
    LayoutclientComponent,
    CheckpincodeComponent,
    ShoppingcartComponent,
    ProductDirective,
    WhishlistComponent,
    CheckoutComponent
    // ItemListComponent,
    // AddEditItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelect2Module,
    NgSelectModule,
    NgxDataTableModule,

    TableModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    DropdownModule,
    AutocompleteLibModule

    // ,RouterModule.forRoot([
    //   { path: '', component: BasicLoginComponent, pathMatch: 'full' }
    //   // { path: 'counter', component: CounterComponent },
    //   // { path: 'fetch-data', component: FetchDataComponent },
    //   // { path: 'fetchemployee', component: FetchemployeeComponent },
    //   // { path: 'add-edit-item', component: AddEditItemComponent },
    //   // { path: 'add-edit-item/edit/:id', component: AddEditItemComponent },
    // ])
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
