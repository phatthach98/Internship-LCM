import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { IPatient } from '../IPatient';
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  localPatient = new BehaviorSubject([]);
  database: SQLiteObject;
  constructor(private plf: Platform, private sqlite: SQLite) {
    this.plf.ready().then( () => {
      return this.sqlite.create({
        name: 'patients.db',
        location: 'default',
      }).then( (db: SQLiteObject) => {
        this.database = db;
        console.log(this.database);
        this.loadLocalPatient();
      }).catch( (err) => {
        console.log('ERROR CREATE DB: ' + err);
      })
    })
  }

  loadLocalPatient() {
    console.log('Start Load Patient');
    return this.database.executeSql('SELECT * FROM patients', []).then( (data) => {
      const patients: IPatient[] = [];
      for (let index = 0; index < data.rows.length; index++) {
        const item = {
          pasID: data.rows.item(index).id,
          firstName: data.rows.item(index).firstName,
          lastName: data.rows.item(index).lastName,
          gender: data.rows.item(index).gender,
          age: data.rows.item(index).age,
          nhsNumber: data.rows.item(index).NHS,
          birthDate: data.rows.item(index).birthDate,
          address: {
            use: data.rows.item(index).use,
            line: data.rows.item(index).line,
            country: data.rows.item(index).country,
          }
        };
        console.log(item);
        patients.push(item);
      }
      this.localPatient.next(patients);
    }).catch((err) => {
      console.log('error: ' + err);
    });
  }

  addLocalPatient(patients: IPatient[]) {
    patients.forEach((patient) => {
      const temp = [ patient.pasID, patient.firstName, patient.lastName, patient.gender, patient.age , patient.nhsNumber,
      patient.birthDate, patient.address.use, patient.address.line, patient.address.country ];
      console.log(temp);
      this.database.executeSql('INSERT INTO patients (id, firstName, lastName, gender, age, NHS, birthDate, use, line, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', temp);
    });
    console.log('Sync OK');
  }

  getLocalPatient(): Observable<IPatient[]> {
    return this.localPatient.asObservable();
  }
}
