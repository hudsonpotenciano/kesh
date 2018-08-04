import { Injectable } from '@angular/core';
import { PopoverController } from 'ionic-angular';

@Injectable()
export class UtilitariosProvider {

  constructor(private popoverCtrl: PopoverController) {
  }
  
  mestrePopInformacao(informacao: string, event: any) {
    var popover = this.popoverCtrl.create("PopoverInformacaoPage", {informacao});
    popover.present({
      ev: event
    });
  }
}
