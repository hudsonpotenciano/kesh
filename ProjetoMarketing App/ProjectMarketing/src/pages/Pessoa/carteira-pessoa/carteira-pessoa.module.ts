import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarteiraPessoaPage } from './carteira-pessoa';
import { PessoaProvider } from '../../../providers/pessoa/pessoa';
import { EmpresaProvider } from '../../../providers/empresa/empresa';
import { PipesModule } from '../../../pipes/pipes.module';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    CarteiraPessoaPage,
  ],
  imports: [
    IonicPageModule.forChild(CarteiraPessoaPage),
    PipesModule,
    ComponentsModule
  ],
  providers:
  [
    PessoaProvider,
    EmpresaProvider
  ]
})
export class CarteiraPessoaPageModule {}
