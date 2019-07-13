import { Component } from '@angular/core';

import { Platform, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, NavigationStart, Event, NavigationEnd, NavigationError } from '@angular/router';
import { AuthenticationService } from './login/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authenService: AuthenticationService,
    private router: Router,
    private loadingControl: LoadingController
  ) {
    this.initializeApp();
    this.detectRouting();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    // this.authenService.getAuthencationState.subscribe( state =>
    // { if (state) {
    //     this.router.navigate(['home']);
    //   } else {
    //     this.router.navigate(['login']);
    //   }
    // });
  }

  detectRouting() {
    const loader = this.loadingControl.create( {
      message: 'Please wait...',
    });
    this.router.events.subscribe( (event: Event) => {
      if ( event instanceof NavigationStart) {
        loader.then((overlay) => {
          overlay.present();
        });
      }

      if ( event instanceof NavigationEnd) {
        loader.then((overlay) => {
          overlay.dismiss();
        });
      }
      if ( event instanceof NavigationError) {
      }
    });
  }




}
