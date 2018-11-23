import { Injectable } from '@angular/core';
import { PopoverController, AlertController } from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Localizacao } from '../../models/models.model';
import { StorageProvider } from '../storage/storage';
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation';

@Injectable()
export class UtilitariosProvider {

  constructor(private popoverCtrl: PopoverController,
    private alertCtrl: AlertController,
    private geolocation: Geolocation,
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
      this.diagnostic.isLocationEnabled()
        .then((estaHabilitado: boolean) => {
          if (estaHabilitado) {
            debugger;
            this.diagnostic.isLocationAuthorized()
              .then((estaAutorizado) => {
                debugger;
                if (estaAutorizado) {
                  this.geolocation.getCurrentPosition({ enableHighAccuracy: true, timeout: 1000 } as GeolocationOptions)
                    .then((resp) => {
                      var localizacao = new Localizacao(resp.coords.latitude, resp.coords.longitude);
                      resolve(localizacao);
                      this.storage.armazeneLocalizacao(localizacao);
                    })
                    .catch((error) => {
                      console.log(error);
                      var localizacaoSalva = this.storage.recupereLocalizacao();
                      if (localizacaoSalva != null) resolve(localizacaoSalva);
                      else {
                        this.mostreAlertaDeLocalizacao(reject);
                      }
                    });
                }
                else {
                  this.mostreAlertaDeLocalizacao(reject, true);
                }
              })
              .catch(() => {
                this.mostreAlertaDeLocalizacao(reject, true);
              });
          }
          else {
            this.mostreAlertaDeLocalizacao(reject);
          }
        }).catch(() => {
          this.mostreAlertaDeLocalizacao(reject);
        });
    });
  }

  mostreAlertaDeLocalizacao(handler: Function, pedirPermissao: boolean = false) {
    var botaoTentar = {
      text: "Tentar novamente", handler: () => {
        if (alerta) {
          alerta.dismiss().then().catch();
          alerta = null
        }
        handler();
      }
    };

    var alerta = this.alertCtrl
      .create(({
        enableBackdropDismiss: false,
        message: "<h3> Por favor dê permissão e/ou ative a localização </h3>",
        buttons: pedirPermissao ? [{
          text: "Dar permissão", handler: () => {
            this.diagnostic.requestLocationAuthorization()
              .then(() => {
                handler();
              })
          }
        }, botaoTentar] : [botaoTentar]
      }));

    alerta.present();
  }
}
