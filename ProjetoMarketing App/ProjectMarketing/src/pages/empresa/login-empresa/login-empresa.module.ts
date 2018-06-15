import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginEmpresaPage } from './login-empresa';
import { EmpresaProvider } from '../../../providers/empresa/empresa';

@NgModule({
  declarations: [
    LoginEmpresaPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginEmpresaPage),
  ],
  providers:
    [
      EmpresaProvider
    ]
})
export class LoginEmpresaPageModule {}
