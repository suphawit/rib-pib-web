import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "ng2-translate";
import { PortletsMenuComponent } from "./portlets-menu.component";

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
  ],
  declarations: [
    PortletsMenuComponent
  ],
  exports: [
    PortletsMenuComponent
  ]
})
export class PortietsMenuModule {
}
