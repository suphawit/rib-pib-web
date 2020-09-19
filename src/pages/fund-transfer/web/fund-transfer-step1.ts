import { ChangeDetectorRef } from '@angular/core';
import { BankBean } from '../../../share/bean/bank-bean';
import { Constants } from '../../../share/service/constants';
import { AccountBean } from '../../../share/bean/account-bean';
import { TransferBean } from '../../../share/bean/transfer-bean';
import { UtilService } from '../../../share/service/util.service';
import { MyAccountService } from '../../../pages/my-account/my-account.service';
import { OtherAccountService } from '../../other-account/other-account.service';
import { PermissionChangeRoute, PermissionService } from '../../../share/service/permission.service';
import { BankCodeDataService } from '../../../share/service/bankcode-data.service';
import { FundTransferService } from '../../../share/service/fund-transfer.service';

export class FundTransferStep1 {

    protected settings: any = {};
    protected module: string = "";
    protected srcAccountObj: any = {};
    protected destAccountObj: any = {};
    protected isTermDeposit: boolean = false;
    protected transferObj: TransferBean = new TransferBean();

    constructor(public constants: Constants,
        public cdRef: ChangeDetectorRef,
        public fundTransferService: FundTransferService,
        public myAccountService: MyAccountService,
        public permissionChangeRoute: PermissionChangeRoute,
        public otherAccountService: OtherAccountService,
        public bankCodeDataService: BankCodeDataService,
        public utilService: UtilService,
        public permissionService:PermissionService) {
    }

    protected init(): void {
        this.preLoadEvent();
    }

    updateMyAccount(arg) {
        //
        this.srcAccountObj = arg;
    }

    updateOtherAccount(arg) {

        if(this.module !== 'REQUEST_TO_PAY'){
            this.destAccountObj = arg;
            this.isTermDeposit = this.destAccountObj.accountType == this.constants.ACCOUNT_TYPE_TD;
            this.cdRef.detectChanges();    
        }
        
    }

    protected preLoadEvent() {
        if (this.utilService.arrayObjectIndexOf(['TRANSFER', 'SCHEDULE'], this.settings.module) !== -1) {
            if (this.permissionChangeRoute.targetAction == "NEW") {
                this.fundTransferService.setTransferObj(null);
            } else {

                // Pass data from my account/ other account to fund transfer
                if (this.utilService.arrayObjectIndexOf(['/my-account/detail', '/my-account/my-deposit', '/dashboard/my-deposit'], this.permissionChangeRoute.prevUrl) !== -1
                    && this.myAccountService.selectAccountDetailData != null
                    && this.myAccountService.selectAccountDetailData.statusCode !== '2'
                    && this.myAccountService.selectAccountDetailData.accountType !== this.constants.ACCOUNT_TYPE_TD) {

                    this.module = "MY_ACCOUNT";
                    this.fundTransferService.setTransferObj(null);
                } else if (this.utilService.arrayObjectIndexOf(['/list-other-account', '/other-account-detail'], this.permissionChangeRoute.prevUrl) !== -1
                    && this.otherAccountService.selectAccountDetailData != null) {

                    this.module = "OTHER_ACCOUNT";
                    this.fundTransferService.setTransferObj(null);
                } 
            }

            // Load fund transfer form
            this.onLoadEvent();
        }
    }

    protected onRecurringChange(){
        // used inherite for pib
    }

    protected onLoadEvent() {
        this.fundTransferService.updateObserver([
            { key: 'stepwizard', value: 0 },
            { key: 'alertmessage', value: '', show: false }
        ]);

        this.permissionChangeRoute.prevUrl = null;
        this.permissionChangeRoute.targetAction = null;
        this.transferObj = this.fundTransferService.getTransferObj();

           
        if (this.transferObj != null) {
            if (this.transferObj.editType != "") { this.settings.module = "SCHEDULE"; }
            if (this.transferObj.rtpReferenceNo != undefined && this.transferObj.rtpReferenceNo != "") { 
                this.module = 'REQUEST_TO_PAY';
                this.settings.module = 'REQUEST_TO_PAY'; 
            }
            this.srcAccountObj = this.transferObj.srcAccount;
            this.destAccountObj = this.transferObj.destAccount;
            this.isTermDeposit = this.transferObj.destAccount.accountType == this.constants.ACCOUNT_TYPE_TD;
        } else {
            if (this.module == "MY_ACCOUNT") {
                this.srcAccountObj = new AccountBean();
            
                let bank = new BankBean();
                bank.bankCode = this.myAccountService.selectAccountDetailData.bankCode;
                bank.bankName = this.myAccountService.selectAccountDetailData.bankName;
                bank.shortName = this.myAccountService.selectAccountDetailData.shortName;
                bank.imgObj = this.bankCodeDataService.getBankCodeImageProperty(bank.bankCode);

                this.srcAccountObj.accId = this.myAccountService.selectAccountDetailData.myAccountID;
                this.srcAccountObj.accName = this.myAccountService.selectAccountDetailData.accName;
                this.srcAccountObj.accNo = (this.myAccountService.selectAccountDetailData.myAccountNumber).substring(0,10);
                this.srcAccountObj.accountType = this.myAccountService.selectAccountDetailData.accountType;
                this.srcAccountObj.aliasName = this.myAccountService.selectAccountDetailData.myAccountAliasName;
                this.srcAccountObj.balance = this.myAccountService.selectAccountDetailData.myAvailableBalance;
                this.srcAccountObj.benefitAcc = this.myAccountService.selectAccountDetailData.myLedgerBalance;
                this.srcAccountObj.allowSchedule = this.permissionService.isProductAllow(this.myAccountService.selectAccountDetailData.productID,"allowSchedule");
                this.srcAccountObj.bank = bank;

                this.transferObj = new TransferBean();
                this.transferObj.srcAccount = this.srcAccountObj;
                this.transferObj.destAccount = new AccountBean();
                this.fundTransferService.setTransferObj(this.transferObj);
            }
            if (this.module == "OTHER_ACCOUNT") {
                this.transferObj = new TransferBean();
                this.transferObj.srcAccount = new AccountBean();
                this.destAccountObj = this.otherAccountService.selectAccountDetailData.accountBean;
                this.transferObj.destAccount = this.destAccountObj;
                this.transferObj.notifyEmail = this.destAccountObj.email;
                this.transferObj.notifyMobileNo = this.destAccountObj.mobileNo;
                this.transferObj.notifyLang = this.destAccountObj.notifyLang;
                this.fundTransferService.setTransferObj(this.transferObj);
            }
        }
    }
}