import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroPerfilEmpresaPage } from './cadastro-perfil-empresa';
import { EmpresaProvider } from '../../../providers/empresa/empresa';
import { EmpresaLojaProvider } from '../../../providers/empresa-loja/empresa-loja';
import { UtilitariosProvider } from '../../../providers/utilitarios/utilitarios';

@NgModule({
  declarations: [
    CadastroPerfilEmpresaPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroPerfilEmpresaPage),
  ],
  providers:
  [
    EmpresaProvider,
    EmpresaLojaProvider,
    UtilitariosProvider
  ]
})
export class CadastroPerfilEmpresaPageModule {}
