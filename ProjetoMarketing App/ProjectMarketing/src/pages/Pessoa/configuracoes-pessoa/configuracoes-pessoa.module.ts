import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfiguracoesPessoaPage } from './configuracoes-pessoa';
import { SocialSharing } from '@ionic-native/social-sharing';

@NgModule({
  declarations: [
    ConfiguracoesPessoaPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfiguracoesPessoaPage),
  ],
  providers:
  [
    SocialSharing
  ]
})
export class ConfiguracoesPessoaPageModule {}
