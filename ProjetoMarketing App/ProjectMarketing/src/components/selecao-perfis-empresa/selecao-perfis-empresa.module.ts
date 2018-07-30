import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelecaoPerfisEmpresaPage } from './selecao-perfis-empresa';
import { EmpresaProvider } from '../../providers/empresa/empresa';

@NgModule({
  declarations: [
    SelecaoPerfisEmpresaPage,
  ],
  imports: [
    IonicPageModule.forChild(SelecaoPerfisEmpresaPage),
  ],
  providers:[
    EmpresaProvider
  ]
})
export class SelecaoPerfisEmpresaPageModule {}
