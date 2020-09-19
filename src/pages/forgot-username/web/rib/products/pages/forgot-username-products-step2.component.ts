import { Component, OnInit } from '@angular/core';
import { ForgotUsernameService } from '../../share/services/forgot-username.service';
import { MasterDataService } from '../../../../../../share/service/master-data.service';
import { DropdownDataService } from '../../../../../../share/service/dropdown.service';

@Component({
    selector: 'forgot-username-products-step2',
    templateUrl: 'forgot-username-products-step2.html'
})
export class ForgotUsernameByProductsStep2Component implements OnInit {
    stepCaptionData: any;
    verifyProductsForm: any;
    formHeader: any;

    constructor(
        public forgotUsernameService: ForgotUsernameService,
        public masterDataService: MasterDataService,
        public dropdownDataService: DropdownDataService){
            forgotUsernameService.validPage('products2');
    }

    ngOnInit():void {
        this.formHeader = {
            title: 'label.forgotusername',
            stepwizOption: {
                data: [{name: '', label: 'wiz.selectMethod'},{name: '', label: 'wiz.identify'},{name:'', label:'wiz.verOTP'},{name:'', label:'wiz.showUsername'}],
                style: 'rib-web',
                step: 1
            },
            alertMsgOption: {
                type: 'danger',
                message: '',
                show: false
            }
        };

        this.stepCaptionData = {
            step: {
                step: 1,
                totalStep: 4
            },
            title: 'lbl.forgotUsernameStep'
        };

        let productData = this.dropdownDataService.productType;
        this.verifyProductsForm = {
            product: productData,
            date: {},
            onClicked: (value)=>{

                if(value === 'back'){
                    this.forgotUsernameService.changeRoute('products1');
                } else {
                    this.verifyProduct(value);
                }
                
            },
            countryList: []
        };

        this.masterDataService.getCurrentDate().then((result: any) => {
            let dt = result;
            this.verifyProductsForm.date = {
                show: false,
                maxDate: dt,
                date: dt,
                minDate: new Date('1900/01/01')
            };
        });

        this.forgotUsernameService.inquiryAllIssueCountry().then((result: any) => {
            this.verifyProductsForm.countryList = result;
        }, (error) => {

            this.setErrorMessage(error.errorMessage);
        })
    }

    verifyProduct(data){
        this.forgotUsernameService.verifyProduct(data).then((result) => {

            this.forgotUsernameService.changeRoute('products3');
        }, (error) => {

            this.setErrorMessage(error.errorMessage)
        });
    }

    private setErrorMessage(msg: string){
        this.formHeader.alertMsgOption = {
            type: 'danger',
            message: msg,
            show: (msg ? true : false)
        };
    }
}