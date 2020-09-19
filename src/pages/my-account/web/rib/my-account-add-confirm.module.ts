import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from 'ng2-translate';

import { AlertMessageModule } from '../../../../share/component/alert-message/alert-message.module';
import { StepWizardModule } from '../../../../share/component/step-wizard/step-wizard.module';
import { VerifyOTPModule } from '../../../../share/component/verify-otp/verify-otp.module';
import { DirectivesModule } from '../../../../share/directives/directives.module';

import { MyAccountAddConfirmComponent } from './add/my-account-add-confirm.component';
import { MyAccountAddConfirmRoute } from './my-account-add-confirm.route';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    AlertMessageModule,
    StepWizardModule,
    VerifyOTPModule,
    DirectivesModule,
    MyAccountAddConfirmRoute
  ],
  declarations: [
      MyAccountAddConfirmComponent
  ],
  exports: [
      MyAccountAddConfirmComponent
  ]
})
export class MyAccountAddConfirmModule {}