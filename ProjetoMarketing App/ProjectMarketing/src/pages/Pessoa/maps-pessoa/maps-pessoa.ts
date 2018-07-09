import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoogleMaps } from '../../../models/models.model';
import { Geolocation } from '@ionic-native/geolocation';

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-maps-pessoa',
  templateUrl: 'maps-pessoa.html',
})

export class MapsPessoaPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation) {
  }

  ionViewDidLoad() {

    this.geolocation.getCurrentPosition()
      .then((posicao) => {

        let latLng = new google.maps.LatLng(posicao.coords.latitude, posicao.coords.longitude);

        let elemento = document.getElementById('maps-pessoa');
        let mapa = new google.maps.Map(elemento, {
          center: latLng,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          zoom: 15,
          styles: GoogleMaps.Style
        });

        new google.maps.Marker({
          position: latLng,
          map: mapa
        });
      });
  }
}
