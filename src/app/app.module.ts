import { LayoutclientComponent } from './clientside/landing_page/layoutclient/layoutclient.component';
import { Landing_pageComponent } from './clientside/landing_page/landing_page/landing_page.component';

import { SubcategoryComponent } from './clientside/clientpages/subcategory/subcategory.component';
import { ProductComponent } from './clientside/landing_page/product/product.component';
import { FooterComponent } from './clientside/landing_page/footer/footer.component';
import { HeaderComponent } from './clientside/landing_page/header/header.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgSelect2Module } from 'ng-select2';
import { BasicLoginComponent } from './pages/auth/login/basic-login/basic-login.component';
import { BrowserModule } from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AdminComponent } from './layout/admin/admin.component';
import { BreadcrumbsComponent } from './layout/admin/breadcrumbs/breadcrumbs.component';
import { TitleComponent } from './layout/admin/title/title.component';
import { AuthComponent } from './layout/auth/auth.component';
import {SharedModule} from './shared/shared.module';
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
    LayoutclientComponent
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
