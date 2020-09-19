import { ViewChild } from '@angular/core';
import { TranslateService } from "ng2-translate/src/translate.service";

import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { TypeaheadMatch } from 'ng2-bootstrap/typeahead';

import { Constants } from '../../share/service/constants';
import { UtilService } from '../../share/service/util.service';
import { BillerProfileBean } from '../../share/bean/biller-profile-bean';
import { PermissionChangeRoute } from '../../share/service/permission.service';
import { StepWizard } from '../../share/component/step-wizard/step-wizard.component';
import { BillPaymentRequestToPayService } from './bill-payment-request-to-pay.service';
import { AlertMessageComponent } from '../../share/component/alert-message/alert-message.component';

export class BillerRequestToPayAddEdit {

    public model: any = {
        aliasName: '',
        asyncSelected: ''
    };
    
    public isAdd: boolean;
    protected channel: string;
    public stepPageBiller: string;
    public inputPattern = '^\\d+$';
    public titlePageBiller: string;
    protected stepWizard: StepWizard;
    public submitted: boolean = false;
    public selectedBillerProfile: BillerProfileBean;

    public billerList;

    alertConfig: { title: string, type: string, message: string, show: boolean, option: any };

    public showBillerCategory: boolean;
    public typeaheadLoading: boolean;
    public typeaheadNoResults: boolean;
    public dataSource: Observable<any>;
    public billerProfileAutoCompleteList: any[] = [];

    @ViewChild('alertMessage') public alertMessage: AlertMessageComponent;

    constructor(
        public constants: Constants,
        public permissionChangeRoute: PermissionChangeRoute,
        public billPaymentRequestToPayService: BillPaymentRequestToPayService,
        protected translate: TranslateService,
        public utilService: UtilService) {
    }

    protected init(): void {
 
        if (this.isAdd) {
            this.showBillerCategory = false;
        } else {
            this.showBillerCategory = true;
        }

        this.alertConfig = {
            title: '',
            type: 'danger',
            message: '',
            show: false,
            option: {}
        };
        this.billPaymentRequestToPayService.alertConfig = undefined;

        let observable = Observable.create((observer: any) => {
            observer.next(this.model.asyncSelected.trim());
        });


        // this.dataSource = observable.mergeMap(value => myPromise(value), (valueFromSource, valueFromPromise) => {
        //     return valueFromPromise;
        // });

        this.initModel();
        this.autoScaleHeight();

    }

    protected initModel() {

        if (this.billPaymentRequestToPayService.getConfirmBillerProfile() == null) {
            this.selectedBillerProfile = new BillerProfileBean();
        } else {
            this.selectedBillerProfile = this.billPaymentRequestToPayService.getConfirmBillerProfile();
            this.billPaymentRequestToPayService.setConfirmBillerProfile(null);
            this.model.aliasName = this.selectedBillerProfile.aliasName;
            this.model.asyncSelected =  this.selectedBillerProfile.billerProfileId;
            this.showBillerCategory = true;
        }

        if (!this.isAdd) {
            if (this.billPaymentRequestToPayService.getSelectBillerProfileDetail() != null) {
                this.selectedBillerProfile = this.billPaymentRequestToPayService.getSelectBillerProfileDetail();
                this.model.aliasName = this.selectedBillerProfile.aliasName;
                this.model.asyncSelected = (this.translate.currentLang === 'en') ? this.selectedBillerProfile.billerNameEn : this.selectedBillerProfile.billerNameTh;
                this.showBillerCategory = true;
            }
        }
    }

    public onKeyupRefno(event: any) {
        let char = event.key;
        let regEx = new RegExp(/[0-9\ ]/);

        if (regEx.test(char) && char !== '') {
            return;
        } else {
            event.preventDefault();
        }
    }

    public onClickBack(): void {
        this.selectedBillerProfile = null;
        this.billPaymentRequestToPayService.setConfirmBillerProfile(null);
        this.permissionChangeRoute.changeRoute('MANAGE_BILLER');

        this.autoScaleHeight();
        this.utilService.scrollToTop();
    }

    public onClickSubmit(data, valid): void {
        this.submitted = true;
        if (valid) {
            if (this.isAdd) {
                if (!this.validateDropdownBox()) {
                    return;
                }
            }
            this.selectedBillerProfile.aliasName = this.model.aliasName;
            if (this.isAdd) {
                this.billPaymentRequestToPayService.verifyAddBillerProfileDetail(this.selectedBillerProfile).then((result: any) => {
                    if (result.responseJSON.result.responseStatus.responseCode == this.constants.RESP_CODE_SUCCESS) {
                        let billerProfile: BillerProfileBean = this.billPaymentRequestToPayService.parseObjToBillerProfileBean(result.responseJSON.result.value);
                        this.billPaymentRequestToPayService.setConfirmBillerProfile(billerProfile);
                        this.selectedBillerProfile = null;
                        this.permissionChangeRoute.changeRoute('MANAGE_BILLER.add-confirm');
                    } else {
                        this.alertConfig.title = '';
                        this.alertConfig.message = result.responseJSON.result.responseStatus.errorMessage;
                        this.alertMessage.show();
                    }
                }, function (error) {

                });
            } else {
                this.billPaymentRequestToPayService.verifyEditBillerProfileDetail(this.selectedBillerProfile).then((result: any) => {
                    if (result.responseJSON.result.responseStatus.responseCode == this.constants.RESP_CODE_SUCCESS) {
                        let billerProfile: BillerProfileBean = this.billPaymentRequestToPayService.parseObjToBillerProfileBean(result.responseJSON.result.value);
                        this.billPaymentRequestToPayService.setConfirmBillerProfile(billerProfile);
                        this.selectedBillerProfile = null;
                        this.permissionChangeRoute.changeRoute('MANAGE_BILLER.edit-confirm');
                    } else {
                        this.alertConfig.title = '';
                        this.alertConfig.message = result.responseJSON.result.responseStatus.errorMessage;
                        this.alertMessage.show();
                    }
                }, function (error) {

                });
            }
        }
    }

    public changeTypeaheadLoading(e: boolean): void {
        this.typeaheadLoading = e;
    }

    public changeTypeaheadNoResults(e: boolean): void {
        this.typeaheadNoResults = e;
    }

    public typeaheadOnSelect(e): void {

        this.billPaymentRequestToPayService.getBillerProfileDetail(e).then((result: any) => {
            let tmpresult = result.responseJSON.result;
            this.submitted = false
            if (tmpresult.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                ;
               // this.model.asyncSelected = (this.translate.currentLang === 'en') ? tmpresult.value.billerNameEn : tmpresult.value.billerNameTh;
                this.selectedBillerProfile = this.billPaymentRequestToPayService.parseObjToBillerProfileBean(tmpresult.value);
                this.showBillerCategory = true;
            } else {
               // this.model.asyncSelected = '';
                this.selectedBillerProfile = new BillerProfileBean();
                this.typeaheadNoResults = true;
                this.showBillerCategory = false;
            }
        });
    }

    private validateDropdownBox(): boolean{
           if (this.selectedBillerProfile.promptPayBillerId == null && this.selectedBillerProfile.profileCode == null) {
                this.model.asyncSelected = '';
                this.selectedBillerProfile = new BillerProfileBean();
                return false;
            } else {
                return true;
            }
    }

    private autoScaleHeight(): void {
        if (window != window.top) {
            let root = this;
            root.utilService.setPageHeight(700);

            setTimeout(function () {
                root.utilService.pageLoad();
            }, 500);
        }
    }

    isEDonationCategory(id: string): boolean {
        return id === this.constants.E_DONATION_CATEGORY_ID;
    }
}