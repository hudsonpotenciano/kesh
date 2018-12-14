import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AvaliacaoLojaComponent } from './avaliacao-loja';
import { UtilitariosProvider } from '../../providers/utilitarios/utilitarios';

@NgModule({
  declarations: [
    AvaliacaoLojaComponent,
  ],
  imports: [
    IonicPageModule.forChild(AvaliacaoLojaComponent),
  ],
  providers:
  [
    UtilitariosProvider
  ]
})
export class AvaliacaoLojaComponentModule {}
