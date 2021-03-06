import { Component, OnInit } from '@angular/core';
import { ForgotUsernameService } from '../../share/services/forgot-username.service';

@Component({
    selector: 'forgot-username-debitcard-step1',
    templateUrl: 'forgot-username-debitcard-step1.html'
})
export class ForgotUsernameByDebitcardStep1Component implements OnInit {
    stepCaptionData: any;
    verifyMethod: any;
    formHeader: any;

    constructor(public forgotUsernameService: ForgotUsernameService){
    }

    ngOnInit():void {
        this.formHeader = {
            title: 'label.forgotusername',
            stepwizOption: {
                data: [{name: '', label: 'wiz.selectMethod'},{name: '', label: 'wiz.identify'},{name:'', label:'wiz.showUsername'}],
                style: 'rib-web',
                step: 0
            },
            alertMsgOption: {
                type: 'danger',
                message: '',
                show: false
            }
        };

        this.verifyMethod = {
            selected: 'debitcard',
            onChange: (event)=>{
                // 
                if(event === 'next'){
                    this.forgotUsernameService.changeRoute('debitcard2');
                } else {
                    this.forgotUsernameService.changeRouteByRadioBox(event);
                }
            }
        };

        this.stepCaptionData = {
            step: {
                step: 0,
                totalStep: 3
            },
            title: 'lbl.forgotUsernameStep'
        };
   
    }
}