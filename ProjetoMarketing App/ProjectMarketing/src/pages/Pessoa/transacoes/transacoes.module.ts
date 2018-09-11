import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransacoesPage } from './transacoes';
import { EmpresaProvider } from '../../../providers/empresa/empresa';
import { PessoaProvider } from '../../../providers/pessoa/pessoa';
import { TransacaoProvider } from '../../../providers/transacao/transacao';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    TransacoesPage,
  ],
  imports: [
    IonicPageModule.forChild(TransacoesPage),
    PipesModule
  ],
  providers:[
    TransacaoProvider,
    PessoaProvider,
    EmpresaProvider
  ]
})
export class TransacoesPageModule {}
