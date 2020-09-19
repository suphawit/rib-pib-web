import { Component, OnInit } from '@angular/core';
import { ForgotUsernameService } from '../../share/services/forgot-username.service';

@Component({
    selector: 'forgot-username-products-step1',
    templateUrl: 'forgot-username-products-step1.html'
})
export class ForgotUsernameByProductsStep1Component implements OnInit {
    verifyMethod: any;
    stepCaptionData: any;
    formHeader: any;

    constructor(
        public forgotUsernameService: ForgotUsernameService){
    }

    ngOnInit():void {
        this.formHeader = {
            title: 'label.forgotusername',
            stepwizOption: {
                data: [{name: '', label: 'wiz.selectMethod'},{name: '', label: 'wiz.identify'},{name:'', label:'wiz.verOTP'},{name:'', label:'wiz.showUsername'}],
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
            selected: 'kkproducts',
            onChange: (event)=>{
                //
                if(event === 'next'){
                    this.forgotUsernameService.changeRoute('products2');
                } else {
                    this.forgotUsernameService.changeRouteByRadioBox(event);
                }
            }
        };

        this.stepCaptionData = {
            step: {
                step: 0,
                totalStep: 4
            },
            title: 'lbl.forgotUsernameStep'
        };

    }
}