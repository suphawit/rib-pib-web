import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from 'ng2-translate';

import { AlertMessageModule } from '../../../../share/component/alert-message/alert-message.module';
import { StepWizardModule } from '../../../../share/component/step-wizard/step-wizard.module';
import { VerifyOTPModule } from '../../../../share/component/verify-otp/verify-otp.module';
import { DirectivesModule } from '../../../../share/directives/directives.module';

import { MyAccountEditConfirmComponent } from './edit/my-account-edit-confirm.component';
import { MyAccountEditConfirmRoute } from './my-account-edit-confirm.route';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    AlertMessageModule,
    StepWizardModule,
    VerifyOTPModule,
    DirectivesModule,
    MyAccountEditConfirmRoute
  ],
  declarations: [
      MyAccountEditConfirmComponent
  ],
  exports: [
      MyAccountEditConfirmComponent
  ]
})
export class MyAccountEditConfirmModule {}