import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthhGuard implements CanActivate  {
  constructor(private authen: AuthenticationService) {}

  canActivate(): boolean {
    return this.authen.isAuthenticated();
  }
}
