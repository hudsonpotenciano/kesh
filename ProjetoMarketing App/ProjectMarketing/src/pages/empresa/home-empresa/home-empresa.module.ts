import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeEmpresaPage } from './home-empresa';
import { TranslateModule } from '@ngx-translate/core';
import { SocialSharing } from '@ionic-native/social-sharing';
import { QRScanner } from '@ionic-native/qr-scanner';

@NgModule({
  declarations: [
    HomeEmpresaPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeEmpresaPage),
    TranslateModule.forChild()
  ],
  exports: [
    HomeEmpresaPage
  ],
  providers:
  [
    SocialSharing,
    QRScanner
  ]
})
export class HomePageModule {}
