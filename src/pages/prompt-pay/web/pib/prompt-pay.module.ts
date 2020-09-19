import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from 'ng2-translate';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertMessageModule } from '../../../../share/component/alert-message/alert-message.module';
import { StepWizardModule } from '../../../../share/component/step-wizard/step-wizard.module';
import { TermAndConditionsModule } from '../../../../share/component/terms-and-conditions/term-and-conditions.module';
import { VerifyOTPModule } from '../../../../share/component/verify-otp/verify-otp.module';
import { PipesModule } from '../../../../share/pipe/pipe.module';
import { DirectivesModule } from '../../../../share/directives/directives.module';

import { PromptPayRegisterServiceMain } from '../../prompt-pay-register.service';
import { PIBWebPromptPayRegisterConfirmComponent } from './pib-web-prompt-pay-register-confirm.component';
import { PIBWebPromptPayRegisterSuccessComponent } from './pib-web-prompt-pay-register-success.component';
import { PIBWebPromptPayRegisterComponent } from './pib-web-prompt-pay-register.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    PipesModule,
    AlertMessageModule,
    StepWizardModule,
    TermAndConditionsModule,
    VerifyOTPModule,
    DirectivesModule
  ],
  declarations: [
      PIBWebPromptPayRegisterConfirmComponent,
      PIBWebPromptPayRegisterSuccessComponent,
      PIBWebPromptPayRegisterComponent
  ],
  exports: [
      PIBWebPromptPayRegisterConfirmComponent,
      PIBWebPromptPayRegisterSuccessComponent,
      PIBWebPromptPayRegisterComponent
  ]
})
export class PromptPayModule {
    static forRoot(): ModuleWithProviders { return {ngModule: PromptPayModule, providers: [PromptPayRegisterServiceMain]}; }
}