import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoogleMaps } from '../../models/models.model';

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})

export class MapsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {

    let latLng = new google.maps.LatLng(this.navParams.get("latitude"), this.navParams.get("longitude"));

    let elemento = document.getElementById('maps');
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
  }
}
