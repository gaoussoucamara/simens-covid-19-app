import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformerPage } from './informer.page';

const routes: Routes = [
  {
    path: '',
    component: InformerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformerPageRoutingModule {}
