import { Component } from '@angular/core';
import { Constants } from '../../../../share/service/constants';
import { MyAccountService } from '../../../../pages/my-account/my-account.service';
import { MyAccountListPage } from '../../my-account-list-page';
import { PermissionChangeRoute, PermissionService } from '../../../../share/service/permission.service';
import { TranslateService } from "ng2-translate/src/translate.service";

@Component({
  selector: 'my-account-list-page',
  templateUrl: '../../my-account-list-page.html' 
})
export class MyAccountListPageComponent extends MyAccountListPage {
    constructor(public permissionChangeRoute: PermissionChangeRoute,
     public constants: Constants, 
     public myAccountService: MyAccountService, 
     public translateService: TranslateService, 
     public permissionService: PermissionService) {
      super(permissionChangeRoute, constants, myAccountService, translateService, permissionService);
    }
}
