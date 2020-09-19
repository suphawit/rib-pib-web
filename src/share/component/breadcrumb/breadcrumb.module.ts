import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "ng2-translate";
import { BreadcrumbComponent } from "./breadcrumb.component";

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
  ],
  declarations: [
    BreadcrumbComponent
  ],
  exports: [
    BreadcrumbComponent,
  ]
})
export class BreadcrumbModule {
}
