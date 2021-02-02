import { SubcategoryComponent } from './subcategory.component';
import { SubcategoryRoutingModule } from './subcategory.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
// import { JwPaginationModule } from 'jw-angular-pagination';

@NgModule({
  imports: [
    CommonModule,
    SubcategoryRoutingModule,
    FormsModule,
    HttpClientModule,
    // JwPaginationModule
  ],
  declarations: [SubcategoryComponent]
})
export class SubcategoryModule { }
