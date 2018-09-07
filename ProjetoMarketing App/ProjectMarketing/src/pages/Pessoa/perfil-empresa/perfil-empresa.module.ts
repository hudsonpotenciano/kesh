import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PerfilEmpresaPage } from './perfil-empresa';
import { PessoaProvider } from '../../../providers/pessoa/pessoa';
import { EmpresaProvider } from '../../../providers/empresa/empresa';
import { TransacaoProvider } from '../../../providers/transacao/transacao';
import { StorageTransacaoProvider } from '../../../providers/storage/storage-transacao';
import { SocialSharing } from '../../../../node_modules/@ionic-native/social-sharing';
import { PipesModule } from '../../../pipes/pipes.module';
import { EmpresaLojaProvider } from '../../../providers/empresa-loja/empresa-loja';
import { PhotoViewer } from '@ionic-native/photo-viewer';

@NgModule({
  declarations: [
    PerfilEmpresaPage,
  ],
  imports: [
    IonicPageModule.forChild(PerfilEmpresaPage),
    PipesModule
  ],
  providers: [
    PessoaProvider,
    EmpresaProvider,
    TransacaoProvider,
    StorageTransacaoProvider,
    SocialSharing,
    PhotoViewer,
    EmpresaLojaProvider
  ]
})
export class PerfilEmpresaPageModule { }
