import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPessoaPage } from './login-pessoa';
import { LoginProvider } from '../../providers/pessoa/login';

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
      LoginProvider
    ]
})
export class LoginPessoaPageModule { }
