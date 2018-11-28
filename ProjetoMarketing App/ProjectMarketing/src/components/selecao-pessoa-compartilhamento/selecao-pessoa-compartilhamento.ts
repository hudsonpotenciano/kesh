import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, Platform } from 'ionic-angular';
import { PessoaProvider } from '../../providers/pessoa/pessoa';
import { Pessoa } from '../../models/pessoa.model';
import { Localizacao } from '../../models/models.model';
import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-selecao-pessoa-compartilhamento',
  templateUrl: 'selecao-pessoa-compartilhamento.html',
})
export class SelecaoPessoaCompartilhamentoPage {

  idPerfilEmpresa: number;
  pessoas: Pessoa[] = [];
  pessoasSelecionadas: Pessoa[] = [];
  carregando = true;

  constructor(public viewCtrl: ViewController,
    public navParams: NavParams,
    private pessoaProvider: PessoaProvider,
    private geolocation: Geolocation,
    private platform: Platform) {
    this.idPerfilEmpresa = this.navParams.get("idPerfilEmpresa");
  }

  ionViewDidEnter() {
    this.obtenhaLocalizacaoAtual()
      .then((localizacao: Localizacao) => {
        this.pessoaProvider.obtenhaPessoasCompartilhamento(this.navParams.get('idPerfilEmpresa'), localizacao)
          .then((pessoas: Pessoa[]) => {
            this.pessoas = pessoas;
            this.carregando = false;
          });
      });
  }

  selecione(pessoa: Pessoa) {
    if (this.pessoasSelecionadas.find(p => p.IdPessoa == pessoa.IdPessoa))
      this.pessoasSelecionadas = this.pessoasSelecionadas.filter(p => p.IdPessoa != pessoa.IdPessoa);
    else
      this.pessoasSelecionadas.push(pessoa);
  }

  estaSelecionado(pessoa: Pessoa) {
    return this.pessoasSelecionadas.find(p => p.IdPessoa == pessoa.IdPessoa);
  }

  retorneSelecionados() {
    this.viewCtrl.dismiss(this.pessoasSelecionadas);
  }

  obtenhaLocalizacaoAtual() {

    if (this.platform.is("cordova")) {

      return new Promise<Localizacao>((resolve) => {
        this.geolocation.getCurrentPosition()
          .then((resp) => {
            resolve(new Localizacao(resp.coords.latitude, resp.coords.longitude));
            alert("peguei a localizacao");
          })
          .catch((error) => {
            alert("Erro ao obter localização atual");
            console.log(error);
          });
      });
    }
    else {
      return Promise.resolve(new Localizacao(-16.7064275, -49.2078104));
    }
  }
}