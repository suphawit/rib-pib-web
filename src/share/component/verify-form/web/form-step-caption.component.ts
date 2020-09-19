import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'form-step-caption',
    templateUrl: 'form-step-caption.html'
})
export class FormStepCaptionComponent implements OnInit {
    @Input('data') stepCaptionData: string;
    @Input('title') titleLabel: string;

    captionData: any;

    ngOnInit(){
        this.captionData = this.stepCaptionData || this.getDefaultOption();
    }

    private getDefaultOption() {
        return {
            step: -1,
            totalStep: 0
        };
    }

}