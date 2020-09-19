import { Component, OnInit, OnChanges, Input, ViewChild } from '@angular/core';
import { AlertMessageComponent } from '../../alert-message/alert-message.component';

@Component({
    selector: 'form-header',
    templateUrl: 'form-header.html'
})
export class FormHeaderComponent implements OnInit, OnChanges {
    @Input('stepwizOption') stepWizardOption: any;
    @Input('alertMsgOption') alertMessageOption: any;
    @Input('title') title: string;

    @ViewChild('alertMessage') public alertMessage: AlertMessageComponent;

    alertOption: any;
    stepOption: any;

    ngOnInit(){
        this.stepOption = this.stepWizardOption || this.getStepWizardDefaultOption();
    }

    ngOnChanges(changed: any) {
        
        if(changed.alertMessageOption && changed.alertMessageOption.currentValue){
            let isshow = changed.alertMessageOption.currentValue.show || false;
            this.isShowAlertMessage(isshow);
            this.alertOption = {
                type: changed.alertMessageOption.currentValue.type || '',
                message: changed.alertMessageOption.currentValue.message || ''
            };
        }
    }

    private getStepWizardDefaultOption(){
        return {
			data: [],
			style: 'rib-web',
			step: 1
		};
    }

    private isShowAlertMessage(isshow: boolean){
        if(isshow){
            this.alertMessage.show();
        } else {
            this.alertMessage.hide();
        }
    }
}