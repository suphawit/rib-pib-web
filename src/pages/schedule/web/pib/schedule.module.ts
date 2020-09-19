import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from 'ng2-translate';
import { BsDropdownModule } from 'ng2-bootstrap/dropdown';
import { ModalModule } from 'ng2-bootstrap/modal';

import { AlertMessageModule } from '../../../../share/component/alert-message/alert-message.module';
import { TimelineModule } from '../../../../share/component/timeline/timeline.module';

import { ScheduleFundTransferService } from '../../schedule-fundtransfer.service';
import { SchedulePageComponent } from './schedule-page.component';
import { modalDeleteSchComponent, modalDeleteSchAllComponent, modalDeleteSchResultComponent } from '../../modal-delete-schedule.component'
import { ModalEditScheduleComponent } from '../../modal-edit-schedule.component';

@NgModule({
  imports: [
    CommonModule, 
    TranslateModule,
    BsDropdownModule,
    ModalModule,
    AlertMessageModule,
    TimelineModule
  ],
  declarations: [
      SchedulePageComponent,
      modalDeleteSchComponent,
      modalDeleteSchAllComponent,
      modalDeleteSchResultComponent,
      ModalEditScheduleComponent
  ],
  exports: [
      SchedulePageComponent,
      modalDeleteSchComponent,
      modalDeleteSchAllComponent,
      modalDeleteSchResultComponent,
      ModalEditScheduleComponent
  ],
  providers: [
      ScheduleFundTransferService
  ]
})
export class ScheduleModule {}