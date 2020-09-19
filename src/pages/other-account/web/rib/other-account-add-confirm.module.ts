import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from 'ng2-translate';

import { AlertMessageModule } from '../../../../share/component/alert-message/alert-message.module';
import { StepWizardModule } from '../../../../share/component/step-wizard/step-wizard.module';
import { VerifyOTPModule } from '../../../../share/component/verify-otp/verify-otp.module';
import { PipesModule } from '../../../../share/pipe/pipe.module';
import { DirectivesModule } from '../../../../share/directives/directives.module';

import { OtherAccountAddConfirm } from './add/other-account-add-confirm.component';
import { OtherAccountAddConfirmRoute } from './other-account-add-confirm.route';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    AlertMessageModule,
    PipesModule,
    StepWizardModule,
    VerifyOTPModule,
    DirectivesModule,
    OtherAccountAddConfirmRoute
  ],
  declarations: [
      OtherAccountAddConfirm
  ],
  exports: [
      OtherAccountAddConfirm
  ]
})
export class OtherAccountAddConfirmModule {}