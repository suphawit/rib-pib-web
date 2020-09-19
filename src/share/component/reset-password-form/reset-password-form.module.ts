import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from 'ng2-translate';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ValidationService } from '../../service/validation.service';
import { PermissionChangeRoute } from '../../service/permission.service';
import { Dateservice } from '../../service/date.service';
import { ResetPasswordFormService } from './reset-password-form.service';

import { ResetPasswordFormComponent } from './reset-password-form.component';
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
      ResetPasswordFormComponent
  ],
  exports: [
      ResetPasswordFormComponent
  ],
  providers: [
      ResetPasswordFormService,
  ]
})
export class ResetPasswordFormModule { }