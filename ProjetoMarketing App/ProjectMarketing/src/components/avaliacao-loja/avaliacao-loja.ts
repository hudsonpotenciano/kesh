import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { UtilitariosProvider } from '../../providers/utilitarios/utilitarios';

@IonicPage()
@Component({
  selector: 'avaliacao-loja',
  templateUrl: 'avaliacao-loja.html'
})
export class AvaliacaoLojaComponent {

  comentario: string = "";
  nota: number = 0;
  somenteVisualizacao: boolean = true;
  constructor(
    private utilitarios: UtilitariosProvider,
    private navParamns: NavParams,
    private viewCtrl: ViewController) {
    this.nota = this.navParamns.get("nota");
    this.comentario = this.navParamns.get("comentario");
    this.somenteVisualizacao = this.nota != null && this.comentario != null;

    if (this.somenteVisualizacao) {
      setTimeout(() => {
        var porcentam = this.utilitarios.obtenhaPorcentagemAvaliacao(this.nota);
        document.getElementById("estelas-nota").style.width = porcentam + "%";
      }, 1000);
    }
  }

  altereNota(nota: number) {
    this.nota = nota;
    var porcentam = this.utilitarios.obtenhaPorcentagemAvaliacao(nota);
    document.getElementById("estelas-nota").style.width = porcentam + "%";
  }

  avalie() {

    if (this.nota < 1) {
      this.utilitarios.mostreToast("Dê uma nota");
      return;
    }
    if (this.comentario === "") {
      this.utilitarios.mostreToast("Você precisa comentar algo para avaliar");
      return;
    }
    this.viewCtrl.dismiss({ Nota: this.nota, Comentario: this.comentario });
  }
}
