import { Component, OnInit } from '@angular/core';
import { MyAccountAddEdit } from '../../../my-account-add-edit';
import { MyAccountService } from '../../../../../pages/my-account/my-account.service';
import { PermissionAction } from '../../../../../share/service/permission.service';
import { Constants } from '../../../../../share/service/constants';
import { PermissionChangeRoute } from '../../../../../share/service/permission.service';
import { FormBuilder } from '@angular/forms';
import { ValidationService } from '../../../../../share/service/validation.service';
import { FundTransferService } from '../../../../../share/service/fund-transfer.service';
import { TranslateService } from 'ng2-translate';

@Component({
    selector: 'my-account-edit',
    templateUrl: '../../../my-account-add-edit.html'
})
export class MyAccountEditComponent extends MyAccountAddEdit implements OnInit {

    public myAccountAddEditForm: any;
    
    constructor(
        public fb: FormBuilder,
        public permissionChangeRoute: PermissionChangeRoute,
        public myAccountService: MyAccountService,
        public fundTransferService: FundTransferService,
        public permissionAction: PermissionAction,
        public constants:Constants,
        public translate: TranslateService) {
            super(permissionChangeRoute, myAccountService, fundTransferService, permissionAction, constants, translate);
    }

    ngOnInit() {
        super.setStyle(this.constants.STYLE_PIB_WEB);
        super.setCurrentStepWizard(0);
        super.setMyAccountAddEditTitle('my.account.edit.title');
        this.isAdd = false;
        super.init();
        this.buildForm();

        if(this.myAccountService.selectAccountDetailData !== null){
            this.myAccountAddEditForm.patchValue({
                myAccountAliasName: this.myAccountService.selectAccountDetailData.myAccountAliasName, 
                myAccountNumber: this.myAccountService.selectAccountDetailData.myAccountNumber
            });
            if(typeof this.myAccountService.newMyAccountData !== 'undefined'){
                this.myAccountAddEditForm.patchValue({
                    myAccountNumber: this.myAccountService.newMyAccountData.myAccountNumber, 
                    myAccountAliasName: this.myAccountService.newMyAccountData.myAccountAliasName
                });
                this.resetMyAccountObject();
            }

        } else {

        }
    }

    private buildForm(): void {
        this.myAccountAddEditForm = this.fb.group({
            'myAccountAliasName':['', [
                ValidationService.requiredValidator,
                ]
            ],
            'myAccountNumber':['', [
                ValidationService.requiredValidator,
                ]
            ]
        });
        let myAccountNumberCtrl = this.myAccountAddEditForm.get('myAccountNumber');
        myAccountNumberCtrl.disable();
    }

    public onSubmitMyAccount(){
        this.submitted = true;
        if(!this.myAccountAddEditForm.valid) return;

        this.myAccountService.newMyAccountData = this.myAccountService.selectAccountDetailData;
        this.myAccountService.newMyAccountData.myAccountAliasName = this.myAccountAddEditForm.value.myAccountAliasName;
        super.verifyEditMyAccount();
    }

}