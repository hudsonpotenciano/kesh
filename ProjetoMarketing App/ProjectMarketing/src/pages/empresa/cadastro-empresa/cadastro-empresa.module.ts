import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroEmpresaPage } from './cadastro-empresa';
import { EmpresaProvider } from '../../../providers/empresa/empresa';

@NgModule({
  declarations: [
    CadastroEmpresaPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroEmpresaPage),
  ],
  providers: [
    EmpresaProvider
  ]
})
export class CadastroEmpresaPageModule {}
