import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfiguracoesPessoaPage } from './configuracoes-pessoa';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    ConfiguracoesPessoaPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfiguracoesPessoaPage),
  ],
  providers:
  [
    SocialSharing,
    SplashScreen
  ]
})
export class ConfiguracoesPessoaPageModule {}
