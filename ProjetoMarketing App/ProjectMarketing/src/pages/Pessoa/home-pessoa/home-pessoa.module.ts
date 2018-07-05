import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePessoaPage } from './home-pessoa';
import { PessoaProvider } from '../../../providers/pessoa/pessoa';
import { EmpresaProvider } from '../../../providers/empresa/empresa';

@NgModule({
  declarations: [
    HomePessoaPage,
  ],
  imports: [
    IonicPageModule.forChild(HomePessoaPage),
  ],
  providers:
  [
    PessoaProvider,
    EmpresaProvider
  ]
})
export class HomePessoaPageModule {}
