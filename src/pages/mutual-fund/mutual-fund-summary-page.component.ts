import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Constants } from '../../share/service/constants';
import { Dateservice } from '../../share/service/date.service';
import { TranslateService } from 'ng2-translate';
import { UtilService } from '../../share/service/util.service';
import { MutualFundService } from '../../share/service/mutual-fund.service';
import { PermissionAction } from '../../share/service/permission.service';
import { PermissionChangeRoute } from '../../share/service/permission.service';
import { DecimalPipe } from '@angular/common';
import { AlertMessageComponent } from '../../share/component/alert-message/alert-message.component';
@Component({
  selector: 'mutual-fund-summary-page',
  templateUrl: './mutual-fund-summary-page.html'
})
export class MutualFundSummaryPageComponent implements OnInit {
 
  private resultMutualFundSumData:{principal: String,netAsset: String, pl: String};
  private resultMutualFundDetailData:{fundCode: String,fundName: String, transDate: String};
  alertConfig: {type: string,message: string, show: boolean};
  private data:any;
  private isError: any;
  private returnData:any = [];

  @Input('mutualFundType') mutualFundType: {type:String,headPage:String,headTable:String};
  private mutualFundPortDetails:any;
  private mfTransactionPortDetails:any;

  headerDetail: {columnName:Array<string>; fieldName:Array<string>;};
  mutualFundLayout: any;
  statements: any;
  pagination: {
      totalItem: number;
      itemPerPage: number;
      currentPage: number;
      pageSize: Array<any>;
      pageSizeLabel: string;
  }
  @ViewChild('alertMessage') public alertMessage:AlertMessageComponent;
  constructor(public constants: Constants,
  public dateservice: Dateservice,
  public translate: TranslateService,
  public utilService: UtilService,
  public mutualFundService:MutualFundService,
  public _PermissionAction: PermissionAction,
  public permissionChangeRoute: PermissionChangeRoute) {}

  ngOnInit(): void {
      
    this.pagination = {
            totalItem: 20,
            itemPerPage: 5,
            currentPage: 1,
            pageSize: [5, 10, 15, 20, 'All'],
            pageSizeLabel: '5'
            }
    if(this.mutualFundType.type === 'SUMMARY'){
       this.initMutualFundSummary();
       this.resultMutualFundSumData = {
         principal: '',
         netAsset: '',
         pl: ''
      };
    }else if(this.mutualFundType.type === 'DETAIL'){
        this.data = this.mutualFundService.selectedMutualFundItem;
        this.mutualFundTransactionDetails(this.data);
            
            this.resultMutualFundDetailData = {
         fundCode: '',
         fundName: '',
         transDate: ''
      };
    }

    this.alertConfig = {
        type: 'danger',
        message: '', 
        show: false
      };
    this.headerDetail= {
        columnName: ['label.status', 'label.TXNDate' , 'label.TXNType', 'label.amount', 'label.allocatedUnit', 'label.navPerUnit', 'label.costPerUnit'],
        fieldName: ['transStatus', 'transDate', 'transType', 'amount', 'unit', 'navPerUnit', 'costPerUnit']
    };

    this.mutualFundLayout = {
        DETAIL: this.headerDetail,
    };
}
  
   private initMutualFundSummary(){
        this.mutualFundService.initMutualFund().then((result) => {
        if(result['responseJSON']['result']['responseStatus']['responseCode'] == this.constants.RESP_CODE_SUCCESS ){
            let resultInitMutualFundSumData= result['responseJSON']['result']['value']['lstOfDetail'];
            let resultInitMutualFundDetailData = result['responseJSON']['result']['value']['lstOfSummary'];
            if(typeof resultInitMutualFundSumData !== "undefined" && resultInitMutualFundSumData[0].listDetail.length>0){
                this.mutualFundPortDetails = resultInitMutualFundSumData[0].listDetail;
                this.resultMutualFundSumData = resultInitMutualFundDetailData[0];
                this.isError = 'Success';
            }else{
                this.isError = 'Fail';                
            }
        }else{
            this.alertConfig.message = result['responseJSON']['result']['responseStatus']['errorMessage'];
            this.alertMessage.show();
        }
        }, function (error) {
            
        });
    }
  
    private mutualFundTransactionDetails(data){
      let fundCode =  data.fundCode;
      let unitHolderNumber = data.unitholder;
      let pageSize = this.pagination.itemPerPage;
	  let pageNumber = this.pagination.currentPage;
      let param={fundCode,unitHolderNumber,pageSize,pageNumber};
      this.mutualFundService.mutualFundTransactionDetails(param).then((result) => {
        let resultMutualFundDetail = result['responseJSON']['result']['value'];
        if(result['responseJSON']['result']['responseStatus']['responseCode'] == this.constants.RESP_CODE_SUCCESS ){
                this.mfTransactionPortDetails = resultMutualFundDetail[0].listTrans;
                this.resultMutualFundDetailData = resultMutualFundDetail[0];
                this.formatTransactionDate(this.mfTransactionPortDetails);
                this.pagination.totalItem = resultMutualFundDetail[0].totalRows;
                this.isError = 'Success';
        }else{
            this.isError = result['responseJSON']['result']['responseStatus']['errorMessage'];
        }
      }, function (error) {
        
      });
    }
 
   onChange(type: string, dt: Date){
      this.pagination.currentPage = 1;
  }
   onCurrentPage(page: number){
      this.pagination.currentPage = page;
      this.mutualFundTransactionDetails(this.data);
  }
   onChangePageSize(page){
      this.pagination.itemPerPage = (page === 'All') ? this.pagination.totalItem : page;
      this.pagination.currentPage = 1;
      this.mutualFundTransactionDetails(this.data);
  }

  
   navToFundDetials(param){
      this.mutualFundService.selectedMutualFundItem = param;
      this.permissionChangeRoute.changeRoute('MY_MUTUAL_FUND.DETAIL');
  }

 
  private formatTransactionDate(param){
        for(let item of param){
            let isoDate = new Date(this.dateservice.toISOFormat(item.transDate));
            item.transDate = this.dateservice.formatDate(isoDate, 'DD MMM YYYY', this.translate.currentLang);
            item.amount = new DecimalPipe("en-us").transform(item.amount, '.2-2');
            item.unit = new DecimalPipe("en-us").transform(item.unit, '.2-2');
            this.returnData.push(item.transDate);
        }
    return this.returnData;
  }
  
   navigateToSumary(){
      this.permissionChangeRoute.changeRoute('MY_MUTUAL_FUND');
  }
  
}
