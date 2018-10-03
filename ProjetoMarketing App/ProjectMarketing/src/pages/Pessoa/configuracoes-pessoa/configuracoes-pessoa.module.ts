import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfiguracoesPessoaPage } from './configuracoes-pessoa';

@NgModule({
  declarations: [
    ConfiguracoesPessoaPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfiguracoesPessoaPage),
  ],
})
export class ConfiguracoesPessoaPageModule {}
