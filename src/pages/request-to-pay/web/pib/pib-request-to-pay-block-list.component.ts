import { Constants } from '../../../../share/service/constants';
import { TranslateService } from "ng2-translate/src/translate.service";
import { Component,OnInit, Input, OnChanges} from '@angular/core';
import { MasterDataService } from '../../../../share/service/master-data.service';
import { RequestToPayService } from '../../../../pages/request-to-pay/request-to-pay.service';
import { PermissionChangeRoute } from '../../../../share/service/permission.service';
import { RequestToPayBlockListComponent } from '../request-to-pay-block-list';
import { UtilService } from '../../../../share/service/util.service';

@Component({
    selector: 'pib-request-to-pay-block-list',
    templateUrl: '../request-to-pay-block-list.html'
})
export class PIBRequestToPayBlockListComponent extends RequestToPayBlockListComponent{

    constructor(public constants: Constants,
        public translateService: TranslateService,
        public masterDataService: MasterDataService,
        public requestToPayService: RequestToPayService,
        public permissionChangeRoute: PermissionChangeRoute,
        public utilService: UtilService) {
        super(constants,translateService,masterDataService,requestToPayService,permissionChangeRoute,utilService);
    }
}

