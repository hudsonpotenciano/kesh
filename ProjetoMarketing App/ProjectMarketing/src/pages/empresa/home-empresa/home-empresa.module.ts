import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeEmpresaPage } from './home-empresa';
import { TranslateModule } from '@ngx-translate/core';
import { EmpresaProvider } from '../../../providers/empresa/empresa';
import { StorageEmpresaProvider } from '../../../providers/storage/storage-empresa';

@NgModule({
  declarations: [
    HomeEmpresaPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeEmpresaPage),
    TranslateModule.forChild()
  ],
  exports: [
    HomeEmpresaPage
  ],
  providers:
  [
    EmpresaProvider,
    StorageEmpresaProvider
  ]
})
export class HomePageModule {}
