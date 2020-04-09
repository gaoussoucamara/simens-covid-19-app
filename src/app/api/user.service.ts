import { HTTP } from '@ionic-native/http/ngx';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';

// Declare jquery
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient, private storage: Storage) { }

  host = 'http://www.simens.sn/admin';
  public tabDonnees: any = [];


  /***
   * GESTION DES DONNEES D'AUTO SIGNALEMENT
   */
  envoiDonneesAutoSignalement(infosEtatCivil: any, infosSymptomes: any, infosAntecedents: any) {

    const url = this.host + '?action=enregistrementInformations&iec=' + infosEtatCivil + '&is=' + infosSymptomes
                          + '&ia=' + infosAntecedents + '&cle=BF-ECB&pw=passInfosCovid19*1234';
    return this.http.get<any>(url);
  }

  envoiDonneesGeolocAutoSignalement(latitude: any, longitude: any, geoAddress: any, idpatient: any) {

    const url = this.host + '?action=enregistrementInfosGeoloc&latitud=' + latitude + '&longitud=' + longitude
                          + '&adress=' + geoAddress + '&idpatient=' + idpatient;
    return this.http.get<any>(url);
  }

  getInfosCoronaNews() {
    const url = this.host + '?action=getInfosCoronaNews';
    return this.http.get<any>(url);
  }

  getInfosStatistiques() {
    const url = this.host + '?action=getInfosStatistiques';
    return this.http.get<any>(url);
  }

  /**
   * =========================================
   * =========================================
   * =========================================
   */













  /**
   * Liste des patients
   */
  listPatients() {
    const url = this.host + '?action=list';
    return this.http.get<any>(url);
  }

  /**
   * Liste des patients pour les validations multiples
   */
  listPatientsValidationsMultiples() {
    const url = this.host + '?action=listValidationMultiple&cle=BF-ECB&pw=passwordHASSIM';
    return this.http.get<any>(url);
  }

  /**
   * Le nombre de patient
   */
  nbPatient() {
    const url = this.host + '?action=nbPatients';
    return this.http.get<any>(url);
  }

  /**
   * Liste des analyses avec resultats pas encore validé pour le patient donné en parametre
   */
  listDemandesAnalyse(id: any) {
    const url = this.host + '?action=detail&id=' + id + '&cle=BF-ECB&pw=passwordHASSIM';
    return this.http.get<any>(url);
  }


  /**
   * Validation du résultat de l'analyse
   */
  validationResultatAnalyse(id: any, iddemande: any) {
    const url = this.host + '?action=validationResultat&id=' + id + '&iddemande=' + iddemande;
    return this.http.get<any>(url);
  }

  /**
   * Verification authentification
   */
  verifierAuthentification(form: any) {

    const Username = 'login1234';
    const Password = 'passe1234';

    if (form.username === Username && form.password === Password) {
      return 1;
    }

    return 0;
  }

  /**
   * Validation multiple des résultats d'analyse
   */
  validationMultipleResultatsAnalyses(listedemande: any) {
    const url = this.host + '?action=validationMultipleResultats&listeDemande=' + listedemande;
    return this.http.get<any>(url);
  }













  /**
   * La gestion des sessions de connexion
   * La gestion des sessions de connexion
   */

  public setSession(settingName: any, value: any) {
    return this.storage.set('settingName', value);
  }
  public async getSession(settingName: any) {
    return await this.storage.get('settingName');
  }
  public async removeSession(settingName: any) {
    return await this.storage.remove('settingName');
  }

  public clearSession() {
    this.storage.clear().then(() => {
      console.log('all keys cleared');
    });
  }

  /**
   * =====================================
   * =====================================
   * =====================================
   */

}
