import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { Router } from '@angular/router';

import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { AlertController } from '@ionic/angular';


// Declare jquery
declare var $: any;

@Component({
  selector: 'app-signaler',
  templateUrl: './signaler.page.html',
  styleUrls: ['./signaler.page.scss'],
})
export class SignalerPage implements OnInit {

  public detailsEtatCivil: any = [];
  public detailsSymptomes: any = [];
  public detailsAntecedents: any = [];
  public idpatient: any;

  locationCoords: any;
  timetest: any;

  // Geocoder configuration
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  constructor(
              public userService: UserService,
              private router: Router,
              public alertCtrl: AlertController,

              private androidPermissions: AndroidPermissions,
              private geolocation: Geolocation,
              private locationAccuracy: LocationAccuracy,
              private nativeGeocoder: NativeGeocoder,
    ) {
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

  ngOnInit() {
    // tslint:disable-next-line:only-arrow-functions
    $('#iconePrecedent').click(function() {
      // tslint:disable-next-line:only-arrow-functions
      $('#donneesSymptomes').fadeOut(function() {
        $('#donneesEtatCivil').fadeIn();
      });
    });

    // tslint:disable-next-line:only-arrow-functions
    $('#retourSymptomes').click(function() {
      // tslint:disable-next-line:only-arrow-functions
      $('#donneesAntecedents').fadeOut(function() {
        $('#donneesSymptomes').fadeIn();
      });
    });

    // tslint:disable-next-line:only-arrow-functions
    $('#retourAntecedent').click(function() {
      // tslint:disable-next-line:only-arrow-functions
      $('#confirmationEnvoie').fadeOut(function() {
        $('#donneesAntecedents').fadeIn();
      });
    });


  }

  sendEtatCivil(form: any) {
    const val = form.value;
    this.detailsEtatCivil = form.value;

    // alert($('#date_naissance').val().substring(0, 10));

    // tslint:disable-next-line:only-arrow-functions
    $('#donneesEtatCivil').fadeOut(function() {
      $('#donneesSymptomes').fadeIn();
    });
  }

  sendSymptomes() {
    // tslint:disable-next-line:only-arrow-functions
    $('#donneesSymptomes').fadeOut(function() {
      $('#donneesAntecedents').fadeIn();
    });
  }

  checkSymptomes(event: any, id: any) {
    const choix = event.detail.checked;

    if (choix) {
      this.detailsSymptomes [id] = 1;
    } else {
      this.detailsSymptomes [id] = '';
    }

    /*
    if (
        this.detailsSymptomes[1] === 1 &&
        this.detailsSymptomes[2] === 1
       ) {
      $('#buttonSendSymptomes').attr('disabled', false);
    } else {
      $('#buttonSendSymptomes').attr('disabled', true);
    }
    */

  }

  sendAntecedents() {
    // tslint:disable-next-line:only-arrow-functions
    $('#donneesAntecedents').fadeOut(function() {
      $('#confirmationEnvoie').fadeIn();
    });
  }

  checkAntecedents(event: any, id: any) {
    const choix = event.detail.checked;

    if (choix) {
      this.detailsAntecedents [id] = 1;
    } else {
      this.detailsAntecedents [id] = '';
    }

  }


  /**
   * Envoie des données au serveur
   */
  sendDonneesFinales() {

    /**
     * Affichage de l'icone du chargement des données dans la BD
     */
    $('#iconChargementInfosCovid19').toggle(true);

    /**
     * Données d'état-civil
     */
    let infosEtatCivil: any = '';
    for (let i = 1 ; i < 12 ; i++) {
      if ( $('.infoEC' + i).val() ) {
        if ( i === 4 ) { infosEtatCivil += $('#date_naissance').val().substring(0, 10) + '<@>'; } else {
          infosEtatCivil +=  $('.infoEC' + i).val() + '<@>';
        }
      } else {
        infosEtatCivil += '-1<@>';
      }
    }

    // alert(infosEtatCivil);

    let infosSymptomes: any = '';
    for (let i = 1 ; i < this.detailsSymptomes.length ; i++) {
      if ( this.detailsSymptomes[i] === 1 ) { infosSymptomes  += i + '<@>'; }
    }

    // alert(infosSymptomes);

    let infosAntecedents: any = [];
    for (let i = 1 ; i < this.detailsAntecedents.length ; i++) {
      if ( this.detailsAntecedents[i] === 1 ) { infosAntecedents += i + '<@>'; }
    }

    // Envoyer les demandes à valider
    this.userService.envoiDonneesAutoSignalement(infosEtatCivil, infosSymptomes, infosAntecedents).subscribe(value => {
      // console.dir(value.success);
      console.dir(value.data);
      this.idpatient = value.data;


      $('#iconChargementInfosCovid19').toggle(false);
      // tslint:disable-next-line:only-arrow-functions
      $('#confirmationEnvoie').fadeOut(function() {
         $('#confirmationEnvoieEffectif').fadeIn();
      });
    },
    (error: any) => {
      console.dir(error);
      $('#iconChargementInfosCovid19').toggle(false);
      alert('Désolé ! vérifier votre connexion internet !');
    });

  }


  pageAcceuil() {
    $('#iconChargementInfosCovid19_2').toggle(false);
    this.router.navigateByUrl('home');
  }




  selectDepartement(event: any) {
    const id = event.detail.value;
    let chaine = '';

    if ( id === '1' ) { chaine = '<ion-select-option value="1">DAKAR</ion-select-option><ion-select-option value="2">GUEDIAWAYE</ion-select-option><ion-select-option value="3">PIKINE</ion-select-option><ion-select-option value="4">RUFISQUE</ion-select-option>'; }
    if ( id === '2' ) { chaine = '<ion-select-option value="5">BAMBEY</ion-select-option><ion-select-option value="6">DIOURBEL</ion-select-option><ion-select-option value="7">MBACKE</ion-select-option>'; }
    if ( id === '3' ) { chaine = '<ion-select-option value="8">FATICK</ion-select-option><ion-select-option value="9">FOUNDIOUCK</ion-select-option><ion-select-option value="10">GOSSAS</ion-select-option>'; }
    if ( id === '4' ) { chaine = '<ion-select-option value="11">BIRKELANE</ion-select-option><ion-select-option value="12">KAFFRINE</ion-select-option><ion-select-option value="13">KOUNGHEUL</ion-select-option><ion-select-option value="14">MALEM HODDAR</ion-select-option>'; }
    if ( id === '5' ) { chaine = '<ion-select-option value="15">GUINGUINEO</ion-select-option><ion-select-option value="16">KAOLACK</ion-select-option><ion-select-option value="17">NIORO</ion-select-option>'; }
    if ( id === '6' ) { chaine = '<ion-select-option value="18">KEDOUGOU</ion-select-option><ion-select-option value="19">SALEMATA</ion-select-option><ion-select-option value="20">SARAYA</ion-select-option>'; }
    if ( id === '7' ) { chaine = '<ion-select-option value="21">KOLDA</ion-select-option><ion-select-option value="22">MEDINA YORO FOULAH</ion-select-option><ion-select-option value="23">VELINGARA</ion-select-option>'; }
    if ( id === '8' ) { chaine = '<ion-select-option value="24">KEBEMER</ion-select-option><ion-select-option value="25">LINGUERE</ion-select-option><ion-select-option value="26">LOUGA</ion-select-option>'; }
    if ( id === '9' ) { chaine = '<ion-select-option value="27">KANEL</ion-select-option><ion-select-option value="28">MATAM</ion-select-option><ion-select-option value="29">RANEROU</ion-select-option>'; }
    if ( id === '10' ) { chaine = '<ion-select-option value="30">DAGANA</ion-select-option><ion-select-option value="31">PODOR</ion-select-option><ion-select-option value="32">SAINT LOUIS</ion-select-option>'; }
    if ( id === '11' ) { chaine = '<ion-select-option value="33">BOUNKILING</ion-select-option><ion-select-option value="34">GOUDOMP</ion-select-option><ion-select-option value="35">SEDHIOU</ion-select-option>'; }
    if ( id === '12' ) { chaine = '<ion-select-option value="36">BAKEL</ion-select-option><ion-select-option value="37">GOUDIRY</ion-select-option><ion-select-option value="38">KOUPENTOUM</ion-select-option><ion-select-option value="39">TAMBACOUNDA</ion-select-option>'; }
    if ( id === '13' ) { chaine = '<ion-select-option value="40">MBOUR</ion-select-option><ion-select-option value="41">THIES</ion-select-option><ion-select-option value="42">TIVAOUANE</ion-select-option>'; }
    if ( id === '14' ) { chaine = '<ion-select-option value="43">BIGNONA</ion-select-option><ion-select-option value="44">OUSSOUYE</ion-select-option><ion-select-option value="45">ZIGUINCHOR</ion-select-option>'; }


    $('#departement').val('');
    $('#departement').html(chaine);
  }

  /**
   * Verifier si le tableau n'a aucun index avec une valeur
   */
  isEmptyWithIndex(obj: any) {
    for (const key in obj) {
      if (obj[key]) {
        return true;
       }
    }
    return false;
  }










  sendDonneesGeolocalisation(latitude: any, longitude: any, adresse: any) {

    this.userService.envoiDonneesGeolocAutoSignalement(latitude, longitude, adresse, this.idpatient).subscribe(value => {
      // console.dir(value.success);
      // console.dir(value.data);
    },
    (error: any) => {
      console.dir(error);
      $('#iconChargementInfosCovid19_2').toggle(false);
      alert('Désolé ! vérifier votre connexion internet !');
    });
  }


  enregistrementDonneesLocalisation() {

      setTimeout(() => {

        const latitude = this.locationCoords.latitude;
        const longitude = this.locationCoords.longitude;
        const adresse = this.locationCoords.geoAddress;

        this.sendDonneesGeolocalisation(latitude, longitude, adresse);

      }, 2000);

  }

  notificaationEnvoieAvecSucces() {
    this.alertCtrl.create({
      header: 'Envoi effectué !',
      message: 'Vos coordonnées sont envoyées avec succès',
      buttons: ['Ok']
    }).then(alert => alert.present());
  }

  /**
   * GESTION DE LA GEOLOCALISATION
   */

   // Check if application having GPS access permission
   checkGPSPermission() {
    $('#iconChargementInfosCovid19_2').toggle(true);
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
              // alert('requestPermission Error requesting location permissions ' + error);
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
      // error => alert('Error requesting location permissions ' + JSON.stringify(error))
    );
  }

  // Methos to get device accurate coordinates using device GPS
  getLocationCoordinates() {

    // Notification envoie données avec succès
    this.notificaationEnvoieAvecSucces();

    $('#iconChargementInfosCovid19_2').toggle(false);
    this.router.navigateByUrl('home');


    this.geolocation.getCurrentPosition().then((resp) => {
      this.locationCoords.latitude = resp.coords.latitude;
      this.locationCoords.longitude = resp.coords.longitude;
      this.locationCoords.accuracy = resp.coords.accuracy;
      this.locationCoords.timestamp = resp.timestamp;
      this.getGeoencoder(this.locationCoords.latitude, this.locationCoords.longitude);
      this.enregistrementDonneesLocalisation();
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
      // alert('Error getting location' + JSON.stringify(error));
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

}


