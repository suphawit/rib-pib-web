import { Component, OnInit } from '@angular/core';
import { TranslateService } from "ng2-translate/src/translate.service";
import { RIBWebHeader } from '../../../../pages/main-layout/web/rib/header';
import { PermissionAction } from '../../../../share/service/permission.service';
import { DropdownDataService } from '../../../../share/service/dropdown.service';
import { PermissionService } from '../../../../share/service/permission.service';
import { PermissionChangeRoute } from '../../../../share/service/permission.service';
import { LanguageSettingService } from '../../../../pages/main-layout/web/language-setting.service';
import { NotificationService } from "../../../../share/service/notification.service";

import { BillPaymentService } from '../../../bill-payment/bill-payment.service';
import { MasterDataService } from '../../../../share/service/master-data.service';
import { Constants } from '../../../../share/service/constants';
import { FundTransferService } from '../../../../share/service/fund-transfer.service';
@Component({
    selector: 'language-settings-selector',
    templateUrl: './language-settings.html'
})
export class RIBWebLanguageSettings extends RIBWebHeader implements OnInit {

    constructor(public permissionAction: PermissionAction,
        public translate: TranslateService,
        public dropdownLanguageDataService: DropdownDataService,
        public permissionService: PermissionService,
        public languageSettingService: LanguageSettingService,
        public permissionChangeRoute: PermissionChangeRoute,
        public notificationService: NotificationService,
        public billPaymentService:BillPaymentService,
        public masterDataService: MasterDataService,
        public constants: Constants,
        public fundTransferService: FundTransferService, ) {
        super(permissionAction, translate, dropdownLanguageDataService, permissionService, 
                languageSettingService, permissionChangeRoute,notificationService,billPaymentService, masterDataService, constants, fundTransferService );
    }

    ngOnInit(): void {
        this.languageSettingValue = this.translate.currentLang;
    }
}