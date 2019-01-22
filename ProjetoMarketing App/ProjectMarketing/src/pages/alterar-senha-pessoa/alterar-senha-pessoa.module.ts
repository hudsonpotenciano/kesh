import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlterarSenhaPessoaPage } from './alterar-senha-pessoa';
import { PessoaProvider } from '../../providers/pessoa/pessoa';

@NgModule({
  declarations: [
    AlterarSenhaPessoaPage,
  ],
  imports: [
    IonicPageModule.forChild(AlterarSenhaPessoaPage),
  ],
  providers:
  [
    PessoaProvider
  ]
})
export class AlterarSenhaPessoaPageModule {}
