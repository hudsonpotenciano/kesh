import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsPessoaPage } from './tabs-pessoa';

@NgModule({
  declarations: [
    TabsPessoaPage
  ],
  imports: [
    IonicPageModule.forChild(TabsPessoaPage)
  ]
})
export class TabsPessoaPageModule { }
