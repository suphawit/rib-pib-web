import { FormBuilder } from '@angular/forms';
import { OnInit, Component } from '@angular/core';
import { BillerConfirm } from '../../../biller-confirm';
import { BillPaymentService } from '../../../bill-payment.service';
import { Constants } from '../../../../../share/service/constants';
import { PermissionChangeRoute } from '../../../../../share/service/permission.service';

declare var BUILD_NUM;

@Component({
    selector: 'biller-add-confirm',
    templateUrl: '../../../biller-confirm.html'
})

export class BillerAddConfirm extends BillerConfirm implements OnInit {
    public BUILD_NUM = BUILD_NUM;
    
    constructor(public billPaymentService: BillPaymentService,
        public constants: Constants,
        public formBuilder: FormBuilder,
        public permissionChangeRoute: PermissionChangeRoute) {
        super(permissionChangeRoute, billPaymentService, constants);

    }

    ngOnInit(): void {


        super.setIsAdd(true);
        super.init();
        this.labelTitle = 'label.titleAddBillerConfirm';

        this.stepWizard = {
            input: {
                data: [{ name: '1', label: 'stepWizard.enterDetails' }, { name: '2', label: 'stepWizard.confirm' }],
                step: 1,
                style: this.constants.STYLE_RIB_WEB
            }
        };


    }

    onBillerSubmit() {
        super.onAddBillerSubmit();
    }

    navigateBack(): void {
        this.setNextPage('MANAGE_BILLER.ADD_VERIFY');
        super.goToNextPage();
    }
}