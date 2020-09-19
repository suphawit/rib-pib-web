import { Constants } from '../../../../share/service/constants';
import { Component, OnInit } from '@angular/core';
import { PermissionChangeRoute } from '../../../../share/service/permission.service';
import { RequestToPayService } from '../../request-to-pay.service';
import { RTPConfirm } from '../request-to-pay-add-confirm';
import { Dateservice } from '../../../../share/service/date.service';

@Component({
  selector: 'rib-add-rtp-step2',
  templateUrl: '../request-to-pay-add-confirm.html'
})

export class AddRequestToPayStep2 extends RTPConfirm implements OnInit{
  private stepWizard: any;

  constructor(public constants: Constants,
    public permissionChangeRoute: PermissionChangeRoute,
    public requestToPayService: RequestToPayService,
    public dateService: Dateservice) {
        super(constants,permissionChangeRoute,requestToPayService, dateService);
        this.stepWizard = {
            input: {
                data: [{ name: '1', label: 'stepWizard.enterDetails' }, { name: '2', label: 'stepWizard.confirm' }, { name: '3', label: 'stepWizard.complete' }],
                step: 1,
                style: this.constants.STYLE_RIB_WEB
            }
        };
        this.settings = { styleClass: this.constants.STYLE_RIB_WEB };
  }

}