import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
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


  ngOnInit() { }

}
