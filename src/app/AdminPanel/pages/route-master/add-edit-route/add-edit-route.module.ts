import { AddEditRouteRoutingModule } from './add-edit-route-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditRouteComponent } from './add-edit-route.component';

import {SharedModule} from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NgSelect2Module } from 'ng-select2';
import { NgSelectModule } from '@ng-select/ng-select';
// import { AgmCoreModule } from '@agm/core';
// import { AgmDirectionModule } from 'agm-direction';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgSelect2Module,
    AddEditRouteRoutingModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyD-yJIdiq5H2FTsCKsjbyS46UGGdwHL9Fc'
    // }),
    // AgmDirectionModule
  ],
  declarations: [AddEditRouteComponent]
})
export class AddEditRouteModule { }
