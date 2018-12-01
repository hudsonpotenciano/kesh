import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { EmpresaProvider } from '../../../providers/empresa/empresa';
import { PessoaProvider } from '../../../providers/pessoa/pessoa';
import { TransacaoProvider } from '../../../providers/transacao/transacao';
import { DTOCupomVenda } from '../../../models/models.model';


@IonicPage()
@Component({
  selector: 'page-transacoes',
  templateUrl: 'transacoes.html',
})
export class TransacoesPage {

  cuponsVendas: DTOCupomVenda[] = [];
  estaCarregando = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private transacaoProvider: TransacaoProvider,
    private popoverCtrl: PopoverController,
    private pessoaProvider: PessoaProvider,
    private empresaProvider: EmpresaProvider) {

  }

  ionViewDidEnter() {
    this.transacaoProvider.obtenhaCuponsEVendasPessoa(this.pessoaProvider.dadosAcesso.IdPessoa)
      .then((resultado: DTOCupomVenda[]) => {
        if (resultado)
          resultado.forEach(dto => {
            dto.Cupom.Expirado = this.transacaoProvider.valideCupomExpirado(dto.Cupom.DataValidade);
          });

        this.cuponsVendas = resultado;
        this.estaCarregando = false;
      })
  }

  abraQrCode(cupomVenda: DTOCupomVenda) {
    var popover = this.popoverCtrl.create("CupomPage", cupomVenda.Cupom, { enableBackdropDismiss: true, cssClass: "popover-shadow" });
    popover.present();
    // this.navCtrl.push("CupomPage", cupomVenda.Cupom);
  }

  obtenhaLogoEmpresa(idEmpresa: number) {

    return this.empresaProvider.obtenhaLogoEmpresa(idEmpresa);
  }

  abraGeracaoDeCupomViaCodigo() {
    this.navCtrl.push("CodigoCupomPessoaPage", { idPessoa: this.pessoaProvider.dadosAcesso.IdPessoa });
  }
}