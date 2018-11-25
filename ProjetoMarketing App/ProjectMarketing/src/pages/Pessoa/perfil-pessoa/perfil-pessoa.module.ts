import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PessoaProvider } from '../../../providers/pessoa/pessoa';
import { PerfilPessoaPage } from './perfil-pessoa';
import { UtilitariosProvider } from '../../../providers/utilitarios/utilitarios';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    PerfilPessoaPage,
  ],
  imports: [
    IonicPageModule.forChild(PerfilPessoaPage),
  ],
  providers:
    [
      PessoaProvider,
      UtilitariosProvider,
      SplashScreen
    ]
})
export class PerfilPessoaPageModule { }
