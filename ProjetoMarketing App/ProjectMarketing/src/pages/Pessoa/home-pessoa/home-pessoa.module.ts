import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePessoaPage } from './home-pessoa';
import { PessoaProvider } from '../../../providers/pessoa/pessoa';

@NgModule({
  declarations: [
    HomePessoaPage,
  ],
  imports: [
    IonicPageModule.forChild(HomePessoaPage),
  ],
  providers:
  [
    PessoaProvider
  ]
})
export class HomePessoaPageModule {}
