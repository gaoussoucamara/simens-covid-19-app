import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, AlertController} from '@ionic/angular';
import { UserService } from '../../api/user.service';

// Declare jquery
declare var $: any;

@Component({
  selector: 'app-analyse',
  templateUrl: './analyse.page.html',
  styleUrls: ['./analyse.page.scss'],
})
export class AnalysePage implements OnInit {

  constructor(private navParams: NavParams,
              private modalCtrl: ModalController,
              public alertCtrl: AlertController,
              private userService: UserService,
              ) { }

  informationStatistiques: any [];

  ngOnInit() {
    this.getInfosWebServices('Senegal');
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }

  async getInfosWebServices(pays: any) {

    const settings = {
      async: true,
      crossDomain: true,
      url: 'https://covid-193.p.rapidapi.com/statistics',
      method: 'GET',
      headers: {
         'x-rapidapi-host': 'covid-193.p.rapidapi.com',
         'x-rapidapi-key': '243572a425msh1d2d66ac3750d3bp1c6005jsn8d12075a15de'
      }
    };

    // tslint:disable-next-line:space-before-function-paren
    // tslint:disable-next-line:only-arrow-functions
    $.ajax(settings).done(function(response: any) {
      console.log(response.response);

      // return false;
      let interfaceAffiche = '';
      let interfaceAfficheEntete = '';
      let interfaceAfficheSenegal = '';
      let interfaceAfficheUSA = '';
      let totalConfirme = 0;
      let totalGueris = 0;
      let totalDeces = 0;




      const tabStatisticsParPays = response.response;

      interfaceAfficheEntete += '' +
                                '<table id="tabInfosStatistique" style="width: 98%; margin-top: 15px; font-family: Times New Roman; font-size: 13px; margin-left: 6px; border-left-top-radius: 10px; border-right-top-radius: 10px; margin-right: 6px; background: #f9f9f9;">' +
                                  '<tr style="width: 100%;">' +
                                    '<td style="width: 35%; border: 0.5px solid #cccccc; text-align: center; padding: 3px; margin: 5px; font-weight: bold; color: gray;">Lieu</td>' +
                                    '<td style="width: 23%; border: 0.5px solid #cccccc; text-align: center; padding: 3px; margin: 5px; font-weight: bold; color: gray;">Confirmés</td>' +
                                    '<td style="width: 22%; border: 0.5px solid #cccccc; text-align: center; padding: 3px; margin: 5px; font-weight: bold; color: gray;">Guéris</td>' +
                                    '<td style="width: 20%; border: 0.5px solid #cccccc; text-align: center; padding: 3px; margin: 5px; font-weight: bold; color: gray;">Décès</td>' +
                                  '</tr>' +
                                '</table>';

      // tslint:disable-next-line:prefer-for-of
      for (let i = 0 ; i < tabStatisticsParPays.length ; i++) {

        if (tabStatisticsParPays[i].country === 'World') {
          totalConfirme = tabStatisticsParPays[i].cases.total;
          totalGueris = tabStatisticsParPays[i].cases.recovered;
          totalDeces = tabStatisticsParPays[i].deaths.total;
        }

        if (tabStatisticsParPays[i].country === 'Senegal' ||
            tabStatisticsParPays[i].country === 'France'  ||
            tabStatisticsParPays[i].country === 'Spain'   ||
            tabStatisticsParPays[i].country === 'Italy'   ||
            tabStatisticsParPays[i].country === 'UK'      ||
            tabStatisticsParPays[i].country === 'USA'     ||
            tabStatisticsParPays[i].country === 'Germany' ||
            tabStatisticsParPays[i].country === 'China'   ||
            tabStatisticsParPays[i].country === 'Algeria' ||
            tabStatisticsParPays[i].country === 'Mali'    ||
            tabStatisticsParPays[i].country === 'Cameroon' ||
            tabStatisticsParPays[i].country === 'Ivory-Coast' ||
            tabStatisticsParPays[i].country === 'Guinea'  ||
            tabStatisticsParPays[i].country === 'South-Africa' ||
            tabStatisticsParPays[i].country === 'Egypt' ||
            tabStatisticsParPays[i].country === 'Mauritania'


            ) {

          console.log(tabStatisticsParPays[i].cases.new);

          const libellePays = tabStatisticsParPays[i].country;

          let CasTotal = tabStatisticsParPays[i].cases.total;
          let TotalDeces = tabStatisticsParPays[i].deaths.total;
          let NouveauxDeces = tabStatisticsParPays[i].deaths.new;
          let TotalGueris = tabStatisticsParPays[i].cases.recovered;
          let NouveauxCas = tabStatisticsParPays[i].cases.new;

          if ( !CasTotal ) { CasTotal = 0; }
          if ( !TotalDeces ) { TotalDeces = 0; }
          if ( !NouveauxDeces ) { NouveauxDeces = 0; }
          if ( !TotalGueris ) { TotalGueris = 0; }
          if ( !NouveauxCas ) { NouveauxCas = 0; }

          if (libellePays === 'Senegal') {
            interfaceAfficheSenegal = '' +
                              '<table id="tabInfosStatistique" style="width: 98%; font-family: Times New Roman; font-size: 14px; margin-left: 6px; margin-right: 6px;">' +
                                  '<tr style="width: 100%;">' +
                                    '<td style="width: 35%; border: 0.5px solid #cccccc; text-align: left;  padding: 3px; padding-left: 8px; margin: 5px; font-weight: bold; background: #ffffff; font-size: 14px;"> Sénégal <span style="color: red;">(' +  NouveauxCas + ')</span></td>' +
                                    '<td style="width: 23%; border: 0.5px solid #cccccc; text-align: right; padding: 3px; padding-right: 8px; margin: 5px; font-weight: bold; color: black; background: #ffffff;">' + CasTotal.toLocaleString() + '</td>' +
                                    '<td style="width: 22%; border: 0.5px solid #cccccc; text-align: right; padding: 3px; padding-right: 8px; margin: 5px; font-weight: bold; color: green; background: #ffffff;">' + TotalGueris.toLocaleString() + '</td>' +
                                    '<td style="width: 20%; border: 0.5px solid #cccccc; text-align: right; padding: 3px; padding-right: 8px; margin: 5px; font-weight: bold; color: black; background: #ffffff;">' + TotalDeces.toLocaleString() + '</td>' +
                                  '</tr>' +
                              '</table>';

          } else if (libellePays === 'USA') {
            interfaceAfficheUSA = '' +
                                      '<table id="tabInfosStatistique" style="width: 98%; font-family: Times New Roman; font-size: 14px; margin-left: 6px; margin-right: 6px;">' +
                                          '<tr style="width: 100%;">' +
                                            '<td style="width: 35%; border: 0.5px solid #cccccc; text-align: left;  padding: 3px; padding-left: 8px; margin: 5px; font-weight: normal; color: black; background: #ffffff; font-size: 12px;">Etats-Unis <span style="color: red; font-size: 10px;">(' +  NouveauxCas + ')</span> </td>' +
                                            '<td style="width: 23%; border: 0.5px solid #cccccc; text-align: right; padding: 3px; padding-right: 8px; margin: 5px; font-weight: normal; color: black; background: #ffffff;">' + CasTotal.toLocaleString() + '</td>' +
                                            '<td style="width: 22%; border: 0.5px solid #cccccc; text-align: right; padding: 3px; padding-right: 8px; margin: 5px; font-weight: normal; color: green; background: #ffffff;">' + TotalGueris.toLocaleString() + '</td>' +
                                            '<td style="width: 20%; border: 0.5px solid #cccccc; text-align: right; padding: 3px; padding-right: 8px; margin: 5px; font-weight: normal; color: black; background: #ffffff;">' + TotalDeces.toLocaleString() + '</td>' +
                                          '</tr>' +
                                      '</table>';

          } else {
            let libellePaysFrench = '';
            if (libellePays === 'Spain') { libellePaysFrench = 'Espagne ' + '<span style="color: red; font-size:10px;">('
                                                                         +  NouveauxCas + ')</span>'; }
            if (libellePays === 'Italy') { libellePaysFrench = 'Italie ' + '<span style="color: red; font-size:10px;">('
                                                                        +  NouveauxCas + ')</span>'; }
            if (libellePays === 'UK') { libellePaysFrench = 'Angleterre ' + '<span style="color: red; font-size:10px;">('
                                                                         +  NouveauxCas + ')</span>'; }
            if (libellePays === 'USA') { libellePaysFrench = 'USA'; }
            if (libellePays === 'France') { libellePaysFrench = 'France ' + '<span style="color: red; font-size:10px;">('
                                                                          +  NouveauxCas + ')</span>'; }
            if (libellePays === 'Germany') { libellePaysFrench = 'Allemagne ' + '<span style="color: red; font-size:10px;">('
                                                                              +  NouveauxCas + ')</span>';  }
            if (libellePays === 'China') { libellePaysFrench = 'Chine ' + '<span style="color: red; font-size:10px;">('
                                                                        +  NouveauxCas + ')</span>';  }
            if (libellePays === 'Algeria') { libellePaysFrench = '<span style="">Algérie </span>' + '<span style="color: red; font-size:10px;">('
                                                                                                 +  NouveauxCas + ')</span>'; }
            if (libellePays === 'Mali') { libellePaysFrench = '<span style="">Mali </span> '  + '<span style="color: red; font-size:10px;">('
                                                                                             +  NouveauxCas + ')</span>'; }
            if (libellePays === 'Cameroon') { libellePaysFrench = '<span style="">Cameroune </span>'  + '<span style="color: red; font-size:10px;">('
                                                                                                      +  NouveauxCas + ')</span>'; }
            if (libellePays === 'Ivory-Coast') { libellePaysFrench = '<span style="">Côte d\'Ivoire </span>'  + '<span style="color: red; font-size:10px;">('
                                                                                                      +  NouveauxCas + ')</span>'; }
            if (libellePays === 'Guinea') { libellePaysFrench = '<span style="">Guinée </span>'  + '<span style="color: red; font-size:10px;">('
                                                                                                 +  NouveauxCas + ')</span>'; }
            if (libellePays === 'South-Africa') { libellePaysFrench = '<span style="">Afrique du sud </span>'  + '<span style="color: red; font-size:10px;">('
                                                                                                 +  NouveauxCas + ')</span>'; }
            if (libellePays === 'Egypt') { libellePaysFrench = '<span style="">Egypt </span>'  + '<span style="color: red; font-size:10px;">('
                                                                                               +  NouveauxCas + ')</span>'; }
            if (libellePays === 'Mauritania') { libellePaysFrench = '<span style="">Mauritanie </span>'  + '<span style="color: red; font-size:10px;">('
                                                                                                         +  NouveauxCas + ')</span>'; }



            interfaceAffiche += '' +
                              '<table id="tabInfosStatistique" style="width: 98%; font-family: Times New Roman; font-size: 14px; margin-left: 6px; margin-right: 6px;">' +
                                  '<tr style="width: 100%;">' +
                                    '<td style="width: 35%; border: 0.5px solid #cccccc; text-align: left;  padding: 3px; padding-left: 8px; margin: 5px; font-weight: normal; color: black; background: #ffffff; font-size: 12px;">' + libellePaysFrench + '</td>' +
                                    '<td style="width: 23%; border: 0.5px solid #cccccc; text-align: right; padding: 3px; padding-right: 8px; margin: 5px; font-weight: normal; color: black; background: #ffffff;">' + CasTotal.toLocaleString() + '</td>' +
                                    '<td style="width: 22%; border: 0.5px solid #cccccc; text-align: right; padding: 3px; padding-right: 8px; margin: 5px; font-weight: normal; color: green; background: #ffffff;">' + TotalGueris.toLocaleString() + '</td>' +
                                    '<td style="width: 20%; border: 0.5px solid #cccccc; text-align: right; padding: 3px; padding-right: 8px; margin: 5px; font-weight: normal; color: black; background: #ffffff;">' + TotalDeces.toLocaleString() + '</td>' +
                                  '</tr>' +
                              '</table>';

          }

        }


      }



      const interfaceAfficheMonde = '' +
                              '<table id="tabInfosStatistique" style="width: 98%; font-family: Times New Roman; font-size: 14px; margin-left: 6px; margin-right: 6px;">' +
                                  '<tr style="width: 100%;">' +
                                    '<td style="width: 35%; border: 0.5px solid #cccccc; text-align: left;  padding: 3px; padding-left: 8px; margin: 5px; font-weight: bold; background: #f8f2ce; font-size: 13px;"> Monde entier </td>' +
                                    '<td style="width: 23%; border: 0.5px solid #cccccc; text-align: right; padding: 3px; padding-right: 8px; margin: 5px; font-weight: bold; color: black; background: #f8f2ce;">' + totalConfirme.toLocaleString() + '</td>' +
                                    '<td style="width: 22%; border: 0.5px solid #cccccc; text-align: right; padding: 3px; padding-right: 8px; margin: 5px; font-weight: bold; color: green; background: #f8f2ce;">' + totalGueris.toLocaleString() + '</td>' +
                                    '<td style="width: 20%; border: 0.5px solid #cccccc; text-align: right; padding: 3px; padding-right: 8px; margin: 5px; font-weight: bold; color: black; background: #f8f2ce;">' + totalDeces.toLocaleString() + '</td>' +
                                  '</tr>' +
                              '</table>';

      interfaceAffiche = interfaceAfficheEntete + interfaceAfficheMonde + interfaceAfficheSenegal + interfaceAfficheUSA + interfaceAffiche;

      interfaceAffiche += '<div style="margin: 10px;  font-family: Times New Roman">' +
                         'Pour plus d\'infos : <a href="https://www.worldometers.info/coronavirus/">Cliquez !</a>' +
                         '</div>';

      $('.styleDesignInterfaceAnalyse').html(interfaceAffiche);

    });
  }


}
