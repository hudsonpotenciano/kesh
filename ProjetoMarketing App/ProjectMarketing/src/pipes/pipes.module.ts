import { NgModule } from '@angular/core';
import { Data, SplitPrimeiro, Safe } from './pipes/pipes';
@NgModule({
	declarations: [Data, SplitPrimeiro, Safe],
	imports: [],
	exports: [Data, SplitPrimeiro, Safe]
})
export class PipesModule { }
