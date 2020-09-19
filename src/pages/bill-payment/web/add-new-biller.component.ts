import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { responsiveSubscriptions } from 'ng2-responsive/config';
import { ViewChild,Component, Input, Output, EventEmitter, OnInit,trigger, animate,state,style,transition } from '@angular/core';
import { AlertMessageComponent } from "../../../share/component/alert-message/alert-message.component";
import { StepWizard } from '../../../share/component/step-wizard/step-wizard.component';
import { BillerProfileBean } from '../../../share/bean/biller-profile-bean';
import { Constants } from '../../../share/service/constants';
import { PermissionChangeRoute } from '../../../share/service/permission.service';
import { BillPaymentRequestToPayService } from '../../../pages/bill-payment-request-to-pay/bill-payment-request-to-pay.service';
import { TranslateService } from 'ng2-translate';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';
import { UtilService } from '../../../share/service/util.service';
import { BillerBean } from '../../../share/bean/biller-bean';
import { BillerRefNoBean } from '../../../share/bean/biller-ref-no-bean';

 @Component({
    selector: 'add-new-biller',
    templateUrl: './add-new-biller.html',
    animations: [
        trigger('accordingState', [
            state('collapsed, void', style({
                display: 'none'
            })),
            state('expanded', style({
                display: 'block'
            }))
        ])
    ]
})

export class AddNewBiller implements OnInit {

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

    @Output() addNewBillerBean = new EventEmitter();
    @Input() selectedAddNewAccountPanel: string;
    @Input() currentBiller: BillerBean = new BillerBean();

    public categoryNoResult:boolean = false;

    public form: FormGroup;
    public categories: any[] = [];
    public selectedCategories: any[] = [];
    public biller$:Observable<any>;
    public selectedBillerName;
    public billerToken='';
    public billerNoResult:boolean;
    public isCollapsed;
    public formErrors = {
        billerSearch: ''
    }
    validationMessages = {
        billerSearch: {
            required: this.translate.instant('label.Required')
        }
    }

    constructor(
        public constants: Constants,
        public permissionChangeRoute: PermissionChangeRoute,
        public billPaymentRequestToPayService: BillPaymentRequestToPayService,
        protected translate: TranslateService,
        public formbuilder: FormBuilder,
        public utilService: UtilService
    ) {
    }

    ngOnInit(): void{
        this.showBillerCategory = false;
        this.currentBiller = this.currentBiller != null? this.currentBiller : new BillerBean();

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
        
        

        this.selectedBillerProfile = new BillerProfileBean();
        this.selectedBillerName = '';
        if(this.currentBiller.isAddNewToBiller == true 
            && this.billPaymentRequestToPayService.getConfirmBillerProfileForAddNew() != undefined
            && this.billPaymentRequestToPayService.getConfirmBillerProfileForAddNew() != null){
            
            this.selectedBillerProfile = this.billPaymentRequestToPayService.getConfirmBillerProfileForAddNew();
            
            this.showBillerCategory = true;

            this.setSelectedBillerName(this.selectedBillerProfile);
            this.createRefNoForm(this.selectedBillerProfile);

            //Always Emit NewBillerObj to input detail page
            // this.addNewBillerBean.emit(this.billPaymentRequestToPayService.parseBillerProfileBeanToBillerBean(this.selectedBillerProfile));
            this.emitAddNewBillerBean();
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

    public onClickSubmit(data, valid): void {
        this.submitted = true;
        if (valid) {
            //this.addNewBillerBean.emit(this.billPaymentRequestToPayService.parseBillerProfileBeanToBillerBean(this.selectedBillerProfile));
            this.emitAddNewBillerBean();
            this.billPaymentRequestToPayService.setConfirmBillerProfileForAddNew(this.selectedBillerProfile);
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

    private billerSelected(selected){
        this.formInit();
        this.selectedBillerProfile = this.billPaymentRequestToPayService.parseObjToBillerProfileBean(selected.item);
        this.createRefNoForm(this.selectedBillerProfile);
        this.setSelectedBillerName(this.selectedBillerProfile);
        this.showBillerCategory = true;

        this.billerToken = ''
        this.isCollapsed = false;
        this.selectedCategories = [];

    }

    private formInit() {
        this.form = this.formbuilder.group({
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
        //this.selectedBillerProfile
        const refno = this.formbuilder.group({
            refinfo:['',Validators.required]
        })
        this.getRefNoForm().push(refno);
    }
    private clearRefNoForm(){
        this.getRefNoForm().controls = [];
    }
    private createRefNoForm(selectedBillerProfile){
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
            .debounceTime(400)
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

    public toggleState() {
        this.selectedAddNewAccountPanel = (this.selectedAddNewAccountPanel === 'expanded') ? 'collapsed' : 'expanded';
        this.autoScaleHeight();
    }

    protected autoScaleHeight(): void {
        if (window != window.top) {
            let root = this;
            root.utilService.setPageHeight(700);

            setTimeout(function () {
                root.utilService.pageLoad();
            }, 500);
        }
    }

    clearForm(DataForm){
        this.selectedBillerName = '';
        this.formInit();
        this.submitted = false;

        this.showBillerCategory = false;
        this.selectedBillerProfile = new BillerProfileBean;
        //this.addNewBillerBean.emit(this.billPaymentRequestToPayService.parseBillerProfileBeanToBillerBean(this.selectedBillerProfile));
        this.emitAddNewBillerBean();
    }

    emitAddNewBillerBean(){
        // always trim refs before emit
        if( this.selectedBillerProfile.refNoList){
            let refInfos = new Array<any>() ;
            this.selectedBillerProfile.refNoList.forEach((element: BillerRefNoBean) => {
                        let refInfo = {
                            no:     element.no,
                            value:  element.value.trim(),
                            refTextEn: element.refTextEn,
                            refTextTh: element.refTextTh
                        };
                        refInfos.push(refInfo);
            });
            this.selectedBillerProfile.refNoList = refInfos;
        }
        this.addNewBillerBean.emit(this.billPaymentRequestToPayService.parseBillerProfileBeanToBillerBean(this.selectedBillerProfile));
    }

      isEDonationCategory(id: string): boolean {
         return id === this.constants.E_DONATION_CATEGORY_ID;
     }
}