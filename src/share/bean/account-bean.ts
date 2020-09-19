import { BankBean } from '../../share/bean/bank-bean';
import { CategoryBean } from '../../share/bean/category-bean';
import { AnyIDTypeBean } from '../../share/bean/anyid-type-bean';

export class AccountBean {
    custId: number;
    accId: number;
    accNo: string;
    aliasName: string;
    accName: string;
    status: string;
    accountType: string;
    accTypeDesc: string;
    isFavourate: boolean;
    isActive: boolean;
    bank: BankBean;
    category: CategoryBean;
    accDateOpen: string;
    productName: string;
    productID: number;
    benefitAcc: number;
    balance: number;
    currentBalance: number;
    amountOnHold: number;
    unclearedFunds: number;
    overdraftLimit: number;
    accStatusDisplay: string;
    isStatusClosed: boolean;
    anyIDType: AnyIDTypeBean;
    email: string;
    mobileNo: string;
    notifyLang: string;
    allowSchedule: boolean;
    txnId: string;
    refTxnId: string;
    
    constructor() {
        this.bank = new BankBean();
        this.category = new CategoryBean();
        this.anyIDType = new AnyIDTypeBean();
    }

    public getAccountDisplay(): string {
        let anyIDTypeDesc = '';

        if (typeof this.anyIDType.anyIDType === "undefined" || this.anyIDType.anyIDType == "ACCTNO") {
            anyIDTypeDesc = typeof this.bank.bankName !== "undefined" ? this.bank.bankName : '';
        }

        if (typeof this.anyIDType.anyIDType !== "undefined" && this.anyIDType.anyIDType != "ACCTNO") {
            anyIDTypeDesc = this.anyIDType.desc;
        }

        if (this.aliasName != null && this.aliasName != '') {
            let accAliasName = '<a href="javascript:;" aria-expanded="false">' + this.aliasName + '</a>';
            return accAliasName + '<br />' + anyIDTypeDesc + '<br />' + '(' + this.accNo + ')';
        }

        return anyIDTypeDesc + '<br />(' + this.accNo + ')';
    }

    public getAccountKey() {
        let catId = this.category != null ? this.category.catId : 0;

        if (typeof this.anyIDType.anyIDType === "undefined" || this.anyIDType.anyIDType == "ACCTNO") {
            return catId + ':' + this.bank.bankCode + ':' + this.accNo;
        }

        return catId + ':' + this.anyIDType.anyIDType + ':' + this.accNo;
    }

    // Step 1: Fund Transfer Input Details
    public getShortDescDisplay() {
        let prefix = '';

        if (typeof this.anyIDType.anyIDType === "undefined" || this.anyIDType.anyIDType == "ACCTNO") {
            prefix = typeof this.bank.shortName !== "undefined" ? (this.bank.shortName + ' : ') : '';
        }

        if (typeof this.anyIDType.anyIDType !== "undefined" && this.anyIDType.anyIDType != "ACCTNO") {
            prefix = this.anyIDType.shortName + ' : ';
        }

        return prefix + (this.aliasName != '' ? this.aliasName + ' (' + this.accNo + ')' : this.accNo);
    }
}

export class MyAccount {
    accountStatus: string;
    accountType: string;
    bankCode: string;
    bankName: string;
    lastUpdatedDate: string;
    myAccountAliasName: string;
    myAccountID: number;
    myAccountName: string;
    myAccountNumber: string;
    myAccountType: string;
    myAccountstatus: string;
    myAvailableBalance: number;
    myLedgerBalance: number;
    productID: string;
    statusCode: string;
}