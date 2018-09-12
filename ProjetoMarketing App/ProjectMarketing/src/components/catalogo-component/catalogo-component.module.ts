import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CatalogoComponentPage } from './catalogo-component';
import { EmpresaLojaProvider } from '../../providers/empresa-loja/empresa-loja';

@NgModule({
  declarations: [
    CatalogoComponentPage,
  ],
  imports: [
    IonicPageModule.forChild(CatalogoComponentPage),
  ],
  providers:
  [
    EmpresaLojaProvider
  ]
})
export class CatalogoComponentPageModule {}
