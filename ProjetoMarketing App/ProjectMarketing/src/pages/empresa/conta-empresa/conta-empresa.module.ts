import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContaEmpresaPage } from './conta-empresa';
import { EmpresaProvider } from '../../../providers/empresa/empresa';
import { StorageEmpresaProvider } from '../../../providers/storage/storage-empresa';

@NgModule({
  declarations: [
    ContaEmpresaPage,
  ],
  imports: [
    IonicPageModule.forChild(ContaEmpresaPage),
  ],
  providers:
  [
    EmpresaProvider,
    StorageEmpresaProvider
  ]
})
export class ContaEmpresaPageModule {}
