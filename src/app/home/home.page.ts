import { Component } from '@angular/core';
import { NavController, Platform, AlertController, ModalController } from '@ionic/angular';
import { UserService } from '../api/user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { AnalysePage } from '../Modal/analyse/analyse.page';

import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';


// Declare jquery
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  public userDetails: any = [];
  public errorMessage = String;
  nbPatient: any;
  connectivite: any;
  scheduled: any = [];

  locationCoords: any;
  timetest: any;

  // Geocoder configuration
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  constructor(public navCtrl: NavController,
              public userService: UserService,
              public alertCtrl: AlertController,
              public platform: Platform,
              private router: Router,
              public http: HttpClient,
              private localNotifications: LocalNotifications,
              private modalCtrl: ModalController,

              private androidPermissions: AndroidPermissions,
              private geolocation: Geolocation,
              private locationAccuracy: LocationAccuracy,
              private nativeGeocoder: NativeGeocoder,
  ) {

    /*
    this.platform.ready().then(() => {

      this.localNotifications.on('click').subscribe(res => {
        console.log('click: ',	res);
        const msg = res.data ? res.data.mydata : '';
        this.showAlert(res.title, res.text, msg);
      });

      this.localNotifications.on('trigger').subscribe(res => {
        console.log('trigger: ', res);
        const msg = res.data ? res.data.mydata : '';
        this.showAlert(res.title, res.text, msg);
      });

      this.localNotifications.schedule([
        {
          id: 1,
          title: 'CORONA-NEWS',
          text: 'Nouveaux cas de COVID-19',
          // tslint:disable-next-line:no-string-literal
          data: { mydata:  '1' },
          trigger: {in: 5, unit : ELocalNotificationTriggerUnit.SECOND}
        },
        {
          id: 40,
          title: 'CORONA-NEWS',
          text: 'Nouveaux cas de COVID-19',
          // tslint:disable-next-line:no-string-literal
          data: { mydata: '42' },
          trigger: { every: { hour: 10, minute: 30 }, count: 1}
        },
        {
          id: 43,
          title: 'CORONA-NEWS',
          text: 'Nouveaux cas de COVID-19',
          // tslint:disable-next-line:no-string-literal
          data: { mydata: '43' },
          trigger: { every: { hour: 17, minute: 1 }, count: 1}
        },
        {
          id: 45,
          title: 'CORONA-NEWS',
          text: 'Nouveaux cas de COVID-19',
          // tslint:disable-next-line:no-string-literal
          data: { mydata: '42' },
          trigger: { every: { hour: 20, minute: 1 }, count: 1}
        },
        {
          id: 46,
          title: 'CORONA-NEWS',
          text: 'Nouveaux cas de COVID-19',
          // tslint:disable-next-line:no-string-literal
          data: { mydata: '42' },
          trigger: { every: { hour: 22, minute: 31 }, count: 1}
        }
      ]);

    });
    */

    // GESTION DES GEOLOCALISATION
    this.locationCoords = {
      latitude: '',
      longitude: '',
      accuracy: '',
      timestamp: '',
      geoAddress: '',
    };
    this.timetest = Date.now();
  }

  /**
   * GESTION DE LA GEOLOCALISATION
   */

   // Check if application having GPS access permission
  checkGPSPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {

          //  If having permission show 'Turn On GPS' dialogue
          this.askToTurnOnGPS();
        } else {

          //  If not having permission ask for permission
          this.requestGPSPermission();
        }
      },
      err => {
        alert(err);
      }
    );
  }

  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log('4');
      } else {
        //  Show 'GPS Permission Request' dialogue
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              // call method to turn on GPS
              this.askToTurnOnGPS();
            },
            error => {
              //  Show alert if user click on 'No Thanks'
              alert('requestPermission Error requesting location permissions ' + error);
            }
          );
      }
    });
  }

  askToTurnOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        // When GPS Turned ON call method to get Accurate location coordinates
        this.getLocationCoordinates();
      },
      error => alert('Error requesting location permissions ' + JSON.stringify(error))
    );
  }

  // Methos to get device accurate coordinates using device GPS
  getLocationCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.locationCoords.latitude = resp.coords.latitude;
      this.locationCoords.longitude = resp.coords.longitude;
      this.locationCoords.accuracy = resp.coords.accuracy;
      this.locationCoords.timestamp = resp.timestamp;
      this.getGeoencoder(this.locationCoords.latitude, this.locationCoords.longitude);
    }).catch((error) => {
      alert('Error getting location' + error);
    });
  }





  // geocoder method to fetch address from coordinates passed as arguments
  getGeoencoder(latitude: number, longitude: number) {
    this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
    .then((result: NativeGeocoderResult []) => {
      this.locationCoords.geoAddress = this.generateAddress(result[0]);
    })
    .catch((error: any) => {
      alert('Error getting location' + JSON.stringify(error));
    });
  }

  // Return Comma saperated address
  generateAddress(addressObj: { [x: string]: any; }) {
    const obj = [];
    let address = '';
    // tslint:disable-next-line:forin
    for (const key in addressObj) {
      obj.push(addressObj[key]);
    }
    obj.reverse();
    for (const val in obj) {
      if (obj[val].length) {
      address += obj[val] + ', ';
      }
    }
    return address.slice(0, -2);
  }


  /**
   * FIN DE LA GESTION DE LA GEOLOCALISATION
   * FIN DE LA GESTION DE LA GEOLOCALISATION
   * FIN DE LA GESTION DE LA GEOLOCALISATION
   */


  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    /*this.openModal();*/
  }

  /**
   * Affichage sous un pop-up
   */
  showAlert(header: any, sub: any, msg: any) {

    /*
    this.alertCtrl.create({
      // tslint:disable-next-line:object-literal-shorthand
      header: header,
      subHeader: sub,
      message: msg,
      buttons: ['Ok']
    }).then(alert => alert.present());
    */

    this.openModal();
  }



  async openModal() {
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


  autoSignalisation() {
    this.router.navigateByUrl('signaler');
  }


}
