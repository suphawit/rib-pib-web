import { AccountBean } from '../../share/bean/account-bean';
import { TermTypeBean } from '../../share/bean/term-type-bean';
import { TransferTypeBean } from '../../share/bean/transfer-type-bean';
import { ScheduleTypeBean } from '../../share/bean/schedule-type-bean';
import { RecurringTimeBean } from '../../share/bean/recurring-time-bean';
import { TransferDecisionBean } from '../../share/bean/transfer-decision-bean';

export class TransferBean {
    effectiveDate: string;
    txnDate: string;
    modifyDate: string;
    remark: string;
    refNo: string;
    transferAmount: number;
    destAccount: AccountBean;
    srcAccount: AccountBean;
    refExt: string;
    notifyLang: string;
    notifyMobileNo: string;
    notifyEmail: string;
    recvDate: string;
    errorCode: string;
    recurringTime: RecurringTimeBean;
    recurringType: string;
    scheduleType: ScheduleTypeBean;
    immediateType: string;
    transferType: TransferTypeBean;
    transferDecisionList: Array<TransferDecisionBean>;
    verifyTxnID: string;
    destAccountName: string;
    verifyOTP: any;
    note: string;
    isAllowPrint: boolean;
    txnId: string;
    txnMasId: string;
    refTxnId: string;
    isOwnerAccount: boolean;
    editType: string;
    addAccountType: string;
    existingTransferAccountNo: string;
    maskingToAccount: string;
    maskingFromAccount: string;
    // TD
    valueDate: string;
    maturityDate: string;
    depositNo: string;
    termType: TermTypeBean;
    benefitAcc: string;

     // Only for mobile
    tempNotifyMobileNo: string;
    tempNotifyEmail: string;

    // RTP
    rtpReferenceNo: string;

    //Small Amount
    isRequireOtp: boolean;
    transactionRef: string;

    constructor() {
        this.destAccount = new AccountBean();
        this.srcAccount = new AccountBean();
        this.scheduleType = new ScheduleTypeBean();
        this.transferType = new TransferTypeBean();
        this.recurringTime = new RecurringTimeBean();
        this.termType = new TermTypeBean();
        this.transferDecisionList = new Array<TransferDecisionBean>();
        this.isAllowPrint = false;
        this.isOwnerAccount = false;
        this.isRequireOtp = true;
    }

    public getEffDateDisplay(): string {
        let transferDecision = this.transferDecisionList != null && this.transferDecisionList.length > 0 ? this.transferDecisionList[0] : null;

        if (transferDecision != null) {
            let transferStatus = transferDecision.transferStatus;

            if (transferStatus != null && transferStatus.code === "SC") {
                return this.recvDate;
            }
        }

        return this.effectiveDate;
    }

    public getValueDateDisplay() {
        if (this.valueDate !== '') {
            return this.valueDate.substring(0, 10);
        }

        return '';
    }

    public getMaturityDateDisplay() {
        if (this.maturityDate !== '') {
            return this.maturityDate.substring(0, 10);
        }

        return '';
    }

    public getNotifyLangDisplay() {
        if (this.notifyLang === "EN") {
            return "lbl.english";
        }

        return "lbl.thai";
    }

    public getIsAddNewAccount() {
        return this.existingTransferAccountNo;//this.existingTransferAccountNo == 'N' ? true : false;
    }
}