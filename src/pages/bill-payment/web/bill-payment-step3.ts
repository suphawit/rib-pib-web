import { BillPaymentService } from '../bill-payment.service';

export class BillPaymentStep3 {

    protected settings: any = {};

    constructor(public billPaymentService: BillPaymentService ) {
    }

    protected init(): void {
        this.billPaymentService.updateObserver([
            { key: 'stepwizard', value: 2 },
            { key: 'alertmessage', value: '', show: false }
        ]);
    }
}