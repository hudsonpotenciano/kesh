import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePessoaPage } from './home-pessoa';
import { PessoaProvider } from '../../../providers/pessoa/pessoa';
import { EmpresaProvider } from '../../../providers/empresa/empresa';
import { EmpresaLojaProvider } from '../../../providers/empresa-loja/empresa-loja';

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
    EmpresaProvider,
    EmpresaLojaProvider
  ]
})
export class HomePessoaPageModule {}
