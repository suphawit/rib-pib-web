import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from 'ng2-translate';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertMessageModule } from '../../../../share/component/alert-message/alert-message.module';
import { StepWizardModule } from '../../../../share/component/step-wizard/step-wizard.module';
import { TermAndConditionsModule } from '../../../../share/component/terms-and-conditions/term-and-conditions.module';
import { PipesModule } from '../../../../share/pipe/pipe.module';
import { DirectivesModule } from '../../../../share/directives/directives.module';

import { RIBWebPromptPayRegisterComponent } from './rib-web-prompt-pay-register.component';

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
    DirectivesModule
  ],
  declarations: [
      RIBWebPromptPayRegisterComponent
  ],
  exports: [
      RIBWebPromptPayRegisterComponent
  ],
})
export class PromptPayModule {}