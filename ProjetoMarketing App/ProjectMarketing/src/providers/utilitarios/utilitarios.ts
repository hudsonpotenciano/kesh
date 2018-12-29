import { Injectable } from '@angular/core';
import { PopoverController, AlertController, Platform, LoadingController } from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Localizacao } from '../../models/models.model';
import { StorageProvider } from '../storage/storage';
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation';
import { UnidadeDeMedidaLocalizacao } from '../../models/pessoa.model';

@Injectable()
export class UtilitariosProvider {

  loadingPrimeiroCarregamento = null;
  localizacao: Localizacao = null;

  constructor(private popoverCtrl: PopoverController,
    private alertCtrl: AlertController,
    private geolocation: Geolocation,
    private plataforma: Platform,
    private loadingCtrl: LoadingController,
    private storage: StorageProvider,
    private diagnostic: Diagnostic) {
  }

  groupBy(list, fn) {

    var arrayFromObject = (obj) => {
      var arr = [];
      for (var i in obj) {
        arr.push(obj[i]);
      }
      return arr;
    }

    var groups = {};
    for (var i = 0; i < list.length; i++) {
      var group = JSON.stringify(fn(list[i]));
      if (group in groups) {
        groups[group].push(list[i]);
      } else {
        groups[group] = [list[i]];
      }
    }
    return arrayFromObject(groups);
  }

  mestrePopInformacao(informacao: string, event: any) {

    var popover = this.popoverCtrl.create("PopoverInformacaoPage",
      { informacao },
      { enableBackdropDismiss: true, cssClass: "popover-informacoes" });
    popover.present({
      ev: event,
      animate: true,
    });
  }

  gereImagemComTexto(menesagem: string) {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    ctx.font = "40pt Calibri";
    ctx.textBaseline = "alphabetic";
    ctx.textAlign = "center";
    ctx.fillText(menesagem, 100, 50);
    ctx.fillStyle = "#fcc000";
    ctx.textBaseline = 'middle';

    return canvas.toDataURL("image/png", 0.5);
  }

  gereGuid6() {
    var firstPart: any = (Math.random() * 46656) | 0;
    var secondPart: any = (Math.random() * 46656) | 0;
    firstPart = ("000" + firstPart.toString(36)).slice(-3);
    secondPart = ("000" + secondPart.toString(36)).slice(-3);
    return (firstPart + secondPart).toString().toUpperCase();
  }

  getBase64Image(url: string, callback: Function) {

    let img = document.createElement("img") as HTMLImageElement;
    img.src = url;

    img.onload = () => {

      var canvas = document.createElement("canvas");
      canvas.width = img.width > 2000 ? (img.width / 2) : img.width;
      canvas.height = img.height > 2000 ? (img.height / 2) : img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      callback(canvas.toDataURL("image/png", 0.5).replace(/^data:image\/(png|jpg);base64,/, ""));
    }
  }

  pagine(lista: Array<any>, pagina: number, tamanhoPagina: number) {
    if (!lista || lista.length < tamanhoPagina) return lista;
    return lista.slice(pagina * tamanhoPagina, (pagina + 1) * tamanhoPagina);
  }

  obtenhaLocalizacao() {
    return new Promise<Localizacao>((resolve, reject) => {

      if (!this.plataforma.is("cordova")) {
        resolve(new Localizacao(-16.6021529, -49.3181457));
        return;
      }

      var localizacaoSalva = this.storage.recupereLocalizacao();

      this.diagnostic.isLocationEnabled()
        .then((estaHabilitado: boolean) => {
          if (estaHabilitado) {

            this.diagnostic.isLocationAuthorized()
              .then((estaAutorizado) => {

                if (estaAutorizado) {
                  this.geolocation.getCurrentPosition({ enableHighAccuracy: true, timeout: 10000 } as GeolocationOptions)
                    .then((resp) => {
                      var localizacao = new Localizacao(resp.coords.latitude, resp.coords.longitude);
                      resolve(localizacao);
                      this.storage.armazeneLocalizacao(localizacao);
                    })
                    .catch(() => {
                      this.RetorneSePossuiLocalizacao(localizacaoSalva, resolve, reject);
                    });
                }
                else {
                  this.RetorneSePossuiLocalizacao(localizacaoSalva, resolve, reject);
                }
              })
              .catch(() => {
                this.RetorneSePossuiLocalizacao(localizacaoSalva, resolve, reject);
              });
          }
          else {
            this.RetorneSePossuiLocalizacao(localizacaoSalva, resolve, reject);
          }
        }).catch(() => {
          this.RetorneSePossuiLocalizacao(localizacaoSalva, resolve, reject);
        });
    });
  }

  private RetorneSePossuiLocalizacao(localizacaoSalva: Localizacao, resolve: (value?: Localizacao | PromiseLike<Localizacao>) => void, reject: (reason?: any) => void) {
    if (localizacaoSalva != null)
      resolve(localizacaoSalva);
    else
      this.mostreAlertaDeLocalizacao(reject);
  }

  mostreAlertaDeLocalizacao(callback: Function) {

    var alerta = this.alertCtrl
      .create(({
        enableBackdropDismiss: false,
        title: "Não foi possivel obter a sua localização",
        message: "<p>Ative e/ou permita o uso do GPS</p>",
        buttons: [{
          text: "Tentar novamente", handler: () => {
            if (alerta) {
              alerta.dismiss().then().catch();
              alerta = null
            }
            callback();
          }
        }, {
          text: "Permissão", handler: () => {
            this.diagnostic.requestLocationAuthorization()
              .then(() => { callback(); })
              .catch(() => { callback(); })
          }
        }]
      }));

    alerta.present();
  }

  bloqueiaBotaoPromise(idElemento: string) {
    var elemento = document.getElementById(idElemento);
    elemento.innerHTML = "<img src='../assets/svg/loading.svg'>"
  }

  mostreToast(mensagem: string) {
    var alerta = this.alertCtrl.create({
      cssClass: "alertaPadrao",
      enableBackdropDismiss: true,
      message: `<p>${mensagem}</p>`
    });

    alerta.present();
    setTimeout(() => {
      alerta.dismiss();
    }, 5000);
  }

  mostreMensagemSucesso(mensagem) {
    var alerta = this.alertCtrl.create({
      cssClass: "alertaMensagem sucesso",
      enableBackdropDismiss: true,
      message: `<img src='./assets/svg/emojisucesso.svg'>
                <p>${mensagem}</p>`
    });

    alerta.present();
    setTimeout(() => {
      alerta.dismiss();
    }, 5000);
  }

  mostreMensagemErro(mensagem) {

    var alerta = this.alertCtrl.create({
      cssClass: "alertaMensagem erro",
      enableBackdropDismiss: true,
      message: `<img src='./assets/svg/emojierro.svg'>
                <p>${mensagem}</p>`
    });

    alerta.present();
    setTimeout(() => {
      alerta.dismiss();
    }, 5000);
  }

  obtenhaPorcentagemAvaliacao(nota: number) {
    return (nota / 5) * 100;
  }

  mostreAlertaCarregando(mensagem?: string) {
    this.loadingPrimeiroCarregamento = this.loadingCtrl.create({
      content: mensagem ? mensagem : "Salvando seus dados, aguarde um instante."
    });

    this.loadingPrimeiroCarregamento.present();
  }

  removaAlertaCarregando() {
    if (this.loadingPrimeiroCarregamento)
      this.loadingPrimeiroCarregamento.dismiss();
  }

  facaPerguntaSimNao(mensagem, sim, nao) {
    var alerta = this.alertCtrl.create({
      message: mensagem,
      enableBackdropDismiss: false,
      buttons: [{ text: "Não", handler: nao }, { text: "Sim", handler: sim }]
    });

    alerta.present();
  }

  calculeDistancia(lat1, lon1, unit : UnidadeDeMedidaLocalizacao) {
    if ((lat1 == this.localizacao.Latitude) && (lon1 == this.localizacao.Longitude)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1 / 180;
      var radlat2 = Math.PI * parseFloat(this.localizacao.Latitude) / 180;
      var theta = lon1 - parseFloat(this.localizacao.Longitude);
      var radtheta = Math.PI * theta / 180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == UnidadeDeMedidaLocalizacao.Kilometros) { dist = dist * 1.609344 }
      return dist;
    }
  }
}