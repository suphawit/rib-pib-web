import {Component, OnInit} from '@angular/core';
import { Constants } from '../../../../share/service/constants';
import { TermsAndConditionsService } from '../../../../share/component/terms-and-conditions/terms-and-conditions.service';
import { PermissionChangeRoute, PermissionService } from '../../../../share/service/permission.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'tc-after-login',
    templateUrl: 'tc-after-login.html',
    providers: [TermsAndConditionsService]
})

export class TermAndConAfterLogin {
    userData: any;
    verifyOTPStyle: string;
    verifyOTPAction: string;
    errorMessage: string = '';
    termAction: string = 'pib_term_and_con';
    screenPage: string = 'account-activate';
    language: string = this.constants.CULTURE_SHORTNAME_THAI;
    private tokenid: any;

    constructor(private termsAndConditionsService: TermsAndConditionsService,
        private permissionService: PermissionService,
        private constants: Constants,
        private permissionChangeRoute: PermissionChangeRoute,
        private route: ActivatedRoute) {

        this.userData = this.permissionService.getUserData();

        this.verifyOTPStyle = this.constants.STYLE_PIB_WEB;
        this.verifyOTPAction = this.constants.ACTION_CODE_TERM_AND_CON;
    }

    onClickSubmitAcceptTermAndConditions(result) {
        this.errorMessage = ''; // Clear error message

        if (result == "agree") {
            this.termsAndConditionsService.setActionCode(this.constants.REQ_ACTION_CODE.UPDATE_TERM_AND_CONDITION);
            this.termsAndConditionsService.updateTermsAndConditionsService(this.permissionService.tokenId).then((objResponse: any) => {
                let responseStatus = objResponse.responseJSON.result.responseStatus;

                if (objResponse.responseJSON.result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                    if(this.userData.newAccept){
                        this.isGetRBACForFirstLogin();
                    }else{
                        this.permissionService.setIsLogin(true);
                        this.permissionService.setIsTermAndCon(true);
                        this.permissionService.removeTermAndCondFromMenuList();
                        this.permissionChangeRoute.changeRoute("MY_DEPOSITS");
                    }
                } else {
                    this.errorMessage = responseStatus.errorMessage;
                }
            }, function (error) {

            });
        }

        if (result == "disagree") {
            this.permissionService.setIsTermAndCon(false);
            this.permissionChangeRoute.changeRoute("LANDING_PAGE");
        }
    }

    public isGetRBACForFirstLogin(){

        this.termsAndConditionsService.getRBACMenuFirstLogin().then((objResponse: any) => {
            if( objResponse.responseJSON.result.responseStatus.responseCode !== this.constants.RESP_CODE_SUCCESS){
                this.errorMessage =  objResponse.responseJSON.result.responseStatus.errorMessage;
            }else{
                this.permissionService.setIsLogin(true);
                this.permissionService.setIsTermAndCon(true);
                this.permissionService.removeTermAndCondFromMenuList();
                this.permissionChangeRoute.changeRoute("MY_DEPOSITS");
            }
        }, function (error) {

        });
     
    }
}
