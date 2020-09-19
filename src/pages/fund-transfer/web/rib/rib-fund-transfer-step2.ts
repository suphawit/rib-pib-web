import { Component, OnInit } from '@angular/core';
import { FundTransferStep2 } from '../fund-transfer-step2';
import { Constants } from '../../../../share/service/constants';
import { PermissionChangeRoute } from '../../../../share/service/permission.service';
import { FundTransferService } from '../../../../share/service/fund-transfer.service';

@Component({
    template: ` 
                <div *ngIf="transferObj != null && transferObj?.destAccount?.accountType != constants.ACCOUNT_TYPE_TD">
                    <confirm [settings]="settings"></confirm>
                </div>
                <div *ngIf="transferObj != null && transferObj?.destAccount?.accountType == constants.ACCOUNT_TYPE_TD">
                    <td-confirm></td-confirm>
                </div>
              `
})

export class RIBFundTransferStep2 extends FundTransferStep2 implements OnInit {
    constructor(public constants: Constants, 
        public fundTransferService: FundTransferService,
        public permissionChangeRoute: PermissionChangeRoute) {
        super(fundTransferService, permissionChangeRoute);
    }

    ngOnInit(): void {
        this.settings = { module: 'TRANSFER', styleClass: this.constants.STYLE_RIB_WEB };
        this.init();
    }
}