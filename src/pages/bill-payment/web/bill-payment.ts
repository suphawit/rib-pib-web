import { ViewChild } from '@angular/core';
import { Constants } from '../../../share/service/constants';
import { BillPaymentService } from '../bill-payment.service';
import { TranslateService } from "ng2-translate/src/translate.service";
import { Breadcrumb } from '../../../share/component/breadcrumb/breadcrumb.component';
import { StepWizard } from '../../../share/component/step-wizard/step-wizard.component';
import { AlertMessageComponent } from '../../../share/component/alert-message/alert-message.component';

export class BillPayment {
    private observer: any;
    protected subscription: any;
    private stepWizard: StepWizard;
    protected hasAccount: boolean = false;
    private alertConfig: { type: string, message: string, show: boolean };
    @ViewChild('alertMessage') public alertMessage: AlertMessageComponent;

    constructor(public constants: Constants,
        public billPaymentService: BillPaymentService,
        public translate: TranslateService) {
    }

    protected init(styleModule): void {
        this.alertConfig = { type: 'danger', message: '', show: false };

        // initialize observer
        this.observer = this.billPaymentService.getObserver();
        this.subscription = this.observer.subscribe(result => {
            this.handleObserver(result)
        });

        this.stepWizard = {
            input: {
                data: [
                    { name: '1', label: 'stepWizard.enterDetails' },
                    { name: '2', label: 'stepWizard.confirm' },
                    { name: '3', label: 'stepWizard.complete' }
                ],
                step: 0,
                style: styleModule
            }
        };
    }

    private handleObserver(dataList: Array<any>) {
        dataList.forEach(data => {
            if (data.key === 'stepwizard') {
                this.stepWizard.input.step = data.value;
            }
            if (data.key === 'alertmessage') {
                this.alertConfig.message = data.value;
                if (data.value !== '') {
                    this.alertMessage.show();
                } else {
                    this.alertMessage.hide();
                }
            }

            if (data.key === 'HAS_ACCOUNT') {
                this.hasAccount = data.value;

                if (!this.hasAccount) {
                    this.alertConfig.message = this.translate.instant('msg.noAccountFound');
                    this.alertMessage.show();
                }
            }
        });
    }
}