import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IconeInformacao } from './icone-informacao';
import { UtilitariosProvider } from '../../providers/utilitarios/utilitarios';
import { TranslateModule } from '../../../node_modules/@ngx-translate/core';

@NgModule({
  declarations: [
    IconeInformacao,
  ],
  imports: [
    IonicPageModule,
  ],
  exports:[
    IconeInformacao
  ],
  providers:
  [
    UtilitariosProvider,
    TranslateModule
  ]
})
export class IconeInformacaoModule {}
