import { Component, Inject } from '@angular/core';
import { Constants } from '../../../../share/service/constants';
import { Router } from '@angular/router';
import { MyAccountService } from '../../../../pages/my-account/my-account.service';
import { PermissionChangeRoute } from '../../../../share/service/permission.service';
import { TranslateService } from 'ng2-translate';
import { MyAccountDetailPage } from '../../my-account-detail-page';

@Component({
  selector: 'my-account-detail-page',
  templateUrl: '../../my-account-detail-page.html'
})
// Component class
export class MyAccountDetailPageComponent extends MyAccountDetailPage {
    constructor(@Inject(Router) public router: Router, public constants: Constants, public myAccountService: MyAccountService, public permissionChangeRoute: PermissionChangeRoute, public translate: TranslateService) {
      super(router, constants, myAccountService, permissionChangeRoute, translate);

      this.permissionChangeRoute.prevUrl = this.router.url;
    }
}