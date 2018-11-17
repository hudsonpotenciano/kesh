import { NgModule } from '@angular/core';
import { CarregandoComponent } from './carregando/carregando';
import { ListaVaziaComponent } from './lista-vazia/lista-vazia';
@NgModule({
	declarations: [CarregandoComponent,
    ListaVaziaComponent],
	imports: [],
	exports: [CarregandoComponent,
    ListaVaziaComponent]
})
export class ComponentsModule { }

