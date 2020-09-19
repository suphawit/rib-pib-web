import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from 'ng2-translate';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatepickerModule as MaterialDatepicker } from 'ng2-datepicker';
import { ResponsiveModule } from 'ng2-responsive';

import { VerifyOTPModule } from '../../verify-otp/verify-otp.module';

import { InputDetails } from './input-details.component';
import { Confirm } from './confirm.component';
import { Complete } from './complete.component';
import { TermDepositInputDetails } from "./td-input-details.component";
import { TermDepositConfirm } from "./td-confirm.component";
import { TermDepositComplete } from "./td-complete.component";
import { PipesModule } from "../../../pipe/pipe.module";
import { DirectivesModule } from "../../../directives/directives.module";

@NgModule({
  imports: [
      CommonModule, 
      FormsModule, 
      ReactiveFormsModule, 
      PipesModule,
      DirectivesModule,
      TranslateModule, 
      MaterialDatepicker,
      ResponsiveModule, 
      VerifyOTPModule,
    ],
    declarations: [
        InputDetails,
        Confirm,
        Complete,
        TermDepositInputDetails,
        TermDepositConfirm,
        TermDepositComplete
    ],
    exports: [
        InputDetails,
        Confirm,
        Complete,
        TermDepositInputDetails,
        TermDepositConfirm,
        TermDepositComplete
    ],
    providers: [
    ]
})
export class StepProcessModule { }