import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PerfilEmpresaPage } from './perfil-empresa';
import { PessoaProvider } from '../../../providers/pessoa/pessoa';
import { EmpresaProvider } from '../../../providers/empresa/empresa';
import { TransacaoProvider } from '../../../providers/transacao/transacao';
import { StorageTransacaoProvider } from '../../../providers/storage/storage-transacao';

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
    TransacaoProvider,
    StorageTransacaoProvider
  ]
})
export class PerfilEmpresaPageModule { }
