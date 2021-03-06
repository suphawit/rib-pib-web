import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from 'ng2-translate';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertMessageModule } from '../../../../share/component/alert-message/alert-message.module';
import { StepWizardModule } from '../../../../share/component/step-wizard/step-wizard.module';
import { DirectivesModule } from '../../../../share/directives/directives.module';

import { MyAccountAddComponent } from './add/my-account-add.component';
import { MyAccountAddRoute } from './my-account-add.route';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    AlertMessageModule,
    StepWizardModule,
    DirectivesModule,
    MyAccountAddRoute
  ],
  declarations: [
      MyAccountAddComponent
  ],
  exports: [
      MyAccountAddComponent
  ]
})
export class MyAccountAddModule {}