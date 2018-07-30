import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { QRScannerStatus, QRScanner } from '@ionic-native/qr-scanner';
import { TransacaoProvider } from '../../providers/transacao/transacao';
import { Cupom } from '../../models/models.model';


@IonicPage()
@Component({
  selector: 'page-qr-code-scanner',
  templateUrl: 'qr-code-scanner.html',
})
export class QrCodeScannerPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private qrScanner: QRScanner,
    private transacaoProvider: TransacaoProvider) {
  }

  ionViewDidLeave() {
    this.removeVisibilidade();
  }

  ionViewDidLoad() {


    this.inicialize();
  }

  inicialize() {
    this.adicioneVisibilidade();
    this.qrScanner.show();

    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          this.qrScanner
            .scan()
            .subscribe((text: string) => {

              this.valideCupom(text);
            });
        }
        else {
          alert("deu pau na permissao");
        }
      });
  }

  valideCupom(text: string) {
    //exiba carregando
    this.transacaoProvider.ObtenhaCupomPeloToken(text)
      .then((cupom: Cupom) => {
        debugger;
        this.viewCtrl.dismiss(cupom);
      }).catch(() => {
        alert("cupom invalido!");
        this.viewCtrl.dismiss();
      });
  }

  adicioneVisibilidade() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('qrCodeView');
    (window.document.getElementById('home-container') as HTMLElement).style.display = "none";
  }

  removeVisibilidade() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('qrCodeView');
    (window.document.getElementById('home-container') as HTMLElement).style.display = "block";
  }
}