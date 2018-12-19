import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OpcoesEmpresaLojaPage } from './opcoes-empresa-loja';
import { StorageEmpresaProvider } from '../../../providers/storage/storage-empresa';
import { EmpresaProvider } from '../../../providers/empresa/empresa';

@NgModule({
  declarations: [
    OpcoesEmpresaLojaPage,
  ],
  imports: [
    IonicPageModule.forChild(OpcoesEmpresaLojaPage),
  ],
  providers:[
    StorageEmpresaProvider,
    EmpresaProvider
  ]
})
export class OpcoesEmpresaLojaPageModule {}
