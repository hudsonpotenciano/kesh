import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PerfilEmpresaLojaPage } from './perfil-empresa-loja';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    PerfilEmpresaLojaPage,
  ],
  imports: [
    IonicPageModule.forChild(PerfilEmpresaLojaPage),
    PipesModule
  ],
  providers:[
    SplashScreen
  ]
})
export class PerfilEmpresaLojaPageModule {}