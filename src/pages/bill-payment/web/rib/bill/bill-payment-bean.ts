import { RecurringTimeBean } from '../../../../../share/bean/recurring-time-bean';
import { ScheduleTypeBean } from '../../../../../share/bean/schedule-type-bean';

export class BillPaymentBean {
    referenceNO:string;
	fromAccountNumber: string;
	fromBankCode: string;
	fromBankName: string;
	billerID: string;
	payAmount: string; 
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

    constructor() {
        this.scheduleType = new ScheduleTypeBean();
        this.recurringTime = new RecurringTimeBean();
    }
}