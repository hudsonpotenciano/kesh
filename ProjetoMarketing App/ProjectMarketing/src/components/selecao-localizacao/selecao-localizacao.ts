import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { GoogleMaps } from '../../models/models.model';

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-selecao-localizacao',
  templateUrl: 'selecao-localizacao.html',
})
export class SelecaoLocalizacaoPage {

  localizacao: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    this.inicie();
  }

  inicie() {

    this.localizacao = { lat: this.navParams.get("lat"), lng: this.navParams.get("long") };

    var map = new google.maps.Map(document.getElementById('maps-component'), {
      center: this.localizacao,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      zoom: 15,
      zoomControl: false,
      styles: GoogleMaps.Style
    });

    map.setTilt(45);

    var input = document.getElementById('pac-input');

    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    map.addListener('bounds_changed', function () {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    var marker = new google.maps.Marker({
      map: map,
      position: this.localizacao,
      draggable: true,
      animation: google.maps.Animation.DROP
    });
    markers.push(marker);

    this.adicioneEventoMarker(marker);

    searchBox.addListener('places_changed', () => {
      var places = searchBox.getPlaces();

      if (!places || places.length == 0) {
        return;
      }

      markers.forEach(function (marker) {
        marker.setMap(null);
      });

      markers = [];

      var bounds = new google.maps.LatLngBounds();
      places.forEach((place) => {

        if (!place.geometry) {
          return;
        }

        var marker = new google.maps.Marker({
          map: map,
          title: place.name,
          position: place.geometry.location,
          draggable: true,
          animation: google.maps.Animation.DROP
        });

        markers.push(marker);

        this.localizacao = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };

        this.adicioneEventoMarker(marker);

        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });

      map.fitBounds(bounds);
    });
  }

  adicioneEventoMarker(marker) {

    google.maps.event.addListener(marker, 'dragend', (evt) => {
      this.localizacao = { lat: evt.latLng.lat(), lng: evt.latLng.lng() };
    });
  }

  retorneLocalizacao() {
    debugger;
    this.viewCtrl.dismiss(this.localizacao)
  }
}
