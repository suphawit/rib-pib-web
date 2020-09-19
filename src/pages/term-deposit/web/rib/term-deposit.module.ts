import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from 'ng2-translate';

import { ChangeTermDepositSwitchTermComponent, filterDuplicate } from './change-term-deposit-switch-term.component';
import { TermDepositRoute } from './term-deposit.route';

@NgModule({
  imports: [
    CommonModule, 
    RouterModule,
    FormsModule,
    TranslateModule, 
    TermDepositRoute
  ],
  declarations: [
      ChangeTermDepositSwitchTermComponent,
      filterDuplicate
  ],
  exports: [
      ChangeTermDepositSwitchTermComponent,
      filterDuplicate
  ]
})
export class TermDepositModule {
 }