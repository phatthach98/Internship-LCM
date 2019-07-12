import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MaternitySummaryComponent } from './maternity-summary/maternity-summary.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
const routes: Routes = [
  {
    path: 'maternity-summary',
    component: MaternitySummaryComponent
  },
  {
    path: '',
    component: MaternitySummaryComponent
  }
];
@NgModule({
  declarations: [MaternitySummaryComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule
  ],
})
export class HealthCareModule { }
