import { Router } from '@angular/router';
import { TranslateService } from 'ng2-translate';
import { Constants } from '../../share/service/constants';
import { MyAccountService } from '../../pages/my-account/my-account.service';
import { PermissionChangeRoute } from '../../share/service/permission.service';
import { OnInit, OnDestroy, Inject, AfterViewInit, ViewChild } from '@angular/core';
import { MessageModalComponent } from '../../share/component/modal-messages.component';

export class MyAccountDetailPage implements OnInit, OnDestroy, AfterViewInit, MyAccountDetail {

    private menuSelected: string = '';
    private isDelete: boolean = false;
    accountDetailConfig: { accountData: any; hideMenu: boolean; showBorder: boolean; };
    alertConfig: { title: string, type: string, message: string, show: boolean, option: any };
    messageModalData: { title: string; body: string; size: string; config: any; action: any; accountAliasName: string, accountNumber: string };
    styleWeb: string;

    @ViewChild('messageModal') public messageModal: MessageModalComponent;

    constructor( @Inject(Router) public router: Router,
        public constants: Constants,
        public myAccountService: MyAccountService,
        public permissionChangeRoute: PermissionChangeRoute,
        public translate: TranslateService) {
    }

    ngOnInit() {
        this.alertConfig = {
            title: '',
            type: 'danger',
            message: '',
            show: false,
            option: {}
        };

        this.accountDetailConfig = {
            accountData: {},
            hideMenu: true,
            showBorder: false
        };

        this.messageModalData = {
            title: this.translate.instant('label.delete.title'),
            body: this.translate.instant('label.delete.message.myaccount'),
            size: 'md',
            config: { isShowCloseBtn: true, isShowDeleteBtn: true },
            action: '',
            accountAliasName: '',
            accountNumber: ''
        }

        this.myAccountService.alertConfig = undefined;
    }

    ngAfterViewInit() {
        // Initial account data
        if (this.myAccountService.selectAccountDetailData !== null) {
            
            
            
            this.accountDetailConfig.accountData = this.myAccountService.selectAccountDetailData;
        }
    }

    ngOnDestroy() {
        
        

        if (this.menuSelected !== 'transfer'
            && this.menuSelected !== 'statement'
            && this.menuSelected !== 'edit'
            && this.menuSelected !== 'delete'
            && this.menuSelected !== 'payment'
            && this.menuSelected !== 'changeterm') {

            this.myAccountService.selectAccountDetailData = null;
        }
    }

    OnMenuClick(data: any) {
        

        this.menuSelected = data;
        if (data === this.constants.PORTLETS_MENU_DATA.STATEMENT) {
            this.permissionChangeRoute.changeRoute('MY_DEPOSITS.STATEMENT');
        } else if (data === this.constants.PORTLETS_MENU_DATA.TRANSFER) {
            this.permissionChangeRoute.prevUrl = this.router.url;
            this.permissionChangeRoute.changeRoute('FUND_TRANSFER');
        } else if (data === this.constants.PORTLETS_MENU_DATA.PAYMENT) {
            this.permissionChangeRoute.prevUrl = this.router.url;
            this.permissionChangeRoute.changeRoute('PAY_BILL');
        } else if (data === this.constants.PORTLETS_MENU_DATA.CALENDAR) {
            this.permissionChangeRoute.changeRoute('MANAGE_SCHEDULE');
        } else if (data === this.constants.PORTLETS_MENU_DATA.EDIT) {
            this.permissionChangeRoute.changeRoute('MY_DEPOSITS.EDIT');
        } else if (data === this.constants.PORTLETS_MENU_DATA.DELETE) {
            this.show();
        } else if (data === this.constants.PORTLETS_MENU_DATA.SCHEDULE) {
            this.permissionChangeRoute.prevUrl = this.router.url;
            this.permissionChangeRoute.changeRoute('MANAGE_SCHEDULE');
        } else if (data === this.constants.PORTLETS_MENU_DATA.CHANGETERM) {
            this.permissionChangeRoute.changeRoute('MY_ACCOUNTS.CHANGETERM');
        }
    }

    public show(): void {
        this.isDelete = true;
        this.messageModalData = {
            title: 'label.delete.title.myaccount',
            body: 'lbl.deleteMyAccountMsg',
            size: 'md',
            config: { isShowCloseBtn: true, isShowDeleteBtn: true },
            action: '',
            accountAliasName: this.myAccountService.selectAccountDetailData.myAccountAliasName,
            accountNumber: this.myAccountService.selectAccountDetailData.myAccountNumber
        };
        this.messageModal.show();
    }

    public onEmit($event) {
        

        if ($event !== undefined && $event === 'delete') {
            this.isDelete = false;

            this.myAccountService.deleteMyAccount(this.myAccountService.selectAccountDetailData).then((result: any) => {
                let tmpresult = result.responseJSON.result;

                if (tmpresult.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                    let alertConfig = {
                        title: 'label.Success',
                        type: 'success',
                        message: 'label.deleteMyAccountSuccess',
                        show: true,
                        option: { myAccountNumber: this.myAccountService.selectAccountDetailData.myAccountNumber }
                    };

                    this.myAccountService.alertConfig = alertConfig;
                }else{
                    let alertConfig = {
                        title: '',
                        type: 'danger',
                        message: tmpresult.responseStatus.errorMessage,
                        show: true,
                        option: { }
                    };

                    this.myAccountService.alertConfig = alertConfig;
                }
                this.permissionChangeRoute.changeRoute('MY_DEPOSITS');
            }, function (error) {
                
            });
            this.messageModal.hide();
        }

        if ($event !== undefined && $event === 'cancel') {
            this.messageModal.hide();
        }
    }

    onModalHidden() {
        // if (this.isDelete === false) {
        //     this.permissionChangeRoute.changeRoute('MY_DEPOSITS');
        // }
    }
}

interface MyAccountDetail {
    alertConfig: { type: string, message: string, show: boolean };
    accountDetailConfig: { accountData: any; hideMenu: boolean; showBorder: boolean; };
}
