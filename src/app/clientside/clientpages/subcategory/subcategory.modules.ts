import { SubcategoryComponent } from './subcategory.component';
import { SubcategoryRoutingModule } from './subcategory.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
// import { Ng5SliderModule } from 'ng5-slider';
import { Ng5SliderModule } from 'ng5-slider';


@NgModule({
  imports: [

    CommonModule,
    SubcategoryRoutingModule,

    FormsModule,
    HttpClientModule,
    Ng5SliderModule

  ],
  declarations: [SubcategoryComponent]
})
export class SubcategoryModule { }
