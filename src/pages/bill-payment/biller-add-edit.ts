import { BillPaymentService } from './bill-payment.service';
import { StepWizard } from '../../share/component/step-wizard/step-wizard.component';
import { Constants } from '../../share/service/constants';
import { PermissionChangeRoute } from '../../share/service/permission.service';
import { ViewChild } from '@angular/core';
import { AlertMessageComponent } from '../../share/component/alert-message/alert-message.component';

export class BillerAddEdit{

    protected stepWizard: StepWizard;
    protected billCategoryList: any;
    protected billerList: any;
    public editBiller: boolean = false;
    protected billCategory: any;
    protected biller: any;
    private nextPage: string;
    protected isDisabledDropDrown: boolean;
    
    public isAdd: boolean;

    alertConfig: {title: string, type: string,message: string, show: boolean, option: any};
    
    public labelTitle : string;
    @ViewChild('alertMessage') public alertMessage:AlertMessageComponent;

    constructor( public _PermissionChangeRoute: PermissionChangeRoute,
        public billPaymentService:BillPaymentService,
        public _Constants: Constants){
    }

    protected init():void{
        // this.getCatagories();
        // this.getBillerList();
        this.alertConfig = {
            title: '',
			type: 'danger',
			message: '', 
			show: false,
            option: {}
		};
        this.billPaymentService.alertConfig = undefined;
    }

    protected setNextPage(nextPage:string){
      this.nextPage = nextPage;
    }

      
    // private getCatagories():void{
    //      this.billCategoryList = [{"catName":"thon2","catId":"16"},
    //      {"catName":"ครอบครัว","catId":"1"},
    //      {"catName":"จูโน่3","catId":"9"},
    //      {"catName":"ทดสอบ","catId":"10"},
    //      {"catName":"ทดสอบ1","catId":"11"},
    //      {"catName":"ทดสอบค่าอื่นๆ","catId":"6"},
    //      {"catName":"ธน","catId":"12"},
    //      {"catName":"ธน1","catId":"7"},
    //      {"catName":"ธุรกิจ","catId":"3"},
    //      {"catName":"ร้านค้า","catId":"4"},
    //      {"catName":"เพื่อน","catId":"2"},
    //      {"catName":"เอเอสดีเอฟ","catId":"14"},
    //      {"catName":"เอเอเอ","catId":"13"},
    //      {"catName":"แฮ","catId":"15"},
    //      {"catName":"อื่นๆ","catId":"5"}];
    // }

     
    // private getBillerList():void{
    //      this.billerList = [{"billName":"การไฟฟ้า","billId":"16"},
    //      {"billName":"รถยน","billId":"1"},
    //      {"billName":"บ้าน","billId":"9"}];

    // }

    verifyAddBillpayment(value:any):void{
        let obj = {
            params: {
                billCustomer: {
                    billerAliasName:    value.billerAliasName.trim(),
                    ref1:               value.ref1.trim(),
                    ref2:               value.ref2.trim()
                },
            }
        }
        this.billPaymentService.setActionCode(this._Constants.REQ_ACTION_CODE.BILLER_VERIFY_ADD);
        this.billPaymentService.setProcedure(this._Constants.REQ_PROCEDURE_NAME.BILLER_VERIFY_ADD);

        this.billPaymentService.verifyAddBiller(obj).then((result) => {
            if(result['responseJSON']['result']['responseStatus']['responseCode'] == this._Constants.RESP_CODE_SUCCESS ){
                this.billPaymentService.confirmAddBillerData =  result['responseJSON']['result']['value'];
                this.goToNextPage();
            } else {
                this.alertConfig.title = '';
                this.alertConfig.message = result['responseJSON']['result']['responseStatus']['errorMessage'];
                this.alertMessage.show();
            }
          }, function(error) {

        });
    }

     verifyEditBillCustomer(aliasName:any):void{
         let obj = {
            params: {
                billCustomer: {
                    billerAliasName:    aliasName.trim(),
                    billerID:           this.billPaymentService.confirmAddBillerData.billerID,
                    ref1:               this.billPaymentService.confirmAddBillerData.ref1.trim(),
                    ref2:               this.billPaymentService.confirmAddBillerData.ref2.trim()
                },
            }
        }
        this.billPaymentService.setActionCode(this._Constants.REQ_ACTION_CODE.BILLER_VERIFY_EDIT);
        this.billPaymentService.setProcedure(this._Constants.REQ_PROCEDURE_NAME.BILLER_VERIFY_EDIT);

        this.billPaymentService.verifyAddBiller(obj).then((result) => {
            if(result['responseJSON']['result']['responseStatus']['responseCode'] == this._Constants.RESP_CODE_SUCCESS ){
                this.billPaymentService.confirmAddBillerData =  result['responseJSON']['result']['value'];
                this.goToNextPage();
            } else {
                this.alertConfig.title = '';
                this.alertConfig.message = result['responseJSON']['result']['responseStatus']['errorMessage'];
                this.alertMessage.show();
            }
          }, function(error) {

        });
    }

    protected Onchange(param,event):void{

        if(param === 'category') {
            //change category
            this.billCategory = event;
        } else{
            //change biller list
            this.biller = event;
        }
    }

    navigateBack() {
        this.billPaymentService.alertConfig = undefined;
        this.billPaymentService.confirmAddBillerData = undefined;
        this._PermissionChangeRoute.changeRoute('MANAGE_BILLER.LIST');
    }

    protected goToNextPage():void{

        this._PermissionChangeRoute.changeRoute(this.nextPage);
    }

    public setIsAdd(isAdd: boolean) {
        this.isAdd = isAdd;
    }

    resetBillerObject() {
        this.billPaymentService.confirmAddBillerData = undefined;
    }
}