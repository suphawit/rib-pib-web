import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { TranslateModule } from 'ng2-translate';
import { ModalModule } from 'ng2-bootstrap/modal';

import { AlertMessageModule } from '../../../../share/component/alert-message/alert-message.module';
import { PortietsMenuModule } from '../../../../share/component/portlets-menu/portlets-menu.module';

import { MyAccountDetailPageComponent } from './my-account-detail-page.component';
import { MyAccountDetailComponent } from '../../my-account-detail.component';
import { MessageModalDeleteMyAccountComponent } from '../../modal-messages-delete-my-account.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    ModalModule,
    AlertMessageModule,
    PortietsMenuModule
  ],
  declarations: [
      MyAccountDetailPageComponent,
      MyAccountDetailComponent,
      MessageModalDeleteMyAccountComponent
  ],
  exports: [
      MyAccountDetailPageComponent,
      MyAccountDetailComponent,
      MessageModalDeleteMyAccountComponent
  ]
})
export class MyAccountDetailModule {}