import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroEmpresaPage } from './cadastro-empresa';
import { EmpresaProvider } from '../../../providers/empresa/empresa';
import { IconeInformacaoModule } from '../../../components/icone-informacao/icone-informacao.module';
import { TranslateModule } from '../../../../node_modules/@ngx-translate/core';

@NgModule({
  declarations: [
    CadastroEmpresaPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroEmpresaPage),
    IconeInformacaoModule,
    TranslateModule.forChild()
  ],
  providers: [
    EmpresaProvider
  ]
})
export class CadastroEmpresaPageModule {}
