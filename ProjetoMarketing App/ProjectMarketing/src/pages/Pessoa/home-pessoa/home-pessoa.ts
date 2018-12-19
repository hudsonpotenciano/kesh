import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll, ModalController, PopoverController } from 'ionic-angular';
import { PessoaProvider } from '../../../providers/pessoa/pessoa';
import { EmpresaProvider } from '../../../providers/empresa/empresa';
import { DadosPessoaEmpresa, Pessoa } from '../../../models/pessoa.model';
import { EmpresaLojaProvider } from '../../../providers/empresa-loja/empresa-loja';
import { Localizacao, RetornoRequestModel } from '../../../models/models.model';
import { UtilitariosProvider } from '../../../providers/utilitarios/utilitarios';

const tamanhoPagina = 10;

@IonicPage()
@Component({
  selector: 'page-home-pessoa',
  templateUrl: 'home-pessoa.html'
})

export class HomePessoaPage {

  pessoaEmpresas: DadosPessoaEmpresa[] = [];
  pessoaEmpresasLimit: DadosPessoaEmpresa[] = [];
  pessoa: Pessoa;
  mostrarPesquisa: boolean = false;
  estaCarregando = true;
  pagina = 0;
  minhaLocalizacao: Localizacao;
  inputPesquisa: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private popoverCtrl: PopoverController,
    private pessoaProvider: PessoaProvider,
    private empresaProvider: EmpresaProvider,
    private utilitarios: UtilitariosProvider,
    private empresaLojaProvider: EmpresaLojaProvider) {
    this.empresaProvider;
    this.empresaLojaProvider;
    this.popoverCtrl;
  }

  ionViewDidLoad() {
    document.getElementsByTagName("img")
    this.pessoaProvider.ObtenhaDadosPessoa()
      .then((pessoa: Pessoa) => {
        this.pessoa = pessoa;
        this.obtenhaEmpresas();
      }).catch(() => { });
  }

  obtenhaEmpresas() {
    this.utilitarios.obtenhaLocalizacao()
      .then((localizacao) => {
        this.minhaLocalizacao = localizacao;
        this.pessoaProvider.obtenhaPessoaEPerfilEmpresas(localizacao)
          .then((retorno: DadosPessoaEmpresa[]) => {
            this.pessoaEmpresas = retorno;
            this.pessoaEmpresasLimit = this.utilitarios.pagine(retorno, this.pagina, tamanhoPagina);
            this.pagina++;
            this.estaCarregando = false
          })
          .catch((retorno: RetornoRequestModel) => {
            retorno;
            this.estaCarregando = false;
          });
      })
      .catch(() => {
        //quer dizer que clicou em tentar novamente ou deu erro
        setTimeout(() => {
          this.obtenhaEmpresas();
        }, 1000);
      })
  }

  abraPerfilEmpresa(pessoaEmpresa: DadosPessoaEmpresa) {
    this.navCtrl.push("PerfilEmpresaPage", pessoaEmpresa);
    // if (document.documentElement.clientHeight < 1000) {
    //   var popover = this.popoverCtrl.create("PreviewPerfilEmpresaPage", { dadosPessoaEmpresa: pessoaEmpresa }, { cssClass: "popover-shadow" });
    //   popover.present();
    // }
    // else{

    //   var modal = this.modalCtrl.create("PreviewPerfilEmpresaPage", { dadosPessoaEmpresa: pessoaEmpresa });
    //   modal.present();
    // }
  }

  mostrePerfilPessoaModal() {
    this.navCtrl.push("PerfilPessoaPage");
  }

  pesquise() {
    this.mostrarPesquisa = false;
    var filtrados = this.pessoaEmpresas
      .filter(a => a.Perfil.Descricao.includes(this.inputPesquisa) || a.Empresa.Nome.includes(this.inputPesquisa));
    this.pessoaEmpresasLimit = this.utilitarios.pagine(filtrados, 0, tamanhoPagina);
  }

  doInfinite(infinit: InfiniteScroll) {
    this.pessoaEmpresasLimit = this.pessoaEmpresasLimit
      .concat(this.utilitarios.pagine(this.pessoaEmpresas, this.pagina, tamanhoPagina));
    this.pagina++;
    infinit.complete();
    if (this.pessoaEmpresasLimit.length == this.pessoaEmpresas.length)
      infinit.enable(false);
  }

  abraModalCatalogo(empresa: DadosPessoaEmpresa, evento) {
    let modal = this.modalCtrl.create("CatalogoComponentPage",
      { empresa: empresa },
      { cssClass: "popover-catalogo" });

    modal.present({ ev: evento });
  }

  vireOCard(id: number) {
    document.getElementById(id.toString()).classList.toggle("flipped");
    var front = document.getElementById('front' + id.toString());
    var back = document.getElementById('back' + id.toString());

    if (front.style.display != "none") {
      front.style.display = "none";
      back.style.display = "block";
    }
    else {
      front.style.display = "block";
      back.style.display = "none";
    }
  }
}
