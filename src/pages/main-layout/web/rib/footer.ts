import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { PermissionChangeRoute } from '../../../../share/service/permission.service';
import { TranslateService } from 'ng2-translate';
import { Constants } from '../../../../share/service/constants';
import {GetinformationService} from "../../../../share/service/getInformation.service";
declare var APP_VERSION;
declare var BUILD_NUM;
@Component({
  selector: 'footer-rib',
  templateUrl: './footer.html'
})
export class RIBFooter implements OnInit{
  appVersion:string;
  buildNumber:string;

  public mainUrl: string = '#';

  constructor(public router: Router,
              public permissionChangeRoute: PermissionChangeRoute,
              public translate: TranslateService,
              public constants: Constants,
              private getinformationService: GetinformationService) {
      this.appVersion = this.constants.VER_RIB_WEB;
      this.buildNumber = BUILD_NUM;
  }

    ngOnInit(): void {
        this.init();

    }

    public init(): void {
        this.getinformationService
            .getInformation(this.constants.REQ_PROCEDURE_NAME.KKP_URL_INFORMATION,'kkp_url')
            .then((objResponse: any) => {
                if (objResponse.responseJSON.result.responseStatus.responseCode == this.constants.RESP_CODE_SUCCESS) {
                    
                    this.mainUrl = objResponse.responseJSON.result.value.data;
                }else{
                    this.mainUrl = '#';
                }
            });
    }

  privacysubmit(): void{
      this.permissionChangeRoute.changeRoute('activate');
   }

   termandconditionsubmit(): void{
      this.permissionChangeRoute.changeRoute('Terms');
    }

    navigateLogin(){
      
      if(this.mainUrl !== '#') {

          window.open(this.mainUrl);
      }
    }
  
}
