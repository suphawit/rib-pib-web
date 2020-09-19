import { Component, ViewChild, OnInit } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { TermsAndConditionsService } from '../../share/component/terms-and-conditions/terms-and-conditions.service';
import { Constants } from '../../share/service/constants';

@Component({
  selector: 'transcode-info-modal',
  template: `
    <div id="mdlPage" bsModal #transCodeModal="bs-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close pull-right" aria-label="Close" (click)="hide()">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="modal-title-purple">
                <h1 id="lblModalTitle" class="title">Transaction Code</h1>
            </div>
            <div id="divPageContent" innerHTML="{{tableHtml}}"></div>
          </div>
        </div>
      </div>
    </div>
  `,
  providers: [TermsAndConditionsService]
})
export class TransactionCodeInfoModalComponent implements OnInit {
    constructor(public constants: Constants, public termsAndConditionsService: TermsAndConditionsService){}

    @ViewChild('transCodeModal') private transCodeModal:ModalDirective;
    
    tableHtml: string;

    ngOnInit(){
        this.tableHtml = '';
    }

    show():void {
        if(this.tableHtml === ''){
            this.requestTransactionCodeInfo();
        }

        this.transCodeModal.show();
    }
    
    hide():void {
        this.transCodeModal.hide();
    }

    private requestTransactionCodeInfo(){
        this.termsAndConditionsService.setActionCode(this.constants.REQ_ACTION_CODE.RBAC_GET_INFORMATION_SERVICE);
        this.termsAndConditionsService.setTermAction('transaction_code');
        
        this.termsAndConditionsService.getTermsAndConditionsService().then((result: any) => {
        let tmpresult = result.responseJSON.result;
        if(tmpresult.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS){
            this.tableHtml = tmpresult.value.data;
        }else{
        }

        }, function (error) {
            
        });
    }
}