import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroPessoaPage } from './cadastro-pessoa';
import { PessoaProvider } from '../../../providers/pessoa/pessoa';
import { UtilitariosProvider } from '../../../providers/utilitarios/utilitarios';

@NgModule({
  declarations: [
    CadastroPessoaPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroPessoaPage),
  ],
  exports:
  [
    IonicPageModule
  ],
  providers:
  [
    PessoaProvider,
    UtilitariosProvider
  ]
})
export class CadastroPessoaPageModule {}
