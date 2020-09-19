import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { responsiveSubscriptions } from 'ng2-responsive/config';
import { ViewChild } from '@angular/core';
import { AlertMessageComponent } from "../../../../share/component/alert-message/alert-message.component";
import { StepWizard } from '../../../../share/component/step-wizard/step-wizard.component';
import { BillerProfileBean } from '../../../../share/bean/biller-profile-bean';
import { Constants } from '../../../../share/service/constants';
import { PermissionChangeRoute } from '../../../../share/service/permission.service';
import { BillPaymentRequestToPayService } from '../../bill-payment-request-to-pay.service';
import { TranslateService } from 'ng2-translate';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

export class ManageBiller {

    public stepPageBiller: string;
    public titlePageBiller: string;
    public stepWizard: StepWizard;
    public submitted: boolean = false;
    public selectedBillerProfile: BillerProfileBean;

    public alertConfig: { title: string, type: string, message: string, show: boolean, option: any };

    public showBillerCategory: boolean;
    public billerProfileAutoCompleteList: any[] = [];

    @ViewChild('alertMessage')
    public alertMessage: AlertMessageComponent;

    public form: FormGroup;
    public categories: any[] = [];
    public selectedCategories: any[] = [];
    public biller$:Observable<any>;
    public aliasName = '';
    public selectedBillerName;
    public billerToken='';
    public billerNoResult:boolean;
    public categoryNoResult:boolean = false;
    public isCollapsed;
    public formErrors = {
        aliasName: '',
        billerSearch: ''
    }
    validationMessages = {
        aliasName: {
            required: this.translate.instant('label.Required')
        },
        billerSearch: {
            required: this.translate.instant('label.Required')
        }
    }
    public isFromAddNewAfterPayBill: boolean = false;

    constructor(
        public constants: Constants,
        public permissionChangeRoute: PermissionChangeRoute,
        public billPaymentRequestToPayService: BillPaymentRequestToPayService,
        protected translate: TranslateService,
        public formbuilder: FormBuilder,
    ) {
    }

    protected init(): void {
        this.showBillerCategory = false;

        this.alertConfig = {
            title: '',
            type: 'danger',
            message: '',
            show: false,
            option: {}
        };
        this.billPaymentRequestToPayService.alertConfig = undefined;

        this.formInit();
        this.getCateogries();
        this.initModel();
        this.billerSearchInit();
        this.categoriesInit();
    }
    private categoriesInit() {
        this.billPaymentRequestToPayService
            .getBillerCategories()
            .subscribe((resp) => {
                this.categories = resp.map((item)=>{
                    return Object.assign({}, 
                        item,
                        { 
                            id: item.categoryCode, 
                            text: (this.translate.currentLang === 'en') ? item.categoryEn:item.categoryTh
                        }
                    )
                });
            })
    }

    private billerSearchInit(){
        this.biller$ = Observable
        .create((ob: any) => {
            ob.next(this.billerToken);
        })
        .switchMap((token: string) => {
            if(this.selectedCategories.length == 0){
                return this.billPaymentRequestToPayService
                    .getBillerByToken(token)
                    // .delay(Math.floor((Math.random() * 10000) + 1))
                    // .do(()=>
                    .catch((err) => {
                        return Observable.of([]);
                    })
            }else{
                return this.billPaymentRequestToPayService
                    .getBillerByTokenAndCategories(
                        token,
                        this.selectedCategories
                    )
                    .catch((err) => {
                        return Observable.of([]);
                    })
            }
        })
    }

    protected initModel() {
        switch(this.permissionChangeRoute.prevUrl) { 
            case 'bill-payment': { 
                this.permissionChangeRoute.prevUrl = null;
                this.selectedBillerProfile = this.billPaymentRequestToPayService.getConfirmBillerProfileForAddNew();
                
                this.showBillerCategory = true;
                this.setSelectedBillerName(this.selectedBillerProfile);
                this.createRefNoForm(this.selectedBillerProfile);

                this.isFromAddNewAfterPayBill = true;
                this.form.get('refNos').disable();

                this.billPaymentRequestToPayService.setConfirmBillerProfileForAddNew(null);
                this.billPaymentRequestToPayService.setIsFromAddNewAfterPayBill(this.isFromAddNewAfterPayBill);
                break; 
            } 
            default: { 
                if (this.billPaymentRequestToPayService.getConfirmBillerProfile() == null) {
                    this.selectedBillerProfile = new BillerProfileBean();
                    this.selectedBillerName = '';
                } else {
                    this.selectedBillerProfile = this.billPaymentRequestToPayService.getConfirmBillerProfile();
                    this.billPaymentRequestToPayService.setConfirmBillerProfile(null);
                    this.aliasName = this.selectedBillerProfile.aliasName;
                    this.showBillerCategory = true;
                    this.setSelectedBillerName(this.selectedBillerProfile);
                    this.createRefNoForm(this.selectedBillerProfile);
                }
                
                break; 
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
    }

    public onClickSubmit(data, valid): void {

        this.submitted = true;
        if (valid) {
            this.selectedBillerProfile.aliasName = this.aliasName;
            this.billPaymentRequestToPayService.verifyAddBillerProfileDetail(this.selectedBillerProfile).then((result: any) => {
                if (result.responseJSON.result.responseStatus.responseCode == this.constants.RESP_CODE_SUCCESS) {
                    let billerProfile: BillerProfileBean = this.billPaymentRequestToPayService.parseObjToBillerProfileBean(result.responseJSON.result.value);
                    this.billPaymentRequestToPayService.setConfirmBillerProfile(billerProfile);
                    this.selectedBillerProfile = null;

                    this.permissionChangeRoute.targetAction = 'MANAGE_BILLER.add-confirm';
                    this.permissionChangeRoute.changeRoute('MANAGE_BILLER.add-confirm');
                } else {
                    this.alertConfig.title = '';
                    this.alertConfig.message = result.responseJSON.result.responseStatus.errorMessage;
                    this.alertMessage.show();
                }
            }, function (error) {

            });
        }
    }

    private validateDropdownBox(): boolean {
        if (this.selectedBillerProfile.promptPayBillerId == null && this.selectedBillerProfile.profileCode == null) {
            this.selectedBillerProfile = new BillerProfileBean();
            return false;
        } else {
            return true;
        }
    }

    private setSelectedBillerName(bilerObj){
        const {billerNameTh,billerNameEn} = bilerObj;
        this.selectedBillerName =  (this.translate.currentLang === 'th') ?  billerNameTh : billerNameEn;
    }
    public selectedCategory(value: any): void {
        this.selectedCategories = [...this.selectedCategories,value.id];
        this.categoryNoResult = false;
    }

    public removedCategory(value: any): void {
        this.selectedCategories = this.selectedCategories
            .filter((cat)=>cat !== value.id);
        this.categoryNoResult = false;
    }

    public typed(value: any) {
        const result = this.categories.find((category)=>{
            const textsearch = (this.translate.currentLang === 'th') ?  category.categoryTh.toLowerCase() : category.categoryEn.toLowerCase();
            if((textsearch.indexOf(value) != -1)){
                return true;
            }
            return false
        });
        if(result){
            this.categoryNoResult = false;
        }else{
            this.categoryNoResult = true;
        }
    }

    public collapsedSearch(){
        this.isCollapsed = !this.isCollapsed
    }

    public changeBillerNoResult(e:boolean){
        this.billerNoResult = e;
    }

    private getCateogries():Observable<string[]>{
        return Observable.of(this.categories);
    }

    public billerSelected(selected){
        this.selectedBillerProfile = this.billPaymentRequestToPayService.parseObjToBillerProfileBean(selected.item);
        this.createRefNoForm(this.selectedBillerProfile)
        this.setSelectedBillerName(this.selectedBillerProfile);
        this.showBillerCategory = true;

        this.billerToken = ''
        this.isCollapsed = false;
        this.selectedCategories = [];

    }

    private formInit() {
        this.form = this.formbuilder.group({
            aliasName: ['', Validators.required],
            billerSearch: ['',Validators.required],
            refNos: this.formbuilder.array([])
        })
        this.subscribeToFormChanged();
        this.onValueFormChanged();
    }
    
    private getRefNoForm(): FormArray{
        return this.form.get('refNos') as FormArray;
    }
    private addRefNoForm(){
        const refno = this.formbuilder.group({
            refinfo:['',Validators.required]
        })
        this.getRefNoForm().push(refno);
    }
    private clearRefNoForm(){
        this.getRefNoForm().controls = [];
    }
    private createRefNoForm(selectedBillerProfile){
        this.clearRefNoForm();
        for (let i = 0; i < selectedBillerProfile.refNoList.length; i++) {
            if (this.isEDonationCategory(selectedBillerProfile.categoryId)) {
                switch (i) {
                    case 0:
                        this.addRefNoForm();
                        break;
                    case 1:
                        this.selectedBillerProfile.refNoList[1].value = "0";
                        break;
                }
            }else {
                this.addRefNoForm();
            }
        }
    }
    private subscribeToFormChanged() {
        this.form
            .valueChanges
            .debounceTime(200)
            .distinctUntilChanged()
            .subscribe(() => this.onValueFormChanged());
    }

    private onValueFormChanged() {
        for (const field in this.formErrors) {
            this.formErrors[field] = '';
            const control = this.form.get(field);
            if (control  && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    isEDonationCategory(id: string): boolean {
        return id === this.constants.E_DONATION_CATEGORY_ID;
    }
}