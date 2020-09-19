import { NgForm } from '@angular/forms';
import { BankBean } from '../../../bean/bank-bean';
import { Constants } from '../../../service/constants';
import { AccountBean } from '../../../bean/account-bean';
import { CategoryBean } from '../../../bean/category-bean';
import { UtilService } from '../../../service/util.service';
import { AnyIDTypeBean } from '../../../bean/anyid-type-bean';
import { AccountService } from '../../../service/account.service';
import { TranslateService } from 'ng2-translate/src/translate.service';
import { MasterDataService } from '../../../service/master-data.service';
import { FundTransferService } from '../../../service/fund-transfer.service';
import { BankCodeDataService } from '../../../service/bankcode-data.service';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
    selector: 'to-account-list',
    templateUrl: './to-account-list.html'
})

export class ToAccountList implements OnInit {

    private banks: any = [];
    private accAnyIDType: any;
    private anyIDTypes: any = [];
    private rangeLength: [number];
    private inputPattern: string;
    private otherAccounts: any = [];
    public submitted: boolean = false;
    public isAccNameRequired: boolean = false;

    public status: any = {
        isFirstOpen: true,
        isOpen: false
    };

    private model: any = {
        anyIDType: this.constants.ANYID_TYPE_BANK_ACCOUNT,
        bankCode: '',
        accountNo: '',
        accountName: ''
    }

    @Input() settings: any;
    @Input() currentAccount: AccountBean;
    @Output() accountChanged = new EventEmitter();

    constructor(public constants: Constants,
        private translate: TranslateService,
        private accountService: AccountService,        
        private masterDataService: MasterDataService,
        private bankCodeDataService: BankCodeDataService,
        public fundTransferService: FundTransferService,
        public utilService: UtilService
    ) {
    }

    ngOnInit(): void {
        //
        this.masterDataService.getAllBanks().then((result: any) => {
            this.banks = result;
            this.masterDataService.setBankList(this.banks);
        });

        this.masterDataService.getAllAnyIDTypes().then((result: any) => {
            this.anyIDTypes = result;
            this.accAnyIDType = this.anyIDTypes[this.constants.ANYID_TYPE_BANK_ACCOUNT];
            this.rangeLength = this.accAnyIDType.getRangeLength();
            this.inputPattern = this.accAnyIDType.getRegexPattern();
            this.accountService.getOtherAccounts(this.anyIDTypes).then((result: any) => {
                this.otherAccounts = result;

                if (['TRANSFER', 'SCHEDULE','REQUEST_TO_PAY'].indexOf(this.settings.module) != -1) {
                    this.fundTransferService.updateObserver([{ key: 'IS_DATA_READY', value: true }]);
                }
            });
                this.patchAddNewCurrentAccount();
        });

        
    }

    onSelectChanged(accountObj: AccountBean) {
        this.fundTransferService.updateObserver([{ key: 'alertmessage', value: '', show: false }]);
        this.getAccount(accountObj);
    }

    addAccount(data, valid): void {
        this.submitted = true;
        if (valid) {
            let accountObj = new AccountBean();

            let anyIDType = this.anyIDTypes[data.anyIDType] || new AnyIDTypeBean();

            if (this.constants.ANYID_TYPE_BANK_ACCOUNT == data.anyIDType) {
                let bank = new BankBean();
                let bankInfo = this.banks.find(x => x.bankCode == data.bankCode);

                bank.bankCode = data.bankCode;
                bank.bankName = bankInfo.bankName;
                bank.shortName = bankInfo != null ? bankInfo.shortName : '';
                bank.imgObj = this.bankCodeDataService.getBankCodeImageProperty(bank.bankCode);
                bank.isORFT = bankInfo.isORFT;
                accountObj.bank = bank;
            }

            let category = new CategoryBean();
            category.catId = 999;
            category.catName = this.translate.instant('lbl.newAccount');

            accountObj.accId = -1;
            accountObj.accNo = data.accountNo;
            accountObj.accName = data.accountName ? data.accountName.toUpperCase() : '';
            accountObj.aliasName = "";
            accountObj.anyIDType = anyIDType;
            accountObj.category = category;

            this.getAccount(accountObj);
        }
    }

    clearForm(form: NgForm): void {

        this.model.anyIDType = this.constants.ANYID_TYPE_BANK_ACCOUNT;
        this.accAnyIDType = this.anyIDTypes[this.model.anyIDType];
        this.model.accountNo = '';
        this.model.bankCode = '';
        this.model.accountName = '';
        this.isAccNameRequired = false;
        this.resetSubmittedState(form);
        this.accAnyIDType = this.anyIDTypes[this.model.anyIDType];
        this.rangeLength = this.accAnyIDType.getRangeLength();
        this.inputPattern = this.accAnyIDType.getRegexPattern();
        let accountObj = new AccountBean();

        let category = new CategoryBean();
        category.catId = 999;
        category.catName = this.translate.instant('lbl.newAccount');
        accountObj.category = category;

        this.getAccount(accountObj);
    }

    getAnyIDTypes(): any {
        return this.anyIDTypes != null ? Object.keys(this.anyIDTypes) : [];
    }

    private getAccount(accountObj: AccountBean) {
        this.currentAccount = accountObj;
        this.accountChanged.emit(accountObj);
    }

    isHighlighted(account, currentAccount) {
        return currentAccount != null ? account.getAccountKey() === currentAccount.getAccountKey() : false;
    }

    onBankChange(newValue) {
        let bankInfo = this.banks.find(x => x.bankCode == this.model.bankCode);
        this.isAccNameRequired = !bankInfo.isORFT;
        this.model.accountNo = '';
        this.model.accountName = '';
    }

    onAnyIDTypeChange(newValue) {
        this.model.accountNo = '';
        this.model.accountName = '';
        this.model.bankCode = '';
        this.isAccNameRequired = false;
        this.accAnyIDType = this.anyIDTypes[newValue];
        this.rangeLength = this.accAnyIDType.getRangeLength();
        this.inputPattern = this.accAnyIDType.getRegexPattern();
    }

    protected autoScaleHeight(): void {
        if (window != window.top) {
            let root = this;
            setTimeout(function () {
                root.utilService.pageLoad();
            }, 1000);
        }
    }

    private resetSubmittedState(form: NgForm): void {
        this.submitted = false;
        let root = this;
        ['accountNo', 'accountName', 'bankCode'].forEach(name => {
            root.utilService.resetInputState(form, name);
        });
    }

    private patchAddNewCurrentAccount(){
        
       if (this.currentAccount != null && this.currentAccount.category.catId == 999) {
            this.model.anyIDType = this.currentAccount.anyIDType.anyIDType;
            this.model.accountNo = this.currentAccount.accNo;
            this.model.bankCode = this.constants.ANYID_TYPE_BANK_ACCOUNT == this.model.anyIDType ? this.currentAccount.bank.bankCode : "";

            if (this.model.anyIDType == this.constants.ANYID_TYPE_BANK_ACCOUNT) {
                this.isAccNameRequired = !this.currentAccount.bank.isORFT;
            }else{
                this.accAnyIDType = this.anyIDTypes[this.model.anyIDType];
            }
                this.rangeLength = this.accAnyIDType.getRangeLength();
                this.inputPattern = this.accAnyIDType.getRegexPattern();

            if (this.isAccNameRequired) {
                this.model.accountName = this.currentAccount.accName;
            }
        }
    }
}