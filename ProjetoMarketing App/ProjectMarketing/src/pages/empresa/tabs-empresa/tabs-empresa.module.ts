import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsEmpresaPage } from './tabs-empresa';

@NgModule({
  declarations: [
    TabsEmpresaPage,
  ],
  imports: [
    IonicPageModule.forChild(TabsEmpresaPage),
  ],
})
export class TabsEmpresaPageModule {}
