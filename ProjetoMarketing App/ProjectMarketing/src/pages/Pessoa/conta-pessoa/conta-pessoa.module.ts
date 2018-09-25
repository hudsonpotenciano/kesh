import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContaPessoaPage } from './conta-pessoa';
import { PessoaProvider } from '../../../providers/pessoa/pessoa';
import { UtilitariosProvider } from '../../../providers/utilitarios/utilitarios';

@NgModule({
  declarations: [
    ContaPessoaPage,
  ],
  imports: [
    IonicPageModule.forChild(ContaPessoaPage),
  ],
  providers:[
    PessoaProvider,
    UtilitariosProvider
  ]
})
export class ContaPessoaPageModule {}
