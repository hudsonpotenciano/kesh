import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPessoaPage } from './login-pessoa';
import { PessoaProvider } from '../../../providers/pessoa/pessoa';
import { UtilitariosProvider } from '../../../providers/utilitarios/utilitarios';

@NgModule({
  declarations: [
    LoginPessoaPage
  ],
  imports: [
    IonicPageModule.forChild(LoginPessoaPage)
  ],
  exports: [
    LoginPessoaPage
  ],
  providers:
    [
      PessoaProvider,
      UtilitariosProvider
    ]
})
export class LoginPessoaPageModule { }
