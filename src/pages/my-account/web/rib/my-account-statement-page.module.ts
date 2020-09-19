import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { TranslateModule } from 'ng2-translate';
import { ModalModule } from 'ng2-bootstrap/modal';
import { DatepickerModule as MaterialDatepicker } from 'ng2-datepicker';

import { AlertMessageModule } from '../../../../share/component/alert-message/alert-message.module';
import { PipesModule } from '../../../../share/pipe/pipe.module';

import { MyAccountStatementPageComponent } from './my-account-statement-page.component';
import { MyAccountStatementComponent } from '../../my-account-statement.component';
import { TransactionCodeInfoModalComponent } from '../../transaction-code-info-modal.component';
import { PaginationModule } from '../../../../share/component/pagination/pagination.module';
import { MyAccountStatementPageRoute } from './my-account-statement-page.route';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    TranslateModule,
    AlertMessageModule,
    PipesModule,
    MaterialDatepicker,
    ModalModule,
    PaginationModule,
    MyAccountStatementPageRoute
  ],
  declarations: [
      MyAccountStatementPageComponent,
      MyAccountStatementComponent,
      TransactionCodeInfoModalComponent
  ],
  exports: [
      MyAccountStatementPageComponent,
      MyAccountStatementComponent,
      TransactionCodeInfoModalComponent
  ]
})
export class MyAccountStatementPageModule {}