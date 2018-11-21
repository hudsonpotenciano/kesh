import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeEmpresaPage } from './home-empresa';
import { TranslateModule } from '@ngx-translate/core';
import { EmpresaProvider } from '../../../providers/empresa/empresa';
import { StorageEmpresaProvider } from '../../../providers/storage/storage-empresa';
import { EmpresaLojaProvider } from '../../../providers/empresa-loja/empresa-loja';
import { PipesModule } from '../../../pipes/pipes.module';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    HomeEmpresaPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeEmpresaPage),
    TranslateModule.forChild(),
    PipesModule,
    ComponentsModule
  ],
  exports: [
    HomeEmpresaPage
  ],
  providers:
  [
    EmpresaLojaProvider,
    StorageEmpresaProvider,
    EmpresaProvider
  ]
})
export class HomePageModule {}
