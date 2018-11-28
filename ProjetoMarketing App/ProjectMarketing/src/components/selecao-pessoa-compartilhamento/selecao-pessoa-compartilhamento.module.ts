import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelecaoPessoaCompartilhamentoPage } from './selecao-pessoa-compartilhamento';
import { PessoaProvider } from '../../providers/pessoa/pessoa';
import { Geolocation } from '@ionic-native/geolocation';
import { ComponentsModule } from '../components.module';

@NgModule({
  declarations: [
    SelecaoPessoaCompartilhamentoPage,
  ],
  imports: [
    IonicPageModule.forChild(SelecaoPessoaCompartilhamentoPage),
    ComponentsModule
  ],
  providers:
  [
    PessoaProvider,
    Geolocation
  ]
})
export class SelecaoPessoaCompartilhamentoPageModule {}
