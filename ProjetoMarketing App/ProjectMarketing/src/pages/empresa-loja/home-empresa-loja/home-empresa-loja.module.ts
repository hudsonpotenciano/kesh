import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeEmpresaLojaPage } from './home-empresa-loja';
import { StorageEmpresaProvider } from '../../../providers/storage/storage-empresa';
import { EmpresaLojaProvider } from '../../../providers/empresa-loja/empresa-loja';
import { PessoaProvider } from '../../../providers/pessoa/pessoa';
import { EmpresaProvider } from '../../../providers/empresa/empresa';
import { PipesModule } from '../../../pipes/pipes.module';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    HomeEmpresaLojaPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeEmpresaLojaPage),
    PipesModule,
    ComponentsModule
  ],
  providers:[
    EmpresaLojaProvider,
    StorageEmpresaProvider,
    PessoaProvider,
    EmpresaProvider
  ]
})
export class HomeEmpresaLojaPageModule {}
