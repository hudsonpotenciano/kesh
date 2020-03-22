import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, App, Events } from 'ionic-angular';
import { EmpresaProvider } from '../../../providers/empresa/empresa';
import { PessoaProvider } from '../../../providers/pessoa/pessoa';
import { TransacaoProvider } from '../../../providers/transacao/transacao';
import { DTOCupomVenda } from '../../../models/models.model';
import { UtilitariosProvider } from '../../../providers/utilitarios/utilitarios';
import { EnumeradorDeCacheStoragePessoa } from '../../../models/enumeradores.model';
import { StorageProvider } from '../../../providers/storage/storage';

@IonicPage()
@Component({
  selector: 'page-transacoes',
  templateUrl: 'transacoes.html',
})
export class TransacoesPage {

  cuponsVendasAgrupados: DTOCupomVenda[][] = [[]];
  estaCarregando = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private transacaoProvider: TransacaoProvider,
    private app: App,
    private events: Events,
    private popoverCtrl: PopoverController,
    private storage: StorageProvider,
    private pessoaProvider: PessoaProvider,
    private utilitarios: UtilitariosProvider,
    private empresaProvider: EmpresaProvider) {
    this.events.subscribe("atualizar-obtenhaTransacoes", () => {
      this.obtenhaTransacoes(true);
    });
  }

  ionViewDidLoad() {
    setTimeout(() => {
      if (sessionStorage.getItem("abriunotificacao") === "true") {
        this.obtenhaTransacoes(undefined, true);
        alert("notificacao");
      }
    }, 1000);
  }

  ionViewDidEnter() {
    this.obtenhaTransacoes();
  }

  obtenhaTransacoes(refresh?, desconsiderarCache = false) {
    this.transacaoProvider.obtenhaCuponsEVendasPessoa(this.pessoaProvider.dadosAcesso.IdPessoa, (refresh !== undefined || desconsiderarCache))
      .then((resultado: DTOCupomVenda[]) => {
        if (resultado)
          resultado.forEach(dto => {
            dto.Cupom.Expirado = this.transacaoProvider.valideCupomExpirado(dto.Cupom.DataValidade);
          });

        if (refresh)
          refresh.complete();

        resultado.sort(function (a, b) { return b.Cupom.Data.getTime() - a.Cupom.Data.getTime() });

        this.cuponsVendasAgrupados = this.utilitarios
          .groupBy(resultado, function (item: DTOCupomVenda) {
            return [new Date(item.Cupom.DataValidade).toLocaleDateString()]
          }) as [DTOCupomVenda[]];

        this.estaCarregando = false;
      })
      .catch(() => {

        if (refresh)
          refresh.complete();
      })
  }

  abraQrCode(cupomVenda: DTOCupomVenda) {
    var popover = this.popoverCtrl.create("CupomPage", cupomVenda.Cupom, { enableBackdropDismiss: true, cssClass: "popover-shadow" });
    popover.present();
    popover.onDidDismiss(() => {
      this.obtenhaTransacoes(true);
      var enumeradorDeCache = new EnumeradorDeCacheStoragePessoa().obtenhaDadosPessoaLojas;
      this.storage.remova(enumeradorDeCache.Descricao);
    });
  }

  obtenhaLogoEmpresa(idEmpresa: string) {
    return this.empresaProvider.obtenhaLogoEmpresa(idEmpresa);
  }

  abraGeracaoDeCupomViaCodigo() {
    this.app.getRootNavs()[0].push("CodigoCupomPessoaPage", { idPessoa: this.pessoaProvider.dadosAcesso.IdPessoa });
  }
}