import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { flatMap, catchError } from 'rxjs/operators';


@Injectable()
export class PatientService {
  constructor(private httpClient: HttpClient) {}

  getPatientList(CPOid: string, token: string): Observable<any> {
    const url = `https://azlor007.dxchealthlab.io/LMHIAService/api/v1/ReferredCareProvider/${CPOid}/PatientsReferred`;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization : `Bearer ${token}`,
        Accept : 'application/json',
        'Content-Type' : 'application/json',
        'Authorization-Type' : 'Native'
      })
    };
    return this.httpClient.get(url, httpOptions).pipe(
      flatMap( (res: Response) => {
        console.log('Connect to PatientList API successfully');
        return Object.values(res)[0]; // return list Patient
      }),
      catchError( (err) => {
        return this.handleError(err.status, 'PatienList');
      })
    );
  }

  getPatientDetial(id: string, token: string): Observable<any> {
    const url = `https://azlor007.dxchealthlab.io/LMHIAService/api/v4/Patient/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        Accept: 'application/json+fhir',
        'Content-Type': 'application/json+fhir',
      })
    };
    return this.httpClient.get(url, httpOptions).pipe(
      catchError( (err) => {
       return this.handleError(err.status, 'PatientDetail');
      })
    );
  }

  handleError(status: number, place: string) {
    if (status === 401) {
      return throwError(`401 - Authencation Error in ${place} API`);
    } else if (status === 400) {
      return throwError(`400 - Connect is bad in ${place} API`);
    } else if ( status >= 500) {
      return throwError(`5xx - Server errors in ${place} API`);
    } else {
      return throwError(`${status} - General Error in ${place} API`);
    }
  }
}
