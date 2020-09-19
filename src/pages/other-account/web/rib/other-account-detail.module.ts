import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { TranslateModule } from 'ng2-translate';
import { ModalModule } from 'ng2-bootstrap/modal';

import { AlertMessageModule } from '../../../../share/component/alert-message/alert-message.module';
import { PortietsMenuModule } from '../../../../share/component/portlets-menu/portlets-menu.module';

import { OtherAccountDetailPageComponent } from '../../other-account-detail-page-component';
import { deleteOtherAccModalComponent } from '../../delete-other-account-modal.component';
import { OtherAccountDetailRoute } from './other-account-detail.route';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    ModalModule,
    AlertMessageModule,
    PortietsMenuModule,
    OtherAccountDetailRoute
  ],
  declarations: [
      OtherAccountDetailPageComponent,
      deleteOtherAccModalComponent
  ],
  exports: [
      OtherAccountDetailPageComponent,
      deleteOtherAccModalComponent
  ]
})
export class OtherAccountDetailModule {}