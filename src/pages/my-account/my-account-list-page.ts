import { OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Constants } from '../../share/service/constants';
import { MyAccountService } from '../../pages/my-account/my-account.service';
import { PermissionChangeRoute, PermissionService } from '../../share/service/permission.service';
import { TranslateService } from "ng2-translate/src/translate.service";
import { AlertMessageComponent } from '../../share/component/alert-message/alert-message.component';

export class MyAccountListPage implements MyAccountSummaryPage, OnInit, OnDestroy {
  permissionManage: any;
  @ViewChild('alertMessage') public alertMessage: AlertMessageComponent;
  alertConfig: { title: string, type: string, message: string, show: boolean, option: any };
  accountDetailConfig: { accountData: any; hideMenu: boolean; showBorder: boolean; style: string; };

  constructor(public permissionChangeRoute: PermissionChangeRoute,
    public constants: Constants,
    public myAccountService: MyAccountService,
    public translateService: TranslateService,
    public permissionService: PermissionService) {

    this.permissionManage = {
      add: this.permissionService.getActionCode().MANAGE_MY_ACCOUNTS
    }
  }

  ngOnInit(): void {
    this.alertConfig = {
      title: '',
      type: 'danger',
      message: '',
      show: false,
      option: {}
    };

    this.accountDetailConfig = {
      accountData: {},
      hideMenu: false,
      showBorder: true,
      style: this.constants.STYLE_RIB_WEB
    };

    if (typeof this.myAccountService.alertConfig !== 'undefined') {
      this.alertConfig = this.myAccountService.alertConfig;
      this.alertMessage.show();
    }
  }

  ngOnDestroy(): void {
    this.myAccountService.alertConfig = undefined;
  }

  ongetMyAccount(data: any) {
    let newData = data;
        newData.allowTransfer = this.permissionService.isProductAllow(newData.productID, "allowTransferFrom");
        newData.allowPayment = this.permissionService.isProductAllow(newData.productID, "allowPayment")


        
        this.accountDetailConfig.accountData = newData;
        this.myAccountService.selectAccountDetailData = newData;
  }

  onAccountDetail(data: any) {

    if (data.name === 'moreinfo') {
      // this.router.navigate(['my-account/detail']);
      this.permissionChangeRoute.changeRoute('MY_DEPOSITS.DETAIL');
    }
  }

  gotoAddAccountPage() {
    this.myAccountService.newMyAccountData = undefined;
    this.permissionChangeRoute.changeRoute('MY_DEPOSITS.ADD');
  }

  onListError(data: any) {
    if (data.msg === 'error') {
      this.alertConfig.message = data.data.errorMessage;
    } else {
      this.alertConfig.message = this.translateService.instant(this.constants.RESP_CODE_MY_ACCOUNT_NOT_FOUND);
    }

    this.alertConfig.title = '';
    this.alertConfig.type = 'danger';
    this.alertMessage.show();

  }
}

interface MyAccountSummaryPage {
  accountDetailConfig: { accountData: any; hideMenu: boolean; showBorder: boolean; };
  alertConfig: { type: string, message: string, show: boolean };
  ongetMyAccount: Function;
  onAccountDetail: Function;
  gotoAddAccountPage: Function;
}