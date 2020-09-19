import { Router } from '@angular/router';
import { Constants } from '../../share/service/constants';
import { MyAccount } from '../../share/bean/account-bean';
import { UtilService } from '../../share/service/util.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PermissionChangeRoute, PermissionService } from '../../share/service/permission.service';

@Component({
    selector: 'my-account-detail',
    templateUrl: './my-account-detail.html'
})

// Component class
export class MyAccountDetailComponent implements OnInit {
    permissionManage: any;

    @Input('style') styleWeb: string;
    @Input('hideMenu') isHideMenu: boolean;
    @Input('data') selectAccount: MyAccount;
    @Input('showBorder') isShowBorder: boolean;
    @Output('onGetData') returnData = new EventEmitter();

    constructor(public constants: Constants,
        public permissionChangeRoute: PermissionChangeRoute,
        public router: Router,
        public permissionService: PermissionService,
        public utilService: UtilService) {

        this.permissionChangeRoute.prevUrl = this.router.url;

    }

    ngOnInit(): void {
        this.selectAccount = {
            accountStatus: '',
            accountType: '',
            bankCode: '',
            bankName: '',
            lastUpdatedDate: '',
            myAccountAliasName: '',
            myAccountID: 0,
            myAccountName: '',
            myAccountNumber: '',
            myAccountType: '',
            myAccountstatus: '',
            myAvailableBalance: 0,
            myLedgerBalance: 0,
            productID: '',
            statusCode: ''
        };

        this.permissionManage = {
            transfer: this.permissionService.getShortcutActionCodePermission('FUND_TRANSFER','FUND_TRANSFER'),
            payment: this.permissionService.getShortcutActionCodePermission('PAY_BILL','PAY_BILL'),
            moreInfo: this.permissionService.getActionCode().MANAGE_MY_ACCOUNTS
        };

        this.utilService.scrollToTop();
    }

    onGetData(data: any) {
        // Select one field to random check data
        if (this.selectAccount.myAccountNumber === '') return;
        this.returnData.emit({ name: data, value: this.selectAccount });
    }

    goto(menuCode: string) {
        this.permissionChangeRoute.changeRoute(menuCode);
    }

    isNotTdAccount() {
        return this.selectAccount.accountType !== 'TD';
    }
}
