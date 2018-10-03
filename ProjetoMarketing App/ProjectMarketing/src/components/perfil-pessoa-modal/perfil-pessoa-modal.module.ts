import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PerfilPessoaModalPage } from './perfil-pessoa-modal';
import { PessoaProvider } from '../../providers/pessoa/pessoa';

@NgModule({
  declarations: [
    PerfilPessoaModalPage,
  ],
  imports: [
    IonicPageModule.forChild(PerfilPessoaModalPage),
  ],
  providers:
    [
      PessoaProvider
    ]
})
export class PerfilPessoaModalPageModule { }
