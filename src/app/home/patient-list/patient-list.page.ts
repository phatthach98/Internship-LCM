import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../api/patient.service';
import { NavigationExtras, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/login/services/authentication.service';
import { flatMap} from 'rxjs/operators';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertController } from '@ionic/angular';
import { IPatient } from '../../IPatient';
@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.page.html',
  styleUrls: ['./patient-list.page.scss'],
})

export class PatientListPage implements OnInit {
  patients: IPatient[] = [];
  PATIENTS: IPatient[] = [];
  msg: string ;
  loader: boolean;

  constructor(
    private apiPatient: PatientService,
    private router: Router,
    private authenService: AuthenticationService,
    private localDB: DatabaseService,
    private alertController: AlertController) {}

  ngOnInit() {
    this.getPatientList();
    console.log('init Patient: ' + this.patients);
  }

  ngOnchange() {
  }

  public getPatientList(): void {
    const token = 'nbzfmedhklwhggtflb3iflrm#636985095115378705';
    const CPOid = '600000273014';
    this.loader = true;
    this.apiPatient.getPatientList(CPOid, token).pipe(
      flatMap( (patient: any) => {  // Parameter is patient of Patients
        const id = patient.pasID;
        return this.apiPatient.getPatientDetial(id, token);
      })
    ).subscribe(
      (res) => {
        console.log('Connect to PatientList API successfully');
        const data: IPatient = {
          pasID: res.id,
          firstName: res.name[0].family,
          lastName: res.name[0].given[0],
          age: this.getAge(res.birthDate),
          gender: res.gender,
          nhsNumber: res.nhsNumber,
          birthDate: res.birthDate,
          address: {
             use: res.address[0].use,
            line: res.address[0].line[0],
            country: res.address[0].country,
          }
        };
        this.patients.push(data);
      },
      (err) => {
        console.log(err);
        this.confirmOfflineMode(err);
      },
      () => {
        this.PATIENTS  = this.patients;
        this.loader = false;
      },
    );
  }


  public getAge(dob: string): number {
    const today = new Date();
    const birthDay = new Date(dob);
    let year = today.getFullYear() - birthDay.getFullYear();
    if (birthDay.getMonth > today.getMonth) {
      return year;
    } else {
      return year--;
    }
  }

  public searchPatient(event: any) {
    const val = event.target.value;
    this.msg = '';
    if (val.trim() !== '') {
      this.patients = this.PATIENTS;
      this.patients = this.patients.filter(item => {
        return item.firstName.toLowerCase().indexOf(val.toLowerCase()) > -1
        || item.pasID.toLowerCase().indexOf(val.toLowerCase()) > -1 ;
      });
      if (this.patients.length === 0) {
        this.msg = 'No matching record found';
      }
    } else {
      this.patients = this.PATIENTS;
    }
  }

  public goDetail(patient: IPatient) {
    const navigationExtras: NavigationExtras = {
      state: {
        p: patient,
      },
    };
    this.router.navigate(['patient-detail'], navigationExtras);
  }

  public logOut() {
      this.authenService.logout();
      this.router.navigate(['login']);
  }

  public syncPatient() {
    console.log('SYNC start');
    this.localDB.addLocalPatient(this.PATIENTS);
  }

  async confirmLogout() {
    const alert = await this.alertController.create({
      header: 'Message from LCM ',
      message: 'Do you want to <strong>QUIT </strong> the app ?',
      buttons: [
       {
          text: 'OK',
          handler: () => {
            this.logOut();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }
      ],
      animated : true ,
    });

    alert.present();
  }

  async confirmSync() {
    const alert = await this.alertController.create({
      header: 'Message from LCM ',
      message: 'Do you want to <strong>SAVE </strong> data?',
      buttons: [
       {
          text: 'OK',
          handler: () => {
            this.syncPatient();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }
      ],
      animated: true,
    });

    alert.present();
  }

  async confirmOfflineMode(err) {
    const alert = await this.alertController.create({
      header: 'Message from LCM ',
      message: 'App is out of the Internet, <strong> Switch to Offline Mode ? </strong>',
      buttons: [
       {
          text: 'OK',
          handler: () => {
            this.localDB.getLocalPatient().subscribe( (data) => {
              console.log(data);
              this.patients = data;
            });
            this.loader = false;
            this.PATIENTS  = this.patients;
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.msg = err;
            this.loader = false;
          },
          cssClass: 'secondary',
        }
      ],
      animated: true,
    });

    alert.present();
  }
}


