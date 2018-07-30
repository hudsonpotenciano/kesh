import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QrCodeScannerPage } from './qr-code-scanner';
import { QRScanner } from '@ionic-native/qr-scanner';

@NgModule({
  declarations: [
    QrCodeScannerPage,
  ],
  imports: [
    IonicPageModule.forChild(QrCodeScannerPage),
  ],
  providers:[
    QRScanner
  ]
})
export class QrCodeScannerPageModule {}
