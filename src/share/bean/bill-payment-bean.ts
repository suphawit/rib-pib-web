import { RecurringTimeBean } from './recurring-time-bean';
import { ScheduleTypeBean } from './schedule-type-bean';
import { AccountBean } from './account-bean';
import { BillerBean } from './biller-bean';

export class BillPaymentBean {
    referenceNO: string;
	fromAccount: AccountBean
	toBiller: BillerBean;
	payAmount: number; 
	feeAmount: string;
	effectiveDate: string;
	paymentDate: string;
	paymentStatus: string;
	submitStatus: string;
	memo: string;
	msgLanguage: string;
	immediateType: string;			//T:today, L:later
	recurringTime: RecurringTimeBean;
    recurringType: string;
	scheduleType: ScheduleTypeBean;
	accountFromNoMarking: string;
    canPrintSlip: string;

	//for edit
	editType: string;
	masterTransactionID: string;
	transactionID: string;
	
	//for inquiry
	fromAliasName: string;
	billerAliasName: string;
	billerName: string;
	reference1: string;
	reference2: string;
	billPaymentType: number;
	billPaymentTypeDesc: string;
	scheduleTypeDesc: string;
	paymentStatusDesc: string;
	submitStatusDesc: string;

	//for verify 
	transactionDate: string;			//DateFormat:dd/MM/yyyy (DateUtil.FORMAT_DATE_NORMAL_DATE)
	availableBalance: number;
	refTxnID: string;
	verifyTransactionID: string;
	
	//for response
	errorCode: string;
	errorDesc: string;

	verifyOTP: any;
	//for RTP BillPayment 
	isRTPBillPayment: boolean;
	profileCode: string;
	promptpayBillerId: string;
	reference3: string;
	rtpReferenceNo: string;
	custName: string;
	billpaymentStatusDesc: string;
	billpaymentStatusDisplay: string;

	existingBillerInfo: string;

	refInfos: any;
	transactionRef: string;

    constructor() {
        this.scheduleType = new ScheduleTypeBean();
        this.recurringTime = new RecurringTimeBean();
		this.fromAccount = new AccountBean();
		this.toBiller = new BillerBean();
    }

	public isSuccess(): boolean {
        return this.submitStatus == "1" ? false : true;
    }
}