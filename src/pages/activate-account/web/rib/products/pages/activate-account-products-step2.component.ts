import { Component, OnInit } from '@angular/core';
import { ActivateAccountService } from '../../share/services/activate-account.service';
import { MasterDataService } from '../../../../../../share/service/master-data.service';
import { DropdownDataService } from '../../../../../../share/service/dropdown.service';

@Component({
    selector: 'activate-account-products-step2',
    templateUrl: 'activate-account-products-step2.html'
})
export class ActivateAccountByProductsStep2Component implements OnInit {
    stepCaptionData: any;
    verifyProductsForm: any;
    formHeader: any;

    constructor(
        public activateAccountService: ActivateAccountService,
        public masterDataService: MasterDataService,
        public dropdownDataService: DropdownDataService){
            activateAccountService.validPage('products2');
    }

    ngOnInit():void {
        this.formHeader = {
            title: 'activate.title',
            stepwizOption: {
                data: [{name: '', label: 'wiz.selectMethod'},{name: '', label: 'wiz.identify'},{name:'', label:'wiz.verRef'},{name:'', label:'wiz.termAndCond'},{name:'', label:'wiz.createUsername'}],
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
                totalStep: 5
            },
            title: 'label.acivate.step'
        };

        let productData = this.dropdownDataService.productType;
        this.verifyProductsForm = {
            product: productData,
            date: {},
            onClicked: (value)=>{

                if(value === 'back'){
                    this.activateAccountService.changeRoute('products1');
                } else {
                    this.verifyProduct(value)
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
        
        this.activateAccountService.inquiryAllIssueCountry().then((result: any) => {
            this.verifyProductsForm.countryList = result;
        }, (error) => {

            this.setErrorMessage(error.errorMessage);
        });
    }

    verifyProduct(data){
        this.activateAccountService.verifyProduct(data).then((result) => {

            this.activateAccountService.changeRoute('products3');
        }, (error) => {

            this.setErrorMessage(error.errorMessage);
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