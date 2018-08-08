import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelecaoPerfisEmpresaPage } from './selecao-perfis-empresa';

@NgModule({
  declarations: [
    SelecaoPerfisEmpresaPage,
  ],
  imports: [
    IonicPageModule.forChild(SelecaoPerfisEmpresaPage),
  ],
  providers:[
  ]
})
export class SelecaoPerfisEmpresaPageModule {}
