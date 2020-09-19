import { QRGeneratorBase } from '../../qr-generator-base';
import { Constants } from '../../../../share/service/constants';
import { FormBuilder, Validators } from '@angular/forms';
import { ResponseStatusBean } from '../../../bean/response-status-bean';
import { TranslateService } from "ng2-translate/src/translate.service";
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { qrGeneratorService } from '../../qr-generator.service';
import { ValidationService } from '../../../share/service/validation.service';
import { RequestToPayService } from '../../../request-to-pay/request-to-pay.service';
import { MasterDataService } from '../../../../share/service/master-data.service';
import { CurrencyFormatterPipe } from '../../../../share/pipe/currency-formatter.pipe';
import { PermissionService, PermissionChangeRoute, PermissionMainMenu } from '../../../../share/service/permission.service';
@Component({
    selector: 'pib-web-qr-generator',
    templateUrl: '../qr-generator-web.html'
})

export class PIBWebQRGeneratorComponent extends QRGeneratorBase implements OnInit {
    private stepWizard: any;
    
    constructor(
    protected fb: FormBuilder,
    protected requestToPayService: RequestToPayService,
    protected translate: TranslateService,
    protected constants: Constants,
    protected masterDataService: MasterDataService,
    protected qrGeneratorService: qrGeneratorService,
    protected currencyFormatter: CurrencyFormatterPipe,
    protected permissionChangeRoute: PermissionChangeRoute
    )
     {
        super(fb,requestToPayService,translate,constants,masterDataService,qrGeneratorService,currencyFormatter,permissionChangeRoute);
    }

    public ngOnInit() {
        this.stepWizard = {
            input: {
                data: [{ name: '1', label: 'stepWizard.enterDetails' }, { name: '2', label: 'stepWizard.complete' }],
                step: 0,
                style: this.constants.STYLE_PIB_WEB
            }
        }
        
        this.initial();
    }

}
