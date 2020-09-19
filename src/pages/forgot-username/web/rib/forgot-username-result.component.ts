import { Component, OnInit } from '@angular/core';
import { ForgotUsernameService } from './forgot-username.service';
import { PermissionChangeRoute } from '../../../../share/service/permission.service';

@Component({
  selector: 'forgot-username-result',
  template: '<div class="row"><label class="control-label col-sm-3">{{"label.showUsername"|translate}}</label><div class="col-sm-9">{{usernameForgot}}</div></div>'
})
// Component class
export class ForgotUsernameResultComponent implements OnInit, ForgotUsernameResult {
    usernameForgot: string;

    constructor(public forgotUsernameService: ForgotUsernameService, public permissionChangeRoute: PermissionChangeRoute) {
        if(permissionChangeRoute.targetAction === 'forgot-username/result'){
          permissionChangeRoute.targetAction = null;
        } else {
          forgotUsernameService.username = null;
          forgotUsernameService.cardInfo = null;
          permissionChangeRoute.changeRoute("HOME");
        }
    }

    ngOnInit(): void {
      this.forgotUsernameService.updateObserver([
        { key: 'stepwizard', value: 3 },
        { key: 'alertmessage', value: '' }
      ]);
      this.usernameForgot = this.forgotUsernameService.username;
    }
}
interface ForgotUsernameResult{
  usernameForgot: string;
}