import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InformacoesDaEmpresaPage } from './informacoes-da-empresa';

@NgModule({
  declarations: [
    InformacoesDaEmpresaPage,
  ],
  imports: [
    IonicPageModule.forChild(InformacoesDaEmpresaPage),
  ],
})
export class InformacoesDaEmpresaPageModule {}
