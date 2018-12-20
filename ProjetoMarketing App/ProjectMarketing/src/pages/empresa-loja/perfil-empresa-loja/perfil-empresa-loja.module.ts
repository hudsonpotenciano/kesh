import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PerfilEmpresaLojaPage } from './perfil-empresa-loja';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    PerfilEmpresaLojaPage,
  ],
  imports: [
    IonicPageModule.forChild(PerfilEmpresaLojaPage)
  ],
  providers:[
    SplashScreen
  ]
})
export class PerfilEmpresaLojaPageModule {}