import { Constants } from '../../share/service/constants';
import { Input, Component, Output, OnInit, EventEmitter } from '@angular/core';
import { PermissionChangeRoute } from '../../share/service/permission.service';
import {GetinformationService} from "../../share/service/getInformation.service";

declare var BUILD_NUM;

@Component({
  selector: 'kk-product-and-service-detail',
  templateUrl: './kk-product-and-service-detail.html',
})
export class KKProductAndServiceDetail implements OnInit{
  public BUILD_NUM = BUILD_NUM;
  public promptPayUrl: string = '#';
  @Input('title') productTitle: string;
  @Output('onActions') onClickActions = new EventEmitter();

  constructor(public constants: Constants,
    public permissionChangeRoute: PermissionChangeRoute,
              private getinformationService: GetinformationService) {
  }

  ngOnInit(): void {
      this.init();

  }

  public init(): void {
      this.getinformationService
          .getInformation(this.constants.REQ_PROCEDURE_NAME.PROMPTPAY_INFORMATION,'promptpay')
          .then((objResponse: any) => {
              if (objResponse.responseJSON.result.responseStatus.responseCode == this.constants.RESP_CODE_SUCCESS) {
                  
                  this.promptPayUrl = objResponse.responseJSON.result.value.data;
              }else{
                  this.promptPayUrl = '#';
              }
          });
  }

  selectMenuList(listname: string) {
    

    if (listname === 'moreinfo') {
      //this.myTimelineModal.show(data);
    } else if (listname === 'registerKKPromptPay') {
      this.permissionChangeRoute.changeRoute('KK_PRODUCT_SERVICE.REGISTER_KK_PROMPT_PAY');
    }
  }
}
