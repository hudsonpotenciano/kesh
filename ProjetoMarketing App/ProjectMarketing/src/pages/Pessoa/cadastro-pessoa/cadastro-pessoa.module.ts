import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroPessoaPage } from './cadastro-pessoa';
import { PessoaProvider } from '../../../providers/pessoa/pessoa';

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
    PessoaProvider
  ]
})
export class CadastroPessoaPageModule {}
