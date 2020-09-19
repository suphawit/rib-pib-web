import { Component, OnInit } from '@angular/core';
import { Constants } from '../../../../share/service/constants';
import { OtherAccountService } from '../../other-account.service';
import { UtilService } from '../../../../share/service/util.service';
import { OtherAccountListPage } from '../../other-account-list-page';
import { TranslateService } from "ng2-translate/src/translate.service";
import { PermissionChangeRoute, PermissionService } from '../../../../share/service/permission.service';

@Component({
    selector: 'other-account-list-page',
    templateUrl: '../../other-account-list-page.html'
})
export class OtherAccountListPageComponent extends OtherAccountListPage implements OnInit {
    permissionManage: any;

    constructor(public otherAccountService: OtherAccountService,
        public permissionChangeRoute: PermissionChangeRoute,
        public translateService: TranslateService,
        public constants: Constants,
        public permissionService: PermissionService,
        public utilService: UtilService) {
        super(otherAccountService, translateService, constants, permissionChangeRoute, utilService);
    }

    ngOnInit(): void {
        this.pageStyle = this.constants.STYLE_PIB_WEB;
        this.permissionManage = {
            add: this.permissionService.getActionCode().MANAGE_OTHER_ACCOUNTS
        };
        this.utilService.scrollToTop();
    }
}