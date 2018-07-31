import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContaPessoaPage } from './conta-pessoa';

@NgModule({
  declarations: [
    ContaPessoaPage,
  ],
  imports: [
    IonicPageModule.forChild(ContaPessoaPage),
  ],
  providers:[
  ]
})
export class ContaPessoaPageModule {}
