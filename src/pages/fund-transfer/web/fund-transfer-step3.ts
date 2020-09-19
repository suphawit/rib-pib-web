import { TransferBean } from '../../../share/bean/transfer-bean';
import { PermissionChangeRoute } from '../../../share/service/permission.service';
import { FundTransferService } from '../../../share/service/fund-transfer.service';

export class FundTransferStep3 {

    protected settings: any = {};
    protected transferObj: TransferBean = new TransferBean();

    constructor(public fundTransferService: FundTransferService,
        public permissionChangeRoute: PermissionChangeRoute) {
    }

    protected init(): void {
        this.transferObj = this.fundTransferService.getTransferObj();


        if (this.transferObj == null) {
            this.permissionChangeRoute.changeRoute('DASHBOARD');
            return;
        }

        this.fundTransferService.updateObserver([
            { key: 'stepwizard', value: 2 },
            { key: 'alertmessage', value: '', show: false }
        ]);
    }
}