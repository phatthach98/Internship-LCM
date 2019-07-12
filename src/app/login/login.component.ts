import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  err: string;
  userName: string;
  pwd: string;
  account = [
    {user: 'admin', pwd: '123'},
    {user: 'admin1', pwd: '123'},
    {user: 'admin2', pwd: '123'},
    {user: 'admin3', pwd: '123'},
    {user: 'admin4', pwd: '123'},
  ];
  constructor(private navController: NavController, private menu: MenuController) {}

  ngOnInit() {}

  logIn() {
    const isLogIn = this.account.find(item => { return ( item.user == this.userName && item.pwd == this.pwd ) });
    if (isLogIn) {
      this.navController.navigateForward('patient-list');
    } else {
      this.err = 'Please Re-Enter your Account';
    }
  }

}
