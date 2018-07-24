import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Cupom } from '../../../models/models.model';
import { EmpresaProvider } from '../../../providers/empresa/empresa';
import { DadosEmpresa } from '../../../models/empresa.model';

@IonicPage()
@Component({
  selector: 'page-home-empresa',
  templateUrl: 'home-empresa.html',
})
export class HomeEmpresaPage {

  dadosEmpresa: DadosEmpresa;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public empresaProvider: EmpresaProvider) {
  }

  ionViewDidLoad() {
    this.obtenhaEmpresa();
  }

  obtenhaEmpresa() {
    this.empresaProvider.obtenhaDadosEmpresa()
      .then((retorno: DadosEmpresa) => {
        this.dadosEmpresa = retorno;
      });
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
