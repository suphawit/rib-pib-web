import { Constants } from '../../../../share/service/constants';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PermissionChangeRoute } from '../../../../share/service/permission.service';
import { TranslateService } from 'ng2-translate/src/translate.service';
import { RequestToPayAddForm } from '../request-to-pay-add-form';
import { Dateservice } from '../../../../share/service/date.service';
import { MasterDataService } from '../../../../share/service/master-data.service';
import { RequestToPayService } from '../../request-to-pay.service';
import { OtherAccountService } from '../../../other-account/other-account.service';
import { UtilService } from '../../../../share/service/util.service';
@Component({
  selector: 'rib-add-rtp-step1',
  templateUrl: '../request-to-pay-add-form.html'
})

export class AddRequestToPayStep1 extends RequestToPayAddForm implements OnInit, OnDestroy {
  private stepWizard: any;
  constructor(public constants: Constants,
    public permissionChangeRoute: PermissionChangeRoute,
    public translate: TranslateService,
    public dateservice: Dateservice,
    public masterDataService: MasterDataService,
    public requestToPayService: RequestToPayService,
    public otherAccountService: OtherAccountService,
    public utilService: UtilService) {
        super(constants,permissionChangeRoute,translate,dateservice,masterDataService,requestToPayService,otherAccountService,utilService);
        
        this.stepWizard = {
            input: {
                data: [{ name: '1', label: 'stepWizard.enterDetails' }, { name: '2', label: 'stepWizard.confirm' }, { name: '3', label: 'stepWizard.complete' }],
                step: 0,
                style: this.constants.STYLE_RIB_WEB
            }
        };
        this.settings = { styleClass: this.constants.STYLE_RIB_WEB };
  }
}