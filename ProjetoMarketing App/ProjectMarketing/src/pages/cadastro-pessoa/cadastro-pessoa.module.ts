import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroPessoaPage } from './cadastro-pessoa';

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
  ]
})
export class CadastroPessoaPageModule {}
