import { NgModule } from '@angular/core';
import { Data, SplitPrimeiro, Safe, Distancia, Time } from './pipes/pipes';
@NgModule({
	declarations: [Data, SplitPrimeiro, Safe, Distancia, Time],
	imports: [],
	exports: [Data, SplitPrimeiro, Safe, Distancia, Time]
})
export class PipesModule { }
