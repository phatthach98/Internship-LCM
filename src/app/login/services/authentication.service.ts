import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authencationState = new BehaviorSubject(false);

  constructor() { }

  login() {
    this.authencationState.next(true);
  }

  logout() {
    this.authencationState.next(false);
  }

  isAuthenticated(): boolean {
    return this.authencationState.value;
  }

  get getAuthencationState() {
    return this.authencationState;
  }
  
}
