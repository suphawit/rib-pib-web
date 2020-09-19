import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from 'ng2-translate';

import { StepWizardComponent } from './step-wizard.component';

@NgModule({
  imports: [CommonModule, TranslateModule],
  declarations: [
      StepWizardComponent
  ],
  exports: [
      StepWizardComponent
  ],
  providers: [
  ]
})
export class StepWizardModule { }