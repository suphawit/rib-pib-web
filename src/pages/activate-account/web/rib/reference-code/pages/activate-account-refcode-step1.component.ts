import { Component, OnInit } from '@angular/core';
import { ActivateAccountService } from '../../share/services/activate-account.service';

@Component({
    selector: 'activate-account-refcode-step1',
    templateUrl: 'activate-account-refcode-step1.html'
})
export class ActivateAccountByRefcodeStep1Component implements OnInit {
    verifyMethod: any;
    stepCaptionData: any;
    formHeader: any;

    constructor(public activateAccountService: ActivateAccountService){
    }

    ngOnInit():void {
        this.formHeader = {
            title: 'activate.title',
            stepwizOption: {
                data: [{name: '', label: 'wiz.selectMethod'},{name: '', label: 'wiz.verRef'},{name:'', label:'wiz.termAndCond'},{name:'', label:'wiz.createUsername'}],
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
            selected: 'usingrefcode',
            onChange: (event)=>{
                //
                if(event === 'next'){
                    this.activateAccountService.changeRoute('refcode2');
                } else {
                    this.activateAccountService.changeRouteByRadioBox(event);
                }
                
            }
        };

        this.stepCaptionData = {
            step: {
                step: 0,
                totalStep: 4
            },
            title: 'label.acivate.step'
        };

    }

}