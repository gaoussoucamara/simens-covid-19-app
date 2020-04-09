import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformerPageRoutingModule } from './informer-routing.module';

import { InformerPage } from './informer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformerPageRoutingModule
  ],
  declarations: [InformerPage]
})
export class InformerPageModule {}
