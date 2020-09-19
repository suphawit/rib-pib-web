import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "ng2-translate";
import { PaginationComponent } from "./pagination.component";
import { PipesModule } from "../../pipe/pipe.module";
import { DirectivesModule } from "../../directives/directives.module";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    PipesModule,
    DirectivesModule,
    FormsModule
  ],
  declarations: [
    PaginationComponent
  ],
  exports: [
    PaginationComponent
  ]
})
export class PaginationModule {
}
