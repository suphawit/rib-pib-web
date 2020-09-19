import { Component, OnInit , ViewChild} from '@angular/core';
import { Constants } from '../../../../share/service/constants';
import { MyAccountService } from '../../../../pages/my-account/my-account.service';
import { TranslateService } from 'ng2-translate';
import { PermissionService, PermissionChangeRoute } from '../../../../share/service/permission.service';
import { AlertMessageComponent } from '../../../../share/component/alert-message/alert-message.component';
import { DashboardComponent } from '../dashboard.component';
import { RequestToPayService } from '../../../../pages/request-to-pay/request-to-pay.service';
import { MasterDataService } from '../../../../share/service/master-data.service';
@Component({
    selector: 'rib-web-dashboard',
    templateUrl: '../dashboard.html'
})
export class RIBWebDashboardComponent extends DashboardComponent{

    constructor(
        public myAccountService: MyAccountService,
        public constants: Constants,
        public translateService: TranslateService,
        public permissionService: PermissionService,
        public permissionChangeRoute: PermissionChangeRoute,
        public requestToPayService: RequestToPayService,
        public masterDataService: MasterDataService) {
        
        super(myAccountService,constants,translateService,permissionService,
        permissionChangeRoute,requestToPayService,masterDataService);
    }
    
}