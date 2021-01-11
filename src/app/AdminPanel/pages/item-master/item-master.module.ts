import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemMasterRoutingModule } from './item-master-routing.module';
import { ItemMasterComponent } from './item-master.component';
import {SharedModule} from '../../shared/shared.module';
import { EditItemComponent } from './edit-item/edit-item.component';

@NgModule({
  declarations: [ItemMasterComponent, EditItemComponent],
  imports: [
    CommonModule,
    ItemMasterRoutingModule,
    SharedModule
  ],
})
export class ItemMasterModule { }
