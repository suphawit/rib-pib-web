import { ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Constants } from '../../share/service/constants';
import { OrderByPipe } from '../../share/pipe/order-by.pipe';
import { PromptPayRegisterServiceMain } from '../../pages/prompt-pay/prompt-pay-register.service';
import { AlertMessageComponent } from '../../share/component/alert-message/alert-message.component';
import { TermsAndConditionsModalComponent } from '../../share/component/terms-and-conditions/terms-and-conditions-modal.component';
import { PermissionChangeRoute } from '../../share/service/permission.service';

export class PromptPayEditComponent {
    alertMessageForm = {type: 'danger', message: '', option: {}};
     public myAccountList = [];
     public EditPromptPayFormGroup: any;
     public currentRegistedPromptPay: any;

    @ViewChild('alertMessage') public alertMessage: AlertMessageComponent;
    @ViewChild('anyIDTermsAndCondition') public childModal: TermsAndConditionsModalComponent;

    constructor(public promptPayRegisterServiceMain: PromptPayRegisterServiceMain,
    public constants: Constants,
    public orderBy: OrderByPipe,
    public fb: FormBuilder,
    public permissionChangeRoute: PermissionChangeRoute){

    }

    ngOnInit(): void {
        //init form
        this.initEditPromptPayFormGroup();
        // need to finish inquiry my acc before check tmp route back
        this.inquiryMyAccount().then((resp: any) => {
             this.chkForRouteBackFromEditAccountConfirm();
        });
        this.currentRegistedPromptPay = this.promptPayRegisterServiceMain.PromptPayAccountDetail;
    }

    initEditPromptPayFormGroup() {
         this.EditPromptPayFormGroup = this.fb.group({
            'account': ['', [
                Validators.required,
                ]
            ],
            'isAgree': false
        });
    }

    public inquiryMyAccount() {
        let promise = new Promise((resolve, reject) => {
            this.promptPayRegisterServiceMain.inquiryMyAccount().then((objResponse: any) => {
                let result = objResponse.responseJSON.result;
                if (result.responseStatus.responseCode == this.constants.RESP_CODE_SUCCESS) {
                    let resultMyAccount = result.value;

                    if (resultMyAccount.length > 0) {
                        //filter out the registerd my promptpay account
                        this.myAccountList = (this.orderBy.aliasName(resultMyAccount, ""))
                        .filter((item)=>item.myAccountNumber !== this.currentRegistedPromptPay.accountNo )
                        resolve(true);
                    }    
                } else {
                    this.alertMessageForm.message = result.responseStatus.errorMessage;
                    this.alertMessage.show();
                }
            }, function (error) {

            });
        });
        return promise;
    }

    public chkForRouteBackFromEditAccountConfirm(){
        if(this.promptPayRegisterServiceMain.EditAnyIDData != undefined){
            this.EditPromptPayFormGroup.patchValue(this.promptPayRegisterServiceMain.EditAnyIDData.tmpEditPromptPayFormGroup);
            this.promptPayRegisterServiceMain.EditAnyIDData = undefined;
        }
    }

    onSubmit() {
        let newSelectedAccount = this.myAccountList.find((item)=>item.myAccountNumber == this.EditPromptPayFormGroup.value.account );
        let param = {
            anyIDType: this.currentRegistedPromptPay.anyIDType.anyIDType,
            anyIDValue: this.currentRegistedPromptPay.anyIDValue,
            fromAccountNo: this.currentRegistedPromptPay.accountNo,
            toAccountName: newSelectedAccount.myAccountName,
            toAccountNo: newSelectedAccount.myAccountNumber
        };
        this.verifyPromptPayEditAccount(param);
    }

    verifyPromptPayEditAccount(param: any){
        this.promptPayRegisterServiceMain.verifyPromptPayEditAccountService(param).then((objResponse: any) => {
            let result = objResponse.responseJSON.result;

            if (result.responseStatus.responseCode == this.constants.RESP_CODE_SUCCESS) {
                let verifyEditPromptPayAccount = result.value;
                //temp formGroup data for route back case
                verifyEditPromptPayAccount.tmpEditPromptPayFormGroup = this.EditPromptPayFormGroup.value;

                this.promptPayRegisterServiceMain.EditAnyIDData = verifyEditPromptPayAccount;
                this.permissionChangeRoute.changeRoute('MY_KK_PROMPTPAY.EDIT_CONFIRM');
            } else {
                this.alertMessageForm.message = result.responseStatus.errorMessage;
                this.alertMessage.show();
            }
        }, function (error) {

        });
    }

    openTermsAndConditionsModal() {
        this.childModal.showChildModal();
    }
}
