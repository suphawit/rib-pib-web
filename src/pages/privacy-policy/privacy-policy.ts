import { OnInit } from '@angular/core';
import { Constants } from '../../share/service/constants';
import { GetinformationService } from '../../share/service/getInformation.service';
import { PermissionService } from '../../share/service/permission.service';
import { TranslateService } from "ng2-translate/src/translate.service";

export class PrivacyPolicy implements OnInit {
    result: any;
    actionCodeService: string = 'policy';

    constructor(public getinformationService: GetinformationService,
        public constants: Constants,
        public permissionService: PermissionService,
        public translateService: TranslateService) {
    }

    ngOnInit() {
        
        this.getPrivacyPolicy();
    }

    getPrivacyPolicy(): void {
        let isLogin = this.permissionService.getIsLogin();
        let procedureName = "";

        if(isLogin) {
            procedureName = "getPrivacyWithLoginProcedure";
        } else {
            procedureName = "getPrivacyProcedure";
        }

        this.getinformationService.getInformation(procedureName, this.actionCodeService).then((objResponse: any) => {
            this.result = objResponse.responseJSON.result.value.data;
        }, function (error) {
            
        });
    }
}
