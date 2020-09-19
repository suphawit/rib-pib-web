import { FormBuilder } from '@angular/forms';
import { OnInit, Component, } from '@angular/core';
import { BillerAddEdit } from '../../../biller-add-edit';
import { BillPaymentService } from '../../../bill-payment.service';
import { Constants } from '../../../../../share/service/constants';
import { ValidationService } from '../../../../../share/service/validation.service';
import { PermissionChangeRoute } from '../../../../../share/service/permission.service';

declare var BUILD_NUM;

@Component({
    selector: 'biller-edit',
    templateUrl: '../../../biller-add-edit.html',
})

export class BillerEdit extends BillerAddEdit implements OnInit {
    submitted: boolean = false;
    protected aliasName: String;
    protected billPaymentAddEditForm: any;
    public BUILD_NUM = BUILD_NUM;

    constructor(public billPaymentService: BillPaymentService,
        public constants: Constants,
        public formBuilder: FormBuilder,
        public permissionChangeRoute: PermissionChangeRoute) {
        super(permissionChangeRoute, billPaymentService, constants);

        this.stepWizard = {
            input: {
                data: [{ name: '1', label: 'stepWizard.enterDetails' }, { name: '2', label: 'stepWizard.confirm' }],
                step: 0,
                style: this._Constants.STYLE_RIB_WEB
            }
        };
    }

    ngOnInit(): void {
        super.setIsAdd(false);
        this.setNextPage('MANAGE_BILLER.EDIT_CONFIRM');
        this.init();
        this.labelTitle = 'label.titleEditBiller';

        this.billPaymentAddEditForm = this.formBuilder.group({
            'billerAliasName': ['', [
                ValidationService.requiredValidator,
            ]
            ],
            'ref1': ['', [
                ValidationService.requiredValidator,
            ]
            ],
            'ref2': ['', [
                ValidationService.requiredValidator,
            ]
            ],
        });

        if (this.billPaymentService.selectBillerDetailData !== null) {
            this.billPaymentAddEditForm.patchValue({
                billerAliasName: this.billPaymentService.selectBillerDetailData.billerAliasName,
                ref1: this.billPaymentService.selectBillerDetailData.ref1,
                ref2: this.billPaymentService.selectBillerDetailData.ref2
            });
            if (typeof this.billPaymentService.confirmAddBillerData !== 'undefined') {
                this.billPaymentAddEditForm.patchValue({
                    billerAliasName: this.billPaymentService.confirmAddBillerData.billerAliasName,
                    ref1: this.billPaymentService.confirmAddBillerData.ref1,
                    ref2: this.billPaymentService.confirmAddBillerData.ref2
                });
                this.resetBillerObject();
            }

        } else {

        }

        this.billPaymentAddEditForm.get('ref1').disable();
        this.billPaymentAddEditForm.get('ref2').disable();
        this.isDisabledDropDrown = true;
    }

    public onSubmitBillpaymentAddEdit(): void {
        this.submitted = true;
        if (!this.billPaymentAddEditForm.valid) return;

        this.billPaymentService.confirmAddBillerData = this.billPaymentService.selectBillerDetailData;
        this.billPaymentService.confirmAddBillerData.billerAliasName = this.billPaymentAddEditForm.value.billerAliasName;
        super.verifyEditBillCustomer(this.billPaymentAddEditForm.value.billerAliasName);
    }
}