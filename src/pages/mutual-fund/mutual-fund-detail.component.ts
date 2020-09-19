import { Component } from '@angular/core';
import { Constants } from '../../share/service/constants';
import { Dateservice } from '../../share/service/date.service';
import { TranslateService } from 'ng2-translate';
import { MutualFundService } from '../../share/service/mutual-fund.service';
import { PermissionAction } from '../../share/service/permission.service';
@Component({
  selector: 'mutual-fund-detail',
  template: '<mutual-fund-summary-page [mutualFundType]="mutualFundType"></mutual-fund-summary-page>'
})
export class MutualFundDetailComponent{

    private mutualFundType: {type:String,headPage:String,headTable:String};
    

    constructor(public constants: Constants,
    public mutualFundService: MutualFundService,
    public dateservice: Dateservice,
    public translate: TranslateService,
    public _PermissionAction: PermissionAction) {

      this.mutualFundType = {
        type: 'DETAIL',
        headPage: this.translate.instant('label.MutualFundDetailHead'),
        headTable: this.translate.instant('label.tableMutualFundDetailHead')
      }
    }

    
}