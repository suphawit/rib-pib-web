import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from 'ng2-translate';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertMessageModule } from '../../../../share/component/alert-message/alert-message.module';
import { StepWizardModule } from '../../../../share/component/step-wizard/step-wizard.module';
import { VerifyOTPModule } from '../../../../share/component/verify-otp/verify-otp.module';
import { PipesModule } from '../../../../share/pipe/pipe.module';
import { DirectivesModule } from '../../../../share/directives/directives.module';

import { OtherAccountAddConfirmComponent } from './add/other-account-add-confirm.component';
import { OtherAccountAddComponent } from './add/other-account-add.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    AlertMessageModule,
    PipesModule,
    StepWizardModule,
    VerifyOTPModule,
    DirectivesModule
  ],
  declarations: [
      OtherAccountAddConfirmComponent,
      OtherAccountAddComponent
  ],
  exports: [
      OtherAccountAddConfirmComponent,
      OtherAccountAddComponent
  ]
})
export class OtherAccountAddModule {}