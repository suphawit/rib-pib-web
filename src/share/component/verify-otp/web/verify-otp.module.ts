import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from 'ng2-translate';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { VerifyOtpComponent } from './verify-otp.component';
import { OtpService } from '../otp.service';
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
      VerifyOtpComponent
  ],
  exports: [
      VerifyOtpComponent
  ],
  providers: [
  ]
})
export class VerifyOTPModule {
    static forRoot(): ModuleWithProviders { return {ngModule: VerifyOTPModule, providers: [OtpService]}; }
 }