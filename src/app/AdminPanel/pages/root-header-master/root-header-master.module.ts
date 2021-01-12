import { RootHeaderMasterRoutingModule } from './root-header-master-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootHeaderMasterComponent } from './root-header-master.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RootHeaderMasterRoutingModule,
    SharedModule,

  ],
  declarations: [RootHeaderMasterComponent]
})
export class RootHeaderMasterModule { }
