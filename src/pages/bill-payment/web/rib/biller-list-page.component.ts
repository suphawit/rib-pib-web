import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { BillerListPage } from '../../biller-list-page';
import { PermissionChangeRoute, PermissionService } from '../../../../share/service/permission.service';
import { BillPaymentService } from '../../bill-payment.service';
import { AlertMessageComponent } from '../../../../share/component/alert-message/alert-message.component';

@Component({
  selector: 'biller-list-page',
  templateUrl: '../../biller-list-page.html' 
})
export class BillerListPageComponent extends BillerListPage implements OnInit, OnDestroy {

    @ViewChild('alertMessage') public alertMessage:AlertMessageComponent;

    private isShowAddBiller: boolean = true;
    
    constructor(public permissionChangeRoute: PermissionChangeRoute,public billPaymentService: BillPaymentService, public permissionService: PermissionService) {
        super();
    }

    ngOnInit(){
      this.pageStyle = 'rib-web';

      this.alertConfig = {
        type: 'danger',
        message: '', 
        show: false
      };

      if(typeof this.billPaymentService.alertConfig !== 'undefined'){
          this.alertConfig = this.billPaymentService.alertConfig;
          this.alertMessage.show();
      }


      this.isShowAddBiller = this.permissionService.getActionCode().MANAGE_BILLER;
    }

    ngOnDestroy() {
      this.billPaymentService.alertConfig = undefined;
    }

    gotoAddBillPaymentPage(){
      this.permissionChangeRoute.changeRoute('MANAGE_BILLER.ADD');
    }
}