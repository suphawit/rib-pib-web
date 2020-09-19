import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from 'ng2-translate';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatepickerModule as MaterialDatepicker } from 'ng2-datepicker';

import { CardTypeModule } from '../card-type/card-type.module';

import { RequestReferenceFormService } from './request-reference-form.service';

import { RequestReferenceFormComponent } from './request-reference-form.component';
import { PipesModule } from "../../pipe/pipe.module";
import { DirectivesModule } from "../../directives/directives.module";

@NgModule({
  imports: [
      CommonModule, 
      FormsModule, 
      ReactiveFormsModule, 
      TranslateModule, 
      PipesModule,
      MaterialDatepicker, 
      CardTypeModule, 
      DirectivesModule
    ],
  declarations: [
      RequestReferenceFormComponent
  ],
  exports: [
      RequestReferenceFormComponent
  ],
  providers: [
      RequestReferenceFormService,
  ]
})
export class RequestReferenceFormModule { }