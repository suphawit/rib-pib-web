import { Component, OnInit, ViewChild } from '@angular/core';
import { PermissionChangeRoute } from '../../../share/service/permission.service';
import { Constants } from '../../../share/service/constants';
import { TranslateService } from "ng2-translate/src/translate.service";
import { BillPaymentRequestToPayService } from '../bill-payment-request-to-pay.service';
import { BillerProfileBean } from '../../../share/bean/biller-profile-bean';
import { MessageModalComponent } from '../../../share/component/modal-messages.component';
import { Router } from '@angular/router';
import { BillPaymentService } from '../../../pages/bill-payment/bill-payment.service';
@Component({
  selector: 'biller-detail-page',
  templateUrl: 'biller-detail.html' 
})
export class BillerRequestToPayDetail  implements OnInit {

	alertConfig: {type: string,message: string, show: boolean};

    protected billerProfileDetail: BillerProfileBean;
    protected  messageModalData: { title: string; body:string; size: string; config:any; billerProfileDetail:BillerProfileBean; };

    private isDelete : boolean = false;

    @ViewChild('bsModalMessage') public bsModalMessage:MessageModalComponent;
    
	constructor(
		public permissionChangeRoute: PermissionChangeRoute, 
		public constants: Constants,
		public billPaymentRequestToPayService: BillPaymentRequestToPayService, 
		public translate: TranslateService,
		private router: Router,
		private billPaymentService: BillPaymentService) {

	}

	ngOnInit(){

		if(this.billPaymentRequestToPayService.getSelectBillerProfileDetail() !== null){
			this.billerProfileDetail = this.billPaymentRequestToPayService.getSelectBillerProfileDetail();
		}

		this.alertConfig = {
			type: 'danger',
			message: '', 
			show: false
		};

		this.messageModalData = {
			title: this.translate.instant('label.delete.title.biller'), 
			body: this.translate.instant('label.delete.message.biller'), 
			size: 'md',
			config: {isShowCloseBtn:true,isShowDeleteBtn:true},
			billerProfileDetail : this.billerProfileDetail
		}

		this.billPaymentRequestToPayService.alertConfig = undefined;

	}

	onMenuClick(data: any){
		
		if(data === this.constants.PORTLETS_MENU_DATA.PAYMENT){
			this.permissionChangeRoute.prevUrl = this.router.url;
			this.billPaymentService.selectBillerDetailData = this.billPaymentRequestToPayService.parseBillerProfileBeanToBillerBean(this.billerProfileDetail);
			this.permissionChangeRoute.changeRoute('PAY_BILL');
		} else if(data === this.constants.PORTLETS_MENU_DATA.FAVOURITE){
			this.onClickFavourite();
		} else if(data === this.constants.PORTLETS_MENU_DATA.EDIT){
			this.permissionChangeRoute.changeRoute('MANAGE_BILLER.edit');
		} else if(data === this.constants.PORTLETS_MENU_DATA.DELETE){
			this.show();
		}else if(data === this.constants.PORTLETS_MENU_DATA.SCHEDULE){
			this.permissionChangeRoute.prevUrl = this.router.url; 
			this.permissionChangeRoute.changeRoute('MANAGE_SCHEDULE');
		}
	}

	protected onEmit($event){
		if($event !== undefined && $event === 'delete'){
			this.isDelete = false;
			this.billPaymentRequestToPayService.deleteBillerProfileDetail(this.billerProfileDetail).then((result: any) => {
				let tmpresult = result.responseJSON.result;
				if(tmpresult.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS){
					let alertConfig = {
						title: 'label.title.deleteBillerSuccess',
						type: 'success',
						message: 'label.deleteBillerSuccess', 
						show: true,
						option: ''
					}
				this.billPaymentRequestToPayService.alertConfig = alertConfig;
				this.permissionChangeRoute.changeRoute('MANAGE_BILLER');
				}else{
				
				}
			}, function(error) {
				
			});
		}
		if($event !== undefined && $event === 'cancel'){
			this.bsModalMessage.hide();
		}
	}
	protected show():void {
		
		this.isDelete = true;
		this.messageModalData = {
			title: 'label.delete.title.biller', 
			body: 'label.delete.message.biller', 
			size: 'md',
			config: {isShowCancelBtn:true,isShowDeleteBtn:true},
			billerProfileDetail: this.billerProfileDetail
		}

		this.bsModalMessage.show();
	}

	onClickFavourite() {
        this.billPaymentRequestToPayService.updateFavouriteBiller(this.billerProfileDetail).then((objResponse: any) => {
            let result = objResponse.responseJSON.result;
            if (result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                if (this.billerProfileDetail.isFavourite === 'Y') {
                    this.billerProfileDetail.isFavourite = 'N';
                } else if (this.billerProfileDetail.isFavourite === 'N') {
                    this.billerProfileDetail.isFavourite = 'Y';
                }
            }
        }, function (error) {
            
        });
    }

	onModalHidden() {	
		if (this.isDelete === false) {
			this.permissionChangeRoute.changeRoute('MANAGE_BILLER');
		}
	}

    isEDonationCategory(id: string): boolean {
        return id === this.constants.E_DONATION_CATEGORY_ID;
    }
}