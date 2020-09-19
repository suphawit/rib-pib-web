import { QRGeneratorCompleteBase } from '../../qr-generator-complete-base';
import { Constants } from '../../../../share/service/constants';
import { FormBuilder } from '@angular/forms';
import { ResponseStatusBean } from '../../../bean/response-status-bean';
import { TranslateService } from "ng2-translate/src/translate.service";
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { qrGeneratorService } from '../../qr-generator.service';
import { ValidationService } from '../../../share/service/validation.service';
import { RequestToPayService } from '../../../request-to-pay/request-to-pay.service';
import { MasterDataService } from '../../../../share/service/master-data.service';
import { CurrencyFormatterPipe } from '../../../../share/pipe/currency-formatter.pipe';
import { PermissionService, PermissionChangeRoute, PermissionMainMenu } from '../../../../share/service/permission.service';
import { UtilService } from '../../../../share/service/util.service';

declare var BUILD_NUM;

@Component({
    selector: 'rib-web-qr-generator-complete',
    templateUrl: '../qr-generator-complete-web.html'
})

export class RIBWebQRGeneratorCompleteComponent extends QRGeneratorCompleteBase implements OnInit {
    private stepWizard: any;
    public BUILD_NUM = BUILD_NUM;
    constructor(
    protected requestToPayService: RequestToPayService,
    protected translate: TranslateService,
    protected constants: Constants,
    protected masterDataService: MasterDataService,
    protected qrGeneratorService: qrGeneratorService,
    protected currencyFormatter: CurrencyFormatterPipe,
    protected permissionChangeRoute: PermissionChangeRoute,
    protected utilService: UtilService
    )
     {
        super(requestToPayService,translate,constants,masterDataService,qrGeneratorService,currencyFormatter,permissionChangeRoute,utilService);
    }

    public ngOnInit() {
        this.stepWizard = {
            input: {
                data: [{ name: '1', label: 'stepWizard.enterDetails' }, { name: '2', label: 'stepWizard.complete' }],
                step: 1,
                style: this.constants.STYLE_RIB_WEB
            }
        }
        
        this.initial();
    }

}
