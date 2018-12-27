import { NgModule } from '@angular/core';
import { Data, SplitPrimeiro, Safe, Distancia } from './pipes/pipes';
@NgModule({
	declarations: [Data, SplitPrimeiro, Safe, Distancia],
	imports: [],
	exports: [Data, SplitPrimeiro, Safe, Distancia]
})
export class PipesModule { }
