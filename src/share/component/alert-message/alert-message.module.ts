import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from 'ng2-translate';
import { AlertMessageComponent } from './alert-message.component';
import { StepWizardModule } from "../step-wizard/step-wizard.module";

@NgModule({
  imports: [
      CommonModule, 
      TranslateModule,
      StepWizardModule
    ],
  declarations: [
      AlertMessageComponent
  ],
  exports: [
      AlertMessageComponent
  ],
  providers: [
  ]
})
export class AlertMessageModule { }