import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from 'ng2-translate';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertMessageModule } from '../../../../share/component/alert-message/alert-message.module';
import { StepWizardModule } from '../../../../share/component/step-wizard/step-wizard.module';
import { PipesModule } from '../../../../share/pipe/pipe.module';
import { DirectivesModule } from '../../../../share/directives/directives.module';

import { OtherAccountAdd } from './add/other-account-add.component';
import { OtherAccountAddRoute } from './other-account-add.route';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    AlertMessageModule,
    PipesModule,
    StepWizardModule,
    DirectivesModule,
    OtherAccountAddRoute
  ],
  declarations: [
      OtherAccountAdd
  ],
  exports: [
      OtherAccountAdd
  ]
})
export class OtherAccountAddModule {}