import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Cupom } from '../../../models/models.model';

@IonicPage()
@Component({
  selector: 'page-home-empresa',
  templateUrl: 'home-empresa.html',
})
export class HomeEmpresaPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
  }

  valideCupomVenda() {
    var modal = this.modalCtrl.create("QrCodeScannerPage");
    modal.present();

    modal.onDidDismiss((cupom: Cupom) => {
      if (!cupom) return;

      this.navCtrl.push("VendaPage", cupom);

    });
  }
}
