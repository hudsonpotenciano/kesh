import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { PessoaProvider } from '../../providers/pessoa/pessoa';
import { UtilitariosProvider } from '../../providers/utilitarios/utilitarios';

@IonicPage()
@Component({
  selector: 'page-alterar-senha-pessoa',
  templateUrl: 'alterar-senha-pessoa.html',
})
export class AlterarSenhaPessoaPage {

  novasenha: string;
  confirmacao: string;

  constructor(public navCtrl: NavController,
    private viewCtrl: ViewController,
    private utilitarios: UtilitariosProvider,
    private pessoaProvider: PessoaProvider,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  voltar() {
    this.viewCtrl.dismiss();
  }

  altereSenha() {
    this.utilitarios.mostreAlertaCarregando("Alterando a senha, aguarde um instante");
    if (!this.podeAlterar()) return;
    this.pessoaProvider.AltereSenhaPessoa(this.novasenha, this.confirmacao)
      .then(() => {
        this.utilitarios.removaAlertaCarregando();
        this.utilitarios.mostreMensagemSucesso("Senha alterada com sucesso");
      }).catch(() => {
        this.utilitarios.removaAlertaCarregando();
        this.utilitarios.mostreMensagemErro("Não foi possivel alterar a senha, tente novamente");
      })
  }

  podeAlterar() {
    return true;
  }
}
