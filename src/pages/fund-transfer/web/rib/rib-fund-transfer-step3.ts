import { Component, OnInit } from '@angular/core';
import { FundTransferStep3 } from '../fund-transfer-step3';
import { Constants } from '../../../../share/service/constants';
import { PermissionChangeRoute } from '../../../../share/service/permission.service';
import { FundTransferService } from '../../../../share/service/fund-transfer.service';

@Component({
    template: ` 
                <div *ngIf="transferObj != null && transferObj?.destAccount?.accountType != constants.ACCOUNT_TYPE_TD">
                    <complete [settings]="settings"></complete>
                </div>
                <div *ngIf="transferObj != null && transferObj?.destAccount?.accountType == constants.ACCOUNT_TYPE_TD">
                    <td-complete [settings]="settings"></td-complete>
                </div>
              `
})

export class RIBFundTransferStep3 extends FundTransferStep3 implements OnInit {
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