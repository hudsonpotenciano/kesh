import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OpcoesEmpresaPage } from './opcoes-empresa';
import { StorageEmpresaProvider } from '../../../providers/storage/storage-empresa';
import { EmpresaProvider } from '../../../providers/empresa/empresa';

@NgModule({
  declarations: [
    OpcoesEmpresaPage,
  ],
  imports: [
    IonicPageModule.forChild(OpcoesEmpresaPage),
  ],
  providers:[
    StorageEmpresaProvider,
    EmpresaProvider
  ]
})
export class OpcoesEmpresaPageModule {}
