import { Injectable } from '@angular/core';
import { PopoverController, AlertController, Platform } from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Localizacao } from '../../models/models.model';
import { StorageProvider } from '../storage/storage';
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation';

@Injectable()
export class UtilitariosProvider {

  constructor(private popoverCtrl: PopoverController,
    private alertCtrl: AlertController,
    private geolocation: Geolocation,
    private plataforma: Platform,
    private storage: StorageProvider,
    private diagnostic: Diagnostic) {
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

  getBase64Image(url: string, callback: Function) {

    let img = document.createElement("img") as HTMLImageElement;
    img.src = url;

    img.onload = () => {

      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
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
        resolve(new Localizacao(-16.7064275, -49.2078104));
        return;
      }

      var localizacaoSalva = this.storage.recupereLocalizacao();

      this.diagnostic.isLocationEnabled()
        .then((estaHabilitado: boolean) => {
          if (estaHabilitado) {

            this.diagnostic.isLocationAuthorized()
              .then((estaAutorizado) => {

                if (estaAutorizado) {
                  this.geolocation.getCurrentPosition({ enableHighAccuracy: true, timeout: 5000 } as GeolocationOptions)
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

  toastPadraoDeInternet() {
    alert("É necessario se conectar à internet para acessar essa função");
  }

  mostreToast(mensagem: string) {
    alert(mensagem);
  }

  
  mostreToastTenteNovamente() {
    alert("Ocorreu algum problema, tente novamente");
  }
}
