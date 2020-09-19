import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "ng2-translate";
import { PipesModule } from "../../../pipe/pipe.module";
import { FromAccountList } from "./from-account-list.component";

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    PipesModule
  ],
  declarations: [
    FromAccountList
  ],
  exports: [
    FromAccountList
  ]
})
export class FromAccountListModule {
}
