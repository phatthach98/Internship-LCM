import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { PatientListPage } from './patient-list/patient-list.page';
import { PatientDetailPage } from './patient-detail/patient-detail.page';
import { PatientService } from '../api/patient.service';


const routes: Routes = [
  {
    path: 'patient-list',
    component: PatientListPage
  },
  {
    path: 'patient-detail',
    component: PatientDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PatientListPage, PatientDetailPage],
  providers: [PatientService]

})
export class HomePageModule {}
