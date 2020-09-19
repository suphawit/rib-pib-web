import { TransferTimeBean } from '../../share/bean/transfer-time-bean';
import { TransferStatusBean } from '../../share/bean/transfer-status-bean';

export class TransferDecisionBean {
    RIBTransferTypeCode: string;
    desc: string;
    feeAmount: number;
    creditDate: string;
    creditTime: TransferTimeBean;
    debitDate: string;
    debitTime: TransferTimeBean;
    transferStatus: TransferStatusBean;
    intRate: number;
    intCond: string;

    constructor() {
        this.debitTime = new TransferTimeBean();
        this.creditTime = new TransferTimeBean();
        this.transferStatus = new TransferStatusBean();
    }

    public getDebitDateTimeDisplay() {
        if(this.debitDate && this.debitDate !== '') {
            return this.debitDate.substring(0, 10);
        }

        return '';
    }

    public getCreditTimeDisplay() {
        if(this.creditDate && this.creditDate !== '') {
            return this.creditDate.substring(0, 10);
        }

        return '';
    }
}
