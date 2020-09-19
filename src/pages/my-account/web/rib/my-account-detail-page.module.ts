import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { TranslateModule } from 'ng2-translate';
import { ModalModule } from 'ng2-bootstrap/modal';

import { AlertMessageModule } from '../../../../share/component/alert-message/alert-message.module';
import { PortietsMenuModule } from '../../../../share/component/portlets-menu/portlets-menu.module';
import { MyAccountDetailModule } from './my-account-detail.module';

import { MyAccountDetailPageComponent } from './my-account-detail-page.component';
import { MessageModalDeleteMyAccountComponent } from '../../modal-messages-delete-my-account.component';
import { MyAccountDetailRoute } from "./my-account-detail.route";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    ModalModule,
    AlertMessageModule,
    PortietsMenuModule,
    MyAccountDetailModule,
    MyAccountDetailRoute
  ],
  declarations: [
      MyAccountDetailPageComponent,
      MessageModalDeleteMyAccountComponent
  ],
  exports: [
      MyAccountDetailPageComponent,
      MessageModalDeleteMyAccountComponent
  ]
})
export class MyAccountDetailPageModule {}