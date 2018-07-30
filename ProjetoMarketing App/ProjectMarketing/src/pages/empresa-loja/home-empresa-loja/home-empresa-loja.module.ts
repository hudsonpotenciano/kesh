import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeEmpresaLojaPage } from './home-empresa-loja';
import { StorageEmpresaProvider } from '../../../providers/storage/storage-empresa';
import { EmpresaLojaProvider } from '../../../providers/empresa-loja/empresa-loja';
import { PessoaProvider } from '../../../providers/pessoa/pessoa';

@NgModule({
  declarations: [
    HomeEmpresaLojaPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeEmpresaLojaPage),
  ],
  providers:[
    EmpresaLojaProvider,
    StorageEmpresaProvider,
    PessoaProvider
  ]
})
export class HomeEmpresaLojaPageModule {}
