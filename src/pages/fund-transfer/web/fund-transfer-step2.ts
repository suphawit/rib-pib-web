import { TransferBean } from '../../../share/bean/transfer-bean';
import { PermissionChangeRoute } from '../../../share/service/permission.service';
import { FundTransferService } from '../../../share/service/fund-transfer.service';

export class FundTransferStep2 {

    protected settings: any = {};
    protected transferObj: TransferBean = new TransferBean();

    constructor(public fundTransferService: FundTransferService,
        public permissionChangeRoute: PermissionChangeRoute) {
    }

    protected init(): void {
        this.transferObj = this.fundTransferService.getTransferObj();

        if (this.transferObj != null) {
            if (this.transferObj.editType != "") { this.settings.module = "SCHEDULE" };
            if (this.transferObj.rtpReferenceNo != "") { 
                this.settings.module = 'REQUEST_TO_PAY'; 
            }
        } else {
            this.permissionChangeRoute.changeRoute('DASHBOARD');
            return;
        }

        this.fundTransferService.updateObserver([
            { key: 'stepwizard', value: 1 },
            { key: 'alertmessage', value: '', show: false }
        ]);
    }
}