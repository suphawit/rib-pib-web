import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from 'ng2-translate';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardTypeModule } from '../card-type/card-type.module';

import { VerifyRefCodeComponent } from './verify-ref-code.component';
import { VerifyRefCodeService } from './verify-ref-code.service';
import { DirectivesModule } from "../../directives/directives.module";

@NgModule({
  imports: [
      CommonModule, 
      FormsModule, 
      ReactiveFormsModule, 
      TranslateModule, 
      CardTypeModule,
      DirectivesModule
    ],
  declarations: [
      VerifyRefCodeComponent
  ],
  exports: [
      VerifyRefCodeComponent
  ],
  providers: [
      VerifyRefCodeService
  ]
})
export class VerifyRefCodeModule { }