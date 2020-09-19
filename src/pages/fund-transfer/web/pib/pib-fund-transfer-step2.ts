import { Component, OnInit } from '@angular/core';
import { FundTransferStep2 } from '../fund-transfer-step2';
import { Constants } from '../../../../share/service/constants';
import { UtilService } from '../../../../share/service/util.service';
import { PermissionChangeRoute } from '../../../../share/service/permission.service';
import { FundTransferService } from '../../../../share/service/fund-transfer.service';

@Component({
    template: `<div *ngIf="transferObj != null">
                    <confirm [settings]="settings"></confirm>
                </div>
              `
})

export class PIBFundTransferStep2 extends FundTransferStep2 implements OnInit {
    constructor(private constants: Constants,
        public fundTransferService: FundTransferService,
        public permissionChangeRoute: PermissionChangeRoute,
        public utilService: UtilService) {
        super(fundTransferService, permissionChangeRoute);
    }

    ngOnInit(): void {
        this.settings = { module: 'TRANSFER', styleClass: this.constants.STYLE_PIB_WEB };
        this.init();
        this.utilService.scrollToTop();
    }
}