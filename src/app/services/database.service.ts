import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
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
    return this.database.executeSql('SELECT * FROM patients',[]).then( (data) => {
      let patients: IPatient[] = [];
      for (let index = 0; index < data.rows.length; index++) {
        const item = {
          pasID: data.rows.item(index).id,
          firstName: data.rows.item(index).firstName,
          lastName: data.rows.item(index).lastName,
          gender: data.rows.item(index).gender,
          age: data.rows.item(index).age,
          nhsNumber: data.rows.item(index).NHS,
        };
        patients.push(item);
      }
      this.localPatient.next(patients);
    }).catch((err) => {
      console.log('error: ' + err);
    });
  }

  addLocalPatient(patients: IPatient[]) {
    patients.forEach((patient) => {
      const temp = [ patient.pasID, patient.firstName, patient.lastName, patient.gender, patient.age , patient.nhsNumber ];
      console.log(temp);
      this.database.executeSql('INSERT INTO patients (id, firstName, lastName, gender, age, NHS) VALUES (?, ?, ?, ?, ?, ?)', temp);
    });
    console.log('Sync OK');
  }

  getLocalPatient(): Observable<IPatient[]> {
    return this.localPatient.asObservable();
  }
}
