import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private socialSharing: SocialSharing,
    private qrScanner: QRScanner) {
  }


  ionViewDidLoad() {
  }

  whatsapp() {
    let imagem = "http://hondana.com.br/wp-content/uploads/2017/10/exemplos-de-trade-marketing-900x365.jpg";
    this.socialSharing.shareViaWhatsApp("Compartilhe essa imagem ae!!!", imagem, "www.google.com.br");
  }

  insta() {
    this.socialSharing.shareViaInstagram("compartilhamento atravez do app projeto marketing", "");
  }

  qrscanner() {

    // Optionally request the permission early
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted
          alert('authorized');

          (document.getElementsByClassName("app-root")[0] as any).style = "background: none transparent !important;"

          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);
            alert(text);
            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
          });

          this.qrScanner.resumePreview();

          // show camera preview
          this.qrScanner.show()
            .then((data: QRScannerStatus) => {
              alert(data.showing);
            }, err => {
              alert(err);

            });

          // wait for user to scan something, then the observable callback will be called
        } else if (status.denied) {
          alert('denied');
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
          alert('else');
        }
      })
      .catch((e: any) => {
        alert('Error is' + e);
      });

  }
}
