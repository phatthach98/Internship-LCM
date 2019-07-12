import { Component, OnInit } from '@angular/core';
import {Router, NavigationExtras} from '@angular/router';
import { IPatient } from 'src/app/IPatient';
@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.page.html',
  styleUrls: ['./patient-detail.page.scss'],
})
export class PatientDetailPage implements OnInit {
  patient: IPatient;
  constructor(private router: Router) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.patient = this.router.getCurrentNavigation().extras.state.p;
    }
  }

  public goMaternitySummary(patient: IPatient) {
    const navigationExtras: NavigationExtras = {
      state: {
        p: patient,
      },
    };
    this.router.navigate(['maternity-summary'], navigationExtras);
  }

  ngOnInit() {
    console.log('Patient Detail Init');
  }

}
