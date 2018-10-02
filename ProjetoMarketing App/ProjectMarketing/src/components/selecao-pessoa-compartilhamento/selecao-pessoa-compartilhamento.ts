import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
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

  pessoas: Pessoa[] = [];
  pessoasSelecionadas: Pessoa[] = [];

  constructor(public viewCtrl: ViewController,
    public navParams: NavParams,
    private pessoaProvider: PessoaProvider,
    private geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    this.obtenhaLocalizacaoAtual()
      .then((localizacao:Localizacao) => {
        this.pessoaProvider.obtenhaPessoasCompartilhamento(this.navParams.get('idPerfilEmpresa'),localizacao)
          .then((pessoas: Pessoa[]) => {
            console.log(pessoas);
            this.pessoas = pessoas;
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

    return new Promise<Localizacao>((resolve) => {
      // this.geolocation.getCurrentPosition().then((resp) => {
      //   resolve(new Localizacao(resp.coords.latitude, resp.coords.longitude));
      //   alert("peguei a localizacao");
      // }).catch((error) => {
      //   alert("Erro ao obter localização atual");
      //   console.log(error);
      // });
      this.geolocation;
      resolve(new Localizacao(-16.7064275, -49.2078104));
      //  resolve(new Localizacao(-16.7064275, -49.2078104));
    });
  }
}
