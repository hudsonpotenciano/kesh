import { NgModule } from '@angular/core';
import { CarregandoComponent } from './carregando/carregando';
import { ListaVaziaComponent } from './lista-vazia/lista-vazia';
import { CardHomeComponent } from './card-home/card-home';
import { IonicPageModule } from 'ionic-angular';
import { EmpresaLojaProvider } from '../providers/empresa-loja/empresa-loja';
@NgModule({
    declarations: [CarregandoComponent,
        ListaVaziaComponent,
        CardHomeComponent],
    imports: [
        IonicPageModule.forChild(CardHomeComponent),
    ],
    exports: [CarregandoComponent,
        ListaVaziaComponent,
        CardHomeComponent],
    providers: [
        EmpresaLojaProvider
    ]
})
export class ComponentsModule { }

