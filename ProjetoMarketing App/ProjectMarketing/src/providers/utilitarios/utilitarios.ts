import { Injectable } from '@angular/core';
import { PopoverController } from 'ionic-angular';

@Injectable()
export class UtilitariosProvider {

  constructor(private popoverCtrl: PopoverController) {
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
}
