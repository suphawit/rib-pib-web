import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from 'ng2-translate';
import { BsDropdownModule } from 'ng2-bootstrap/dropdown';
import { AlertMessageModule } from '../../../../share/component/alert-message/alert-message.module';
import { TimelineModule } from '../../../../share/component/timeline/timeline.module';

import { TransactionHistoryPageComponent } from './transaction-history-page.component';
import { TransactionHistoryRoute } from './transaction-history.route';

@NgModule({
  imports: [
        CommonModule, 
        TranslateModule, 
        BsDropdownModule,
        AlertMessageModule,
        TimelineModule,
        TransactionHistoryRoute
    ],
  declarations: [
      TransactionHistoryPageComponent
  ],
  exports: [
      TransactionHistoryPageComponent
  ]
})
export class TransactionHistoryModule { }