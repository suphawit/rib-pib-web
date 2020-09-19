import { OnInit,Component } from '@angular/core';
import { Constants } from '../../share/service/constants';
import { Dateservice } from '../../share/service/date.service';
import { TranslateService } from 'ng2-translate';
import { MutualFundService } from '../../share/service/mutual-fund.service';
import { PermissionAction } from '../../share/service/permission.service';
@Component({
  selector: 'mutual-fund-summary',
  template: '<mutual-fund-summary-page [mutualFundType]="mutualFundType"></mutual-fund-summary-page>'
})
export class MutualFundSummaryComponent implements OnInit{
    private mutualFundType: {type:String,headPage:String,headTable:String}; 
    constructor(public constants: Constants,
    public mutualFundService: MutualFundService,
    public dateservice: Dateservice,
    public translate: TranslateService,
    public _PermissionAction: PermissionAction) {
      this.mutualFundType = {
        type: 'SUMMARY',
        headPage: this.translate.instant('label.summary'),
        headTable: this.translate.instant('label.tableMutualFundSumHead')
      }
    }

    alertConfig: {type: string,message: string, show: boolean};
    ngOnInit(){
      this.alertConfig = {
        type: 'danger',
        message: '', 
        show: false
      };
      
       
     
    }
   
}