import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'analyse',
    loadChildren: () => import('./Modal/analyse/analyse.module').then( m => m.AnalysePageModule)
  },
  {
    path: 'signaler',
    loadChildren: () => import('./signaler/signaler.module').then( m => m.SignalerPageModule)
  },
  {
    path: 'informer',
    loadChildren: () => import('./informer/informer.module').then( m => m.InformerPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
