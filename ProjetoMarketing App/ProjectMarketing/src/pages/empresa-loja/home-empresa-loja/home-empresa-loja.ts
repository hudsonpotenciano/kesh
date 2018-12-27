import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App, Events } from 'ionic-angular';
import { DTOCupomVenda } from '../../../models/models.model';
import { DadosEmpresaLoja } from '../../../models/empresa.model';
import { TransacaoProvider } from '../../../providers/transacao/transacao';
import { EmpresaLojaProvider } from '../../../providers/empresa-loja/empresa-loja';
import { PessoaProvider } from '../../../providers/pessoa/pessoa';
import { EmpresaProvider } from '../../../providers/empresa/empresa';
import { DTOCupomParaVenda } from '../../../models/pessoa.model';
import { UtilitariosProvider } from '../../../providers/utilitarios/utilitarios';

@IonicPage()
@Component({
  selector: 'page-home-empresa-loja',
  templateUrl: 'home-empresa-loja.html',
})
export class HomeEmpresaLojaPage {

  dadosEmpresa: DadosEmpresaLoja;
  cuponsVendas: DTOCupomVenda[];
  estaCarregando = true;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private app: App,
    private events: Events,
    public empresaLojaProvider: EmpresaLojaProvider,
    public modalCtrl: ModalController,
    private utilitarios: UtilitariosProvider,
    private transacaoProvider: TransacaoProvider,
    private pessoaProvider: PessoaProvider,
    private empresaProvider: EmpresaProvider) {
    this.empresaLojaProvider;
    this.empresaProvider;
    this.pessoaProvider;

    this.events.subscribe("atualizar-obtenhaCuponsEVendas", () => {
      this.obtenhaCuponsEVendas(true);
    });
  }

  ionViewDidLoad() {
    this.obtenhaEmpresa();
  }

  obtenhaEmpresa() {
    this.utilitarios.mostreAlertaCarregando("Buscando as vendas da loja, aguarde um instante.");

    this.empresaLojaProvider.obtenhaDadosEmpresaLoja()
      .then((retorno: DadosEmpresaLoja) => {
        this.dadosEmpresa = retorno;
        this.obtenhaCuponsEVendas();
      })
      .catch(() => {
        this.utilitarios.removaAlertaCarregando();
        this.utilitarios.mostreMensagemErro("Ocorreu um erro ao carregar os dados, puxe a lista para baixo e tente novamente");
      })
  }

  obtenhaCuponsEVendasComRefesh(refresh) {
    this.transacaoProvider.obtenhaCuponsEVendasEmpresa(this.dadosEmpresa.Perfil.IdPerfilEmpresa, refresh !== undefined)
      .then((retorno: any) => {
        this.cuponsVendas = retorno;
        if (refresh)
          refresh.complete();
      }).catch(() => {
        if (refresh)
          refresh.complete();
      });
  }

  obtenhaCuponsEVendas(desconsiderarCache: boolean = false) {
    this.transacaoProvider.obtenhaCuponsEVendasEmpresa(this.dadosEmpresa.Perfil.IdPerfilEmpresa, desconsiderarCache)
      .then((retorno: any) => {
        this.cuponsVendas = retorno;
        this.utilitarios.removaAlertaCarregando();
        this.estaCarregando = false;
      }).catch(() => {
        this.utilitarios.removaAlertaCarregando();
        this.utilitarios.mostreMensagemErro("Ocorreu um erro ao carregar os dados, puxe a lista para baixo e tente novamente");
        this.estaCarregando = false;
      });
  }

  valideCupomVenda() {
    var modal = this.modalCtrl.create("QrCodeScannerPage", { idPerfilEmpresa: this.dadosEmpresa.Perfil.IdPerfilEmpresa });
    modal.present();

    modal.onDidDismiss((cupom: DTOCupomParaVenda) => {
      if (!cupom) return;
      this.app.getRootNavs()[0].push("VendaPage", cupom);
    });
  }

  obtenhaFotoPessoa(idPessoa) {
    return this.pessoaProvider.obtenhaFotoPessoa(idPessoa);
  }
}
