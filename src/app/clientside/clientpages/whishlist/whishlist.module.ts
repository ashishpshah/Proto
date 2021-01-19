import { WhishlistRoutes } from './whishlist.routing';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { WhishlistComponent } from './whishlist.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    WhishlistRoutes
  ],
  declarations: [WhishlistComponent]
})
export class WhishlistModule { }
