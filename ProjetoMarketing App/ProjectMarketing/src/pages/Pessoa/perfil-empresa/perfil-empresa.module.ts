import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PerfilEmpresaPage } from './perfil-empresa';
import { PessoaProvider } from '../../../providers/pessoa/pessoa';
import { EmpresaProvider } from '../../../providers/empresa/empresa';
import { StorageProvider } from '../../../providers/storage/storage';
import { TransacaoProvider } from '../../../providers/transacao/transacao';

@NgModule({
  declarations: [
    PerfilEmpresaPage,
  ],
  imports: [
    IonicPageModule.forChild(PerfilEmpresaPage)
  ],
  providers: [
    PessoaProvider,
    EmpresaProvider,
    StorageProvider,
    TransacaoProvider
  ]
})
export class PerfilEmpresaPageModule { }
