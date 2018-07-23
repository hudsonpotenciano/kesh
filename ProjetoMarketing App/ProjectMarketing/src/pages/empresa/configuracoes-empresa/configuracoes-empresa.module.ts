import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfiguracoesEmpresaPage } from './configuracoes-empresa';

@NgModule({
  declarations: [
    ConfiguracoesEmpresaPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfiguracoesEmpresaPage),
  ],
})
export class ConfiguracoesEmpresaPageModule {}
