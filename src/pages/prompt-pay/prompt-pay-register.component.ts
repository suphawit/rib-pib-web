import { TranslateService } from 'ng2-translate';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Constants } from '../../share/service/constants';
import { OrderByPipe } from '../../share/pipe/order-by.pipe';
import { UtilService } from '../../share/service/util.service';
import { PermissionAction } from '../../share/service/permission.service';
import { ValidationService } from '../../share/service/validation.service';
import { PermissionChangeRoute } from '../../share/service/permission.service';
import { StepWizard } from '../../share/component/step-wizard/step-wizard.component';
import { PromptPayRegisterServiceMain } from '../../pages/prompt-pay/prompt-pay-register.service';
import { AlertMessageComponent } from '../../share/component/alert-message/alert-message.component';
import { TermAndConditionModalService } from '../../share/component/terms-and-conditions/terms-and-conditions-modal.service';
import { TermsAndConditionsModalComponent } from '../../share/component/terms-and-conditions/terms-and-conditions-modal.component';

@Component({
    selector: 'prompt-pay-register',
    templateUrl: 'prompt-pay-register.html',
})
export class PromptPayRegisterComponent {
    public type: string;
    public result: any;
    stepwizardStyle: String;
    message: string;
    public myAccountList = [];
    public anyIDTypeHead: string;
    public resultAnyIDInfo: any;
    public resultMyAccount: any;
    public stepWizard: StepWizard;
    public isAgree: boolean = false;
    public resultAnyIDConfirm: any;
    public anyIDTypeNameSelected: any;
    public registerPromptPayFormGroup: any;
    submitted: boolean = false;
    pageStyle: string;
    option:any;

    get currentLang() {
        return this.translate.currentLang.toUpperCase();
    }

    @ViewChild('alertMessage') public alertMessage: AlertMessageComponent;
    @ViewChild('anyIDTermsAndCondition') public childModal: TermsAndConditionsModalComponent;

    constructor(public permissionAction: PermissionAction,
        public promptPayRegisterServiceMain: PromptPayRegisterServiceMain,
        public constants: Constants,
        public termAndConditionModalService: TermAndConditionModalService,
        public permissionChangeRoute: PermissionChangeRoute,
        public translate: TranslateService,
        public fb: FormBuilder,
        public orderBy: OrderByPipe,
        public utilService: UtilService) {
    }

    ngOnInit(): void {
        this.stepWizard = {
            input: {
                data: [{ name: '1', label: 'stepWizard.enterDetails' }, { name: '2', label: 'stepWizard.confirm' }, { name: '3', label: 'stepWizard.complete' }],
                step: 0,
                style: this.stepwizardStyle
            }
        }
        this.registerPromptPayFormGroup = this.fb.group({
            'account': ['', [
                Validators.required,
            ]
            ],
            'anyIDType': ['', [
                ValidationService.requiredValidator,
            ]
            ],
            'isAgree': false
        });

        this.inquiryCustomerAnyIDInformation();
        this.inquiryMyAccount();

        if (window != window.top) {
            let root = this;

            setTimeout(function () {
                root.utilService.pageLoad(20);
            }, 500);
        }
    }

    public onChange() {
        this.anyIDTypeNameSelected = '';
        let anyIDType = this.resultAnyIDInfo.find(x => x.anyIDType == this.registerPromptPayFormGroup.value.anyIDType);

        if (anyIDType) {
            if (this.currentLang == this.constants.CULTURE_SHORTNAME_ENGLISH) {
                this.anyIDTypeHead = anyIDType.descriptionEN;
            } else {
                this.anyIDTypeHead = anyIDType.descriptionTH;
            }

            this.anyIDTypeNameSelected = this.anyIDTypeHead + ' ' + ':' + ' ' + anyIDType.anyIDValue;
        }
    }

    public verifyPromptPayRegisterStep(): void {
        if (this.registerPromptPayFormGroup.value) {
            this.registerAnyIDConfirm();
        }
    }

    public inquiryCustomerAnyIDInformation() {
        this.promptPayRegisterServiceMain.inquiryCustomerAnyIDInformation().then((objResponse: any) => {
            let result = objResponse.responseJSON.result;

            if (result.responseStatus.responseCode == this.constants.RESP_CODE_SUCCESS) {
                this.resultAnyIDInfo = result.value;
            } else {
                this.message = result.responseStatus.errorMessage;
                this.type = 'danger';
                this.alertMessage.show();
            }
        }, function (error) {

        });
    }

    public inquiryMyAccount() {
        this.promptPayRegisterServiceMain.inquiryMyAccount().then((objResponse: any) => {
            let result = objResponse.responseJSON.result;

            if (result.responseStatus.responseCode == this.constants.RESP_CODE_SUCCESS) {
                this.resultMyAccount = result.value;

                if (this.resultMyAccount.length > 0) {
                    this.resultMyAccount = this.orderBy.aliasName(this.resultMyAccount, "");

                    for (let i = 0; i < this.resultMyAccount.length; i++) {
                        let account = this.resultMyAccount[i].myAccountAliasName + " " + "|" + " " + this.resultMyAccount[i].myAccountNumber;
                        this.myAccountList.push(account);
                    }
                }

                this.verifyRouteBack();
            } else {
                this.message = result.responseStatus.errorMessage;
                this.type = 'danger';
                this.alertMessage.show();
            }
        }, function (error) {

        });
    }

    onSubmit() {
        if (this.registerPromptPayFormGroup.valid) {
            this.registerAnyIDConfirm();
        }
    }

    openTermsAndConditionsModal() {
        this.childModal.showChildModal();
    }

    public registerAnyIDConfirm() {
        let anyIDType = this.registerPromptPayFormGroup.value.anyIDType;
        let myAccountID = this.registerPromptPayFormGroup.value.account;
        let param = { anyIDType, myAccountID };

        this.promptPayRegisterServiceMain.registerAnyIDConfirm(param).then((objResponse: any) => {
            this.result = objResponse.responseJSON.result;

            if (this.result.responseStatus.responseCode == this.constants.RESP_CODE_SUCCESS) {

                this.resultAnyIDConfirm = this.result.value;
                this.promptPayRegisterServiceMain.verifyTransactionId = this.resultAnyIDConfirm.verifyTransactionId;
                let checkRegister = this.result.value.register;

                if (checkRegister == true) { //temp data for route back
                    this.promptPayRegisterServiceMain.tempRegisterAnyIDData = {
                        tempRegisterAnyID: this.registerPromptPayFormGroup.value,
                        anyIDTypeNameSelected: this.anyIDTypeNameSelected,
                        resultAnyIDConfirm: this.resultAnyIDConfirm
                    };
                    this.permissionChangeRoute.changeRoute('KK_PRODUCT_SERVICE.REGISTER_KK_PROMPT_PAY_STEP2');
                } else {
                    this.message = this.result.responseStatus.errorMessage;
                    this.type = 'danger';
                    this.alertMessage.show();
                }
            } else {
                this.message = this.result.responseStatus.errorMessage;
                this.type = 'danger';
                this.alertMessage.show();
            }
        }, function (error) {

        });
    }

    private verifyRouteBack() {
        let tempRegisterAnyIDDatas = this.promptPayRegisterServiceMain.tempRegisterAnyIDData;

        if (tempRegisterAnyIDDatas != undefined) {
            this.registerPromptPayFormGroup.patchValue(tempRegisterAnyIDDatas.tempRegisterAnyID);
            this.onChange();

            // Delete temp data
            this.promptPayRegisterServiceMain.tempRegisterAnyIDData = undefined;
        }
    }

    navigateback(): void {
        this.permissionChangeRoute.changeRoute('KK_PRODUCT_SERVICE');
    }
}
