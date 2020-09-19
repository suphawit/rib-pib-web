import { Constants } from '../../share/service/constants';
import { MyAccount } from '../../share/bean/account-bean';
import { TranslateService } from "ng2-translate/src/translate.service";
import { MyAccountService } from '../../pages/my-account/my-account.service';
import { Component, OnInit, Input, Output, EventEmitter, Pipe, PipeTransform, NgZone } from '@angular/core';
import { OrderByPipe } from '../../share/pipe/order-by.pipe';

declare var BUILD_NUM;

@Component({
    selector: 'my-account-list',
    templateUrl: './my-account-list.html'
})
// Component class
export class MyAccountListComponent implements OnInit {
    public BUILD_NUM = BUILD_NUM;
    currentAccount: any;
    accountLists: Array<MyAccount>;
    public firstLoad: boolean = true;

    @Input('action') actionName: string;
    @Input('filter') accountFilter: string;
    @Output('onError') onError = new EventEmitter();
    @Output('onSelectAccount') selectAccount = new EventEmitter();
    @Input('isSelectAccountOnLoad') isSelectAccountOnLoad: boolean;

    constructor(public constants: Constants,
        public myAccountService: MyAccountService,
        public translateService: TranslateService,
        public zone: NgZone,
        public orderBy: OrderByPipe) {
    }

    ngOnInit(): void {
        this.init();
        this.myAccountService.newMyAccountData = undefined;
    }

    onClickSelectAccount(account: Array<MyAccount>) {
        this.currentAccount = account;
        this.selectAccount.emit(account);
    }

    private init(): void {
        this.zone.run(() => {
            if (this.actionName == "dashboard") {
                this.getDashboard();
            } else {
                this.getMyAccount();
            }
        });
    }

    public getDashboard() {
        this.myAccountService.requestDashboard().then((objResponse: any) => {
            let result = objResponse.responseJSON.result;


            if (result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                this.accountLists = this.orderBy.aliasName(result.value, '');
                if (this.accountLists.length > 0) {
                    // trick data on first load
                    if (this.isSelectAccountOnLoad === true) {
                        this.isSelectAccountOnLoad = false;
                        this.currentAccount = this.accountLists[0];
                        this.selectAccount.emit(this.accountLists[0]);
                    }
                } else {
                    this.onStatus('no result', this.accountLists);
                }
            } else {
                this.onStatus('error', result.responseStatus);
            }

        }, function (error) {

        });
    }

    public getMyAccount() {
        this.myAccountService.requestInquiryMyAccount().then((objResponse: any) => {
            let result = objResponse.responseJSON.result;


            if (result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                this.accountLists = this.orderBy.aliasName(result.value, '');
                // trick data on first load
                if (this.isSelectAccountOnLoad === true) {
                    this.isSelectAccountOnLoad = false;
                    this.selectAccount.emit(this.accountLists[0]);
                }
            } else {
                this.onStatus('error', result.responseStatus);
            }

        }, function (error) {

        });
    }

    isHighlighted(account, currentAccount) {
        return currentAccount != null ? account.myAccountID === currentAccount.myAccountID : false;
    }

    private onStatus(msg, data) {
        this.onError.emit({
            msg: msg,
            data: data
        });
    }

    public trackByFn(index, item) {
        return index;
    }
}

@Pipe({ name: 'accountType' })
export class MyAccountTypePipe implements PipeTransform {
    transform(accountList: Array<MyAccount>, expArg: string): Array<MyAccount> {


        if (accountList && expArg) {
            let accountTypes = expArg.split('|');
            return accountList.filter(x => accountTypes.indexOf(x.accountType) != -1) || [];
        }

        return accountList || [];
    }
}
