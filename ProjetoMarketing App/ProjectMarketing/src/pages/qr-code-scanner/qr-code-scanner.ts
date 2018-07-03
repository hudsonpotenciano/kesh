import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QRScannerStatus, QRScanner } from '@ionic-native/qr-scanner';


@IonicPage()
@Component({
  selector: 'page-qr-code-scanner',
  templateUrl: 'qr-code-scanner.html',
})
export class QrCodeScannerPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private qrScanner: QRScanner) {
  }

  ionViewDidLeave() {
    this.removeVisibilidade();
  }

  ionViewDidLoad() {
    this.adicioneVisibilidade();
    this.qrScanner.show();

    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          this.qrScanner
            .scan()
            .subscribe((text: string) => {
              alert(text);
              this.navCtrl.pop();
            });
        }
        else {
          alert("deu pau na permissao");
        }
      });
  }

  adicioneVisibilidade() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('qrCodeView');
  }

  removeVisibilidade() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('qrCodeView');
  }
}