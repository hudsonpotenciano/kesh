import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelecaoPessoaCompartilhamentoPage } from './selecao-pessoa-compartilhamento';
import { PessoaProvider } from '../../providers/pessoa/pessoa';
import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    SelecaoPessoaCompartilhamentoPage,
  ],
  imports: [
    IonicPageModule.forChild(SelecaoPessoaCompartilhamentoPage),
  ],
  providers:
  [
    PessoaProvider,
    Geolocation
  ]
})
export class SelecaoPessoaCompartilhamentoPageModule {}
