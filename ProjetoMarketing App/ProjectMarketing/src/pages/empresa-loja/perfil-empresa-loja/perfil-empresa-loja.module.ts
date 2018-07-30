import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PerfilEmpresaLojaPage } from './perfil-empresa-loja';
import { EmpresaProvider } from '../../../providers/empresa/empresa';
import { StorageEmpresaProvider } from '../../../providers/storage/storage-empresa';

@NgModule({
  declarations: [
    PerfilEmpresaLojaPage,
  ],
  imports: [
    IonicPageModule.forChild(PerfilEmpresaLojaPage),
  ],
  providers:[
    StorageEmpresaProvider,
    EmpresaProvider
  ]
})
export class PerfilEmpresaLojaPageModule {}
