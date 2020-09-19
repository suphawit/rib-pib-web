import { Component } from '@angular/core';
import { Constants } from '../../../../share/service/constants';
import { PermissionService, PermissionChangeRoute } from '../../../../share/service/permission.service';
import { GetinformationService } from "../../../../share/service/getInformation.service";

declare var BUILD_NUM;

@Component({
  selector: 'pages-home',
  templateUrl: 'home.html'
})
export class HomeComponent {
  public BUILD_NUM = BUILD_NUM;
  public isDesktop = true;
  constructor(public permissionService: PermissionService,
    public permissionChangeRoute: PermissionChangeRoute,
    public constants: Constants,
    private getinformationService: GetinformationService
  ) {
    this.isDesktop = this.getinformationService.isDesktop();
    
    
    if (this.permissionService.getIsLogin()) {
        this.permissionService.logoutSession().then((objResponse: any) => {
        
        this.permissionService.setIsLogin(false);
        this.redirectPage();
      }, function (error) {
        
        
      });
    }else{
       this.redirectPage();
    }
  }

  private redirectPage(){
      this.permissionChangeRoute.changeRoute('HOME');
  }

}
