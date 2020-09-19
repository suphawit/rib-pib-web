import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from 'ng2-translate';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { VerifyAccountFormComponent } from './verify-account-form.component';
import { VerifyAccountFormService } from './verify-account-form.service';
import { ValidationService } from '../../service/validation.service';
import { DirectivesModule } from "../../directives/directives.module";

@NgModule({
  imports: [
      CommonModule, 
      FormsModule, 
      ReactiveFormsModule, 
      TranslateModule, 
      DirectivesModule,
    ],
  declarations: [
      VerifyAccountFormComponent
  ],
  exports: [
      VerifyAccountFormComponent
  ],
  providers: [
      VerifyAccountFormService,
      ValidationService
  ]
})
export class VerifyAccountFormModule { }