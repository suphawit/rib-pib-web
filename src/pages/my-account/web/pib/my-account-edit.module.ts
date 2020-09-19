import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from 'ng2-translate';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertMessageModule } from '../../../../share/component/alert-message/alert-message.module';
import { StepWizardModule } from '../../../../share/component/step-wizard/step-wizard.module';
import { VerifyOTPModule } from '../../../../share/component/verify-otp/verify-otp.module';
import { DirectivesModule } from '../../../../share/directives/directives.module';

import { MyAccountEditConfirmComponent } from './edit/my-account-edit-confirm.component';
import { MyAccountEditComponent } from './edit/my-account-edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    AlertMessageModule,
    StepWizardModule,
    VerifyOTPModule,
    DirectivesModule
  ],
  declarations: [
      MyAccountEditConfirmComponent,
      MyAccountEditComponent
  ],
  exports: [
      MyAccountEditConfirmComponent,
      MyAccountEditComponent
  ]
})
export class MyAccountEditModule {}