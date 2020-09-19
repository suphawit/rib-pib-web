import { Component, OnInit } from '@angular/core';
import { PermissionChangeRoute } from '../../../../../share/service/permission.service';
import { MyAccountService } from '../../../../../pages/my-account/my-account.service';
import { PermissionAction } from '../../../../../share/service/permission.service';
import { Constants } from '../../../../../share/service/constants';
import { MyAccountAddEditConfirmBase } from '../../../my-account-add-edit-confirm-base';

declare var BUILD_NUM;

@Component({
    selector: 'my-account-add-confirm',
    templateUrl: '../../../my-account-add-edit-confirm.html'
})
export class MyAccountEditConfirmComponent extends MyAccountAddEditConfirmBase implements OnInit{
    public BUILD_NUM = BUILD_NUM;
    constructor(
        public permissionChangeRoute: PermissionChangeRoute,
        public myAccountService: MyAccountService,
        public permissionAction: PermissionAction,
        public constants:Constants) {
            super(permissionChangeRoute, myAccountService, permissionAction, constants);
    }

    ngOnInit() {
        super.setStyle(this.constants.STYLE_RIB_WEB);
        super.setMyAccountAddEditTitle('my.account.edit.title');
        super.init();
        this.isAdd = false;
        this.isRequestOTP = true;
        this.isRequireOTP = false;
    }

    onSubmitMyAccountSubmit() {
        super.myAccountSubmit();
    }
}