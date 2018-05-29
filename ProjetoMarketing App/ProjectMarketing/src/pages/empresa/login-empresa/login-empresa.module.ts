import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginEmpresaPage } from './login-empresa';
import { LoginEmpresaProvider } from '../../../providers/empresa/login';

@NgModule({
  declarations: [
    LoginEmpresaPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginEmpresaPage),
  ],
  providers:
    [
      LoginEmpresaProvider
    ]
})
export class LoginEmpresaPageModule {}
