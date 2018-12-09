import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CatalogoComponentPage } from './catalogo-component';
import { EmpresaLojaProvider } from '../../providers/empresa-loja/empresa-loja';
import { SocialSharing } from '@ionic-native/social-sharing';
import { PessoaProvider } from '../../providers/pessoa/pessoa';
import { UtilitariosProvider } from '../../providers/utilitarios/utilitarios';

@NgModule({
  declarations: [
    CatalogoComponentPage,
  ],
  imports: [
    IonicPageModule.forChild(CatalogoComponentPage),
  ],
  providers:
  [
    EmpresaLojaProvider,
    PessoaProvider,
    UtilitariosProvider,
    SocialSharing
  ]
})
export class CatalogoComponentPageModule {}
