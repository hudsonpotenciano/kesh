import { NgModule } from '@angular/core';
import { Data, SplitPrimeiro } from './pipes/pipes';
@NgModule({
	declarations: [Data,SplitPrimeiro],
	imports: [],
	exports: [Data, SplitPrimeiro]
})
export class PipesModule { }
