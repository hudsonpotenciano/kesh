import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginEmpresaAdminPage } from './login-empresa-admin';
import { EmpresaProvider } from '../../providers/empresa/empresa';

@NgModule({
  declarations: [
    LoginEmpresaAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginEmpresaAdminPage),
  ],
  providers:
    [
      EmpresaProvider
    ] 
})
export class LoginEmpresaAdminPageModule {}
