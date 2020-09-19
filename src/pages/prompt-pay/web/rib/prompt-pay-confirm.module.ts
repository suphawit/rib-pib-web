import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from 'ng2-translate';

import { AlertMessageModule } from '../../../../share/component/alert-message/alert-message.module';
import { StepWizardModule } from '../../../../share/component/step-wizard/step-wizard.module';
import { VerifyOTPModule } from '../../../../share/component/verify-otp/verify-otp.module';

import { RIBWebPromptPayRegisterConfirmComponent } from './rib-web-prompt-pay-register-confirm.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    AlertMessageModule,
    StepWizardModule,
    VerifyOTPModule
  ],
  declarations: [
      RIBWebPromptPayRegisterConfirmComponent
  ],
  exports: [
      RIBWebPromptPayRegisterConfirmComponent
  ],
})
export class PromptPayConfirmModule {}