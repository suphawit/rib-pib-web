import { Constants } from '../../../../share/service/constants';
import { Component, OnInit } from '@angular/core';
import { PermissionChangeRoute, PermissionService } from '../../../../share/service/permission.service';
import { RequestToPayService } from '../../request-to-pay.service';
import { RTPComplete } from '../request-to-pay-add-complete'
@Component({
  selector: 'pib-add-rtp-step3',
  templateUrl: '../request-to-pay-add-complete.html'
})

export class AddRequestToPayStep3 extends RTPComplete implements OnInit{
   stepWizard: any;

  constructor( public constants: Constants,
        public permissionChangeRoute: PermissionChangeRoute,
        public permissionService: PermissionService,
        public requestToPayService: RequestToPayService) {
        super(constants,permissionChangeRoute,permissionService,requestToPayService);
        this.stepWizard = {
            input: {
                data: [{ name: '1', label: 'stepWizard.enterDetails' }, { name: '2', label: 'stepWizard.confirm' }, { name: '3', label: 'stepWizard.complete' }],
                step: 2,
                style: this.constants.STYLE_PIB_WEB
            }
        };
  }

}