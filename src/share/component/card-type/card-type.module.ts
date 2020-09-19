import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "ng2-translate";
import { CardType } from "./card-type.component";

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
  ],
  declarations: [
    CardType
  ],
  exports: [
    CardType,
  ]
})
export class CardTypeModule {
}
