import { SubcategoryComponent } from './subcategory.component';
import { SubcategoryRoutingModule } from './subcategory.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
// import { JwPaginationModule } from 'jw-angular-pagination';
// import { IonRangeSliderModule } from "ng2-ion-range-slider";
@NgModule({
  imports: [
    // IonRangeSliderModule,
    CommonModule,
    SubcategoryRoutingModule,
    FormsModule,
    HttpClientModule,
    // JwPaginationModule

  ],
  declarations: [SubcategoryComponent]
})
export class SubcategoryModule { }
