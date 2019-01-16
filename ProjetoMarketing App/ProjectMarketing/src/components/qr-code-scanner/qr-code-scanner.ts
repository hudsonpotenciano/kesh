import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { QRScannerStatus, QRScanner } from '@ionic-native/qr-scanner';
import { TransacaoProvider } from '../../providers/transacao/transacao';
import { DTOCupomParaVenda } from '../../models/pessoa.model';
import { UtilitariosProvider } from '../../providers/utilitarios/utilitarios';


@IonicPage()
@Component({
  selector: 'page-qr-code-scanner',
  templateUrl: 'qr-code-scanner.html',
})
export class QrCodeScannerPage {

  idPerfilEmpresa: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private qrScanner: QRScanner,
    private utilitarios: UtilitariosProvider,
    private transacaoProvider: TransacaoProvider) {
    this.idPerfilEmpresa = this.navParams.get("idPerfilEmpresa");
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
        }
      });
  }

  valideCupom(text: string) {
    //exiba carregando
    this.transacaoProvider.obtenhaCupomPeloToken(text, this.idPerfilEmpresa)
      .then((cupom: DTOCupomParaVenda) => {
        this.viewCtrl.dismiss(cupom);
        this.removeVisibilidade();
      }).catch(() => {
        this.utilitarios.mostreMensagemErro("Cupom inválido");
        this.viewCtrl.dismiss();
        this.removeVisibilidade();
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

  voltar(){
    this.viewCtrl.dismiss();
    this.removeVisibilidade();
  }
}