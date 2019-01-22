import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TutorialPessoaPage } from './tutorial-pessoa';

@NgModule({
  declarations: [
    TutorialPessoaPage,
  ],
  imports: [
    IonicPageModule.forChild(TutorialPessoaPage),
  ],
})
export class TutorialPessoaPageModule {}
