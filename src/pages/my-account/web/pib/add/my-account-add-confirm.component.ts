import { Component, OnInit, OnDestroy } from '@angular/core';
import { PermissionChangeRoute } from '../../../../../share/service/permission.service';
import { MyAccountService } from '../../../../../pages/my-account/my-account.service';
import { PermissionAction } from '../../../../../share/service/permission.service';
import { Constants } from '../../../../../share/service/constants';
import { MyAccountAddEditConfirmBase } from '../../../my-account-add-edit-confirm-base';
import { FundTransferService } from '../../../../../share/service/fund-transfer.service';

declare var BUILD_NUM;

@Component({
    selector: 'my-account-add-confirm',
    templateUrl: '../../../my-account-add-edit-confirm.html'
})
export class MyAccountAddConfirmComponent extends MyAccountAddEditConfirmBase implements OnInit, OnDestroy{
    public BUILD_NUM = BUILD_NUM;
    constructor(
        public permissionChangeRoute: PermissionChangeRoute,
        public myAccountService: MyAccountService,
        public permissionAction: PermissionAction,
        public constants:Constants,
        public fundTransferService: FundTransferService ) {
            super(permissionChangeRoute, myAccountService, permissionAction, constants);
    }

    ngOnInit() {
        super.setStyle(this.constants.STYLE_PIB_WEB);
        super.setMyAccountAddEditTitle('my.account.add.title');
        //this.isAdd = true;
        super.init();
        this.isAdd = true;
    }

    ngOnDestroy(){
        if (this.permissionChangeRoute.targetAction != 'MY_DEPOSITS.ADD') {
            this.myAccountService.isAccountAfterTransfer = false;
            this.fundTransferService.newAccountAfterFund = null;
        }
    }

    onSubmitMyAccountSubmit() {
        if(this.myAccountService.isAccountAfterTransfer){
            super.addSubmitWithoutOTP();
        } else {
            super.myAccountSubmit();
        }
        
    }
}