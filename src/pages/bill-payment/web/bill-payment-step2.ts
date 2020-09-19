import { BillPaymentService } from '../bill-payment.service';
import { BillPaymentBean } from '../../../share/bean/bill-payment-bean';
import { PermissionChangeRoute } from '../../../share/service/permission.service';

export class BillPaymentStep2 {

    protected settings: any = {};
    protected billPaymentObj: BillPaymentBean = new BillPaymentBean();

    constructor(public billPaymentService: BillPaymentService,
        public permissionChangeRoute: PermissionChangeRoute) {
    }

    protected init(): void {
        this.billPaymentObj = this.billPaymentService.getBillPaymentObj();

        if (this.billPaymentObj != null) {
            if (this.billPaymentObj.editType != '') { this.settings.module = 'BILL_SCHEDULE' };
            if (this.billPaymentObj.rtpReferenceNo != '' && this.billPaymentObj.editType == '') { 
                this.settings.module = 'BILL_REQUEST_TO_PAY'; 
            }
        } else {
            this.permissionChangeRoute.changeRoute("DASHBOARD");
        }

        this.billPaymentService.updateObserver([
            { key: 'stepwizard', value: 1 },
            { key: 'alertmessage', value: '', show: false }
        ]);
    }
}