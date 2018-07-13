import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelecaoPessoaCompartilhamentoPage } from './selecao-pessoa-compartilhamento';
import { PessoaProvider } from '../../providers/pessoa/pessoa';

@NgModule({
  declarations: [
    SelecaoPessoaCompartilhamentoPage,
  ],
  imports: [
    IonicPageModule.forChild(SelecaoPessoaCompartilhamentoPage),
  ],
  providers:
  [
    PessoaProvider
  ]
})
export class SelecaoPessoaCompartilhamentoPageModule {}
