import { Component } from '@angular/core';

import { Platform, MenuController, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { UserService } from './api/user.service';
import { AnalysePage } from './Modal/analyse/analyse.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private  menuCrtl: MenuController,
    private userService: UserService,
    private modalCtrl: ModalController,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  Goto(href: string) {
    this.menuCrtl.close();
    this.router.navigateByUrl(href);
  }

  logout() {
    this.menuCrtl.close();
    this.userService.setSession('connectionActive', 0);
    this.router.navigateByUrl('auth');
  }

  /** Pour ouvrir le menu */
  openMenu() {
    this.menuCrtl.toggle();
  }

  /** Pour fermet le menu */
  closeMenu() {
    this.menuCrtl.close();
  }

  Informations() {
    this.menuCrtl.close();
    this.router.navigateByUrl('informer');
  }

  async InfosCovid19() {

    const modal = await this.modalCtrl.create({
      component: AnalysePage,

      componentProps: {
        infoEnvoie: null,
        infoPage: 0,
      }
    });

    modal.onWillDismiss().then(dataReturned => {
      // trigger when about to close the modal
    });

    return await modal.present();
  }
}
