import { Component, OnInit, OnDestroy } from '@angular/core';
import { MyAccountAddEdit } from '../../../my-account-add-edit';
import { MyAccountService } from '../../../../../pages/my-account/my-account.service';
import { PermissionAction } from '../../../../../share/service/permission.service';
import { Constants } from '../../../../../share/service/constants';
import { PermissionChangeRoute } from '../../../../../share/service/permission.service';
import { FormBuilder } from '@angular/forms';
import { FundTransferService } from '../../../../../share/service/fund-transfer.service';
import { ValidationService } from '../../../../../share/service/validation.service';
import { TranslateService } from "ng2-translate/src/translate.service";

@Component({
    selector: 'my-account-add',
    templateUrl: '../../../my-account-add-edit.html'
})
export class MyAccountAddComponent extends MyAccountAddEdit implements OnInit, OnDestroy {

    public myAccountAddEditForm: any;

    constructor(
        public fb: FormBuilder,
        public permissionChangeRoute: PermissionChangeRoute,
        public myAccountService: MyAccountService,
        public permissionAction: PermissionAction,
        public constants:Constants, 
        public fundTransferService: FundTransferService,
        public translateService: TranslateService) {
            super(permissionChangeRoute,myAccountService,fundTransferService,permissionAction,constants,translateService);
    }

    ngOnInit() {
        super.setStyle(this.constants.STYLE_RIB_WEB);
        super.setCurrentStepWizard(0);
        super.setMyAccountAddEditTitle('my.account.add.title');
        this.isAdd = true;
        super.init();
        this.buildForm();
        
        if(typeof this.myAccountService.newMyAccountData !== 'undefined'){
            this.myAccountAddEditForm.patchValue({
                myAccountNumber: this.myAccountService.newMyAccountData.myAccountNumberOld || this.myAccountService.newMyAccountData.myAccountNumber, 
                myAccountAliasName: this.myAccountService.newMyAccountData.myAccountAliasName
            });
            this.resetMyAccountObject();
        }
        // add account after transferd
        this.initNewAccountAfterFund();
    }

    ngOnDestroy(){
        // this.fundTransferService.newAccountAfterFund = null;
    }

    onSubmitMyAccount() {
        this.submitted = true;
        if(!this.myAccountAddEditForm.valid) return;

        if(this.newAccountAfterFund !== undefined){
            this.confirmNewAccountAfterFund();
        } else {
            let objMyAccount: any = {
                myCustomerAccount: {
                    myAccountNumber: this.myAccountAddEditForm.value.myAccountNumber.trim(),
                    myAccountAliasName: this.myAccountAddEditForm.value.myAccountAliasName.trim()
                }
            };
            super.verifyAddMyAccount(objMyAccount);
        }
        
    }

    private buildForm(): void {
        this.myAccountAddEditForm = this.fb.group({
            'myAccountAliasName':['', [
                ValidationService.requiredValidator
                ]
            ],
            'myAccountNumber':['', [
                ValidationService.requiredValidator,
                ValidationService.nonStringValidator
                ]
            ]
        });
    }

    private initNewAccountAfterFund(){
        
        if(this.fundTransferService.newAccountAfterFund){
            this.isBack = false;
            this.newAccountAfterFund = {
                myAccountAliasName: this.fundTransferService.newAccountAfterFund.aliasName !== null? this.fundTransferService.newAccountAfterFund.aliasName.trim() : '',
                myAccountNumber: this.fundTransferService.newAccountAfterFund.accNo.trim(),
                myAccountName: this.fundTransferService.newAccountAfterFund.accName.trim(),
                txnId: this.fundTransferService.newAccountAfterFund.txnId,
                refTxnId: this.fundTransferService.newAccountAfterFund.refTxnId
            };

            this.myAccountAddEditForm.patchValue({
                myAccountNumber: this.newAccountAfterFund.myAccountNumber, 
                myAccountAliasName: this.newAccountAfterFund.myAccountAliasName
            });
            
            let myAccountNumberCtrl = this.myAccountAddEditForm.get('myAccountNumber');
            myAccountNumberCtrl.disable();
        }
    }
    private confirmNewAccountAfterFund(){
        this.myAccountService.newMyAccountData = {
            myAccountAliasName: this.myAccountAddEditForm.value.myAccountAliasName.trim(),
            myAccountNumber: this.newAccountAfterFund.myAccountNumber.trim(),
            myAccountName: this.newAccountAfterFund.myAccountName.trim(),
            txnId: this.newAccountAfterFund.txnId,
            refTxnId: this.newAccountAfterFund.refTxnId
        };
        
        let objMyAccount: any = {
            myCustomerAccount: {
                myAccountAliasName: this.myAccountAddEditForm.value.myAccountAliasName.trim(),
                myAccountNumber: this.newAccountAfterFund.myAccountNumber.trim(),
                txnId: this.newAccountAfterFund.txnId,
                refTxnId: this.newAccountAfterFund.refTxnId
            }
        };

        this.myAccountService.isAccountAfterTransfer = true;
        // this.fundTransferService.newAccountAfterFund = null;

        super.verifyAddMyAccount(objMyAccount);
        // super.gotoMyAccountConfirm();
    }
}