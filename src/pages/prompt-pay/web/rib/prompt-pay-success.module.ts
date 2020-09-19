import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from 'ng2-translate';

import { AlertMessageModule } from '../../../../share/component/alert-message/alert-message.module';
import { StepWizardModule } from '../../../../share/component/step-wizard/step-wizard.module';

import { RIBWebPromptPayRegisterSuccessComponent } from './rib-web-prompt-pay-register-success.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    AlertMessageModule,
    StepWizardModule
  ],
  declarations: [
      RIBWebPromptPayRegisterSuccessComponent
  ],
  exports: [
      RIBWebPromptPayRegisterSuccessComponent
  ],
})
export class PromptPaySuccessModule {}