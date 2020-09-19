import { Component, OnInit, Inject } from '@angular/core';
import { Constants } from '../../../../share/service/constants';
import { Router } from '@angular/router';
import { ChangeUsernameService } from './share/change-username.service';

@Component({
    selector: 'change-username-step1',
    templateUrl: 'change-username-step1.html'
})
export class ChangeUsernameStep1Component implements OnInit {
    stepCaptionData: any;
    formHeader: any;
    verifyOTP: any;

    constructor(public constants: Constants, @Inject(Router) public router: Router, public changeUsernameService: ChangeUsernameService){
    }

    ngOnInit():void {
        this.formHeader = {
            title: 'lbl.changeUsername',
            stepwizOption: {
                data: [{name: '', label: 'wiz.verOTP'},{name: '', label: 'lbl.changeUsername'}],
                style: 'rib-web',
                step: 0
            },
            alertMsgOption: {
                type: 'danger',
                message: '',
                show: false
            }
        };

        this.stepCaptionData = {
            step: {
                step: 0,
                totalStep: 2
            },
            title: 'lbl.changeUsernameStep'
        };

        this.verifyOTP = {
            data: {
                otp: '',
                referenceNO: '',
                tokenOTPForCAA: ''
            },
            actionOTP: this.constants.ACTION_CODE_CHANGE_USERNAME,
            style: this.constants.STYLE_RIB_WEB,
            onClickSubmitOTP: (data: any)=>{
                if(data.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS){
                    this.changeUsernameService.changeRoute('step2');
                }else{
                    this.setErrorMessage(data.responseStatus.errorMessage);
                }
            },
            onRequestOTP: (result)=>{
                if (result['errorMessage']) {
                    this.setErrorMessage(result.errorMessage);
                } 
            }
        };

        this.inquiryUsername();
    }

    private setErrorMessage(msg: string){
        this.formHeader.alertMsgOption = {
            type: 'danger',
            message: msg,
            show: (msg ? true : false)
        };
    }

    private inquiryUsername(){
        this.changeUsernameService.inquiryUsername().then((result: any) => {
            this.changeUsernameService.username = result;
        }, (error) => {
            this.setErrorMessage(error.responseStatus.errorMessage); 
        });
    }
}