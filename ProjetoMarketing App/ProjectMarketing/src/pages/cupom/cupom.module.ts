import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CupomPage } from './cupom';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule ({
  declarations: [
    CupomPage,
  ],
  imports: [
    IonicPageModule.forChild(CupomPage),
    NgxQRCodeModule
  ]
})

export class CupomPageModule {}