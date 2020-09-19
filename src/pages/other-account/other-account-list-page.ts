import { ViewChild } from '@angular/core';
import { Constants } from '../../share/service/constants';
import { OtherAccountService } from './other-account.service';
import { UtilService } from '../../share/service/util.service';
import { TranslateService } from "ng2-translate/src/translate.service";
import { PermissionChangeRoute } from '../../share/service/permission.service';
import { AlertMessageComponent } from '../../share/component/alert-message/alert-message.component';

export class OtherAccountListPage {
    pageStyle: string;
    alertConfig: { title: string, type: string, message: string, show: boolean, option: any };

    @ViewChild('alertMessage') public alertMessage: AlertMessageComponent;

    constructor(public otherAccountService: OtherAccountService,
        public translateService: TranslateService,
        public constants: Constants,
        public permissionChangeRoute: PermissionChangeRoute,
        public utilService: UtilService) {

        this.alertConfig = {
            title: '',
            type: 'danger',
            message: '',
            show: false,
            option: {}
        };
    }

    ngAfterViewInit(): void {
        if (typeof this.otherAccountService.alertConfig !== 'undefined') {
            this.alertConfig = this.otherAccountService.alertConfig;
            this.alertMessage.show();
            this.otherAccountService.alertConfig = undefined;
            this.utilService.scrollToTop();
        }
    }

    onStatus(data: any): void {
        if (this.alertConfig.message == '') {
            let msg;

            if (data.msg === 'error') {
                msg = data.data.errorMessage;
            } else if (data.msg === 'no result') {
                msg = this.translateService.instant(this.constants.RESP_CODE_OTHER_ACCOUNT_NOT_FOUND);
            } else {
                msg = '';
            }

            this.alertConfig = { title: '', type: 'danger', message: msg, show: true, option: {} };

            if (msg != '') {
                this.alertMessage.show();
            } else {
                this.alertMessage.hide();
            }
        }
    }

    gotoAddOtherAccountPage(): void {

        this.permissionChangeRoute.changeRoute('OTHER_ACCOUNTS.add1');
    }
}