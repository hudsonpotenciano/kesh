import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PessoaProvider } from '../../../providers/pessoa/pessoa';
import { PerfilPessoaPage } from './perfil-pessoa';

@NgModule({
  declarations: [
    PerfilPessoaPage,
  ],
  imports: [
    IonicPageModule.forChild(PerfilPessoaPage),
  ],
  providers:
    [
      PessoaProvider,
    ]
})
export class PerfilPessoaPageModule { }
