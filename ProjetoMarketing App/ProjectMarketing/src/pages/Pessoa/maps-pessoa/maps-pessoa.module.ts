import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapsPessoaPage } from './maps-pessoa';
import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    MapsPessoaPage,
  ],
  imports: [
    IonicPageModule.forChild(MapsPessoaPage),
  ],
  providers: [
    Geolocation
  ]
})
export class MapsPessoaPageModule { }
