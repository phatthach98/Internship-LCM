import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: LoginComponent}
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    FormsModule,
    IonicModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class LoginModule { }
