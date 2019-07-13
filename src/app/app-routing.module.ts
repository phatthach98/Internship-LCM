import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthhGuard } from './login/guards/authh.guard';

const routes: Routes = [
  { path: '', redirectTo: 'health-care', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule',},
  { path: 'login', loadChildren: './login/login.module#LoginModule'},
  { path: 'health-care', loadChildren: './health-care/health-care.module#HealthCareModule'}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
