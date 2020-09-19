
export class MutualFundServiceMock {
 alertConfig: {title: string, type: string,message: string, show: boolean, option: any};
    private _selectedMutualFundItem: any;
    private _mutualFundSummaryData: any;
  
  public initMutualFund() {
        let promise = new Promise((resolve, reject) => {
            // let objRequest = {
            //     params: {},
            //     actionCode: 'ACT_GET_PORT_DETAIL_AND_SUMMARY_MUTUAL_FUND', 
            //     procedure: 'getMutualFundPortDetailAndSummaryProcedure'
            // }
            // this._MfpApi.invokeProcedure(objRequest).then((result: any) => {
            //     resolve(result);
            // }, function (error) {
            //     reject(error);
            //
            // });
        });

        return promise;
    }

    public mfSummaryData() {
        let promise = new Promise((resolve, reject) => {
            // let objRequest = {
            //     params: {},
            //     actionCode: 'ACT_GET_PORT_SUMMARY_MUTUAL_FUND', 
            //     procedure: 'getMutualFundPortSummaryProcedure'
            // }
            // this._MfpApi.invokeProcedure(objRequest).then((result: any) => {
            //     resolve(result);
            // }, function (error) {
            //     reject(error);
            //
            // });
        });
        return promise;
    }
    
       public mutualFundTransactionDetails(param) {
        let promise = new Promise((resolve, reject) => {
            // let objRequest = {
            //     params: param,
            //     actionCode: 'ACT_GET_PORT_TRANSACTION_MUTUAL_FUND', 
            //     procedure: 'getMutualFundPortTransactionProcedure'
            // }
            // this._MfpApi.invokeProcedure(objRequest).then((result: any) => {
            //     resolve(result);
            // }, function (error) {
            //     reject(error);
            //
            // });
        });
        return promise;
    }
    
    set selectedMutualFundItem(selectedMutualFundItem){
        this._selectedMutualFundItem = selectedMutualFundItem;
    }
    get selectedMutualFundItem(): any{
        return this._selectedMutualFundItem;
    }
    set mutualFundSummaryData(mutualFundSummaryData){
        this._mutualFundSummaryData = mutualFundSummaryData;
    }
    get mutualFundSummaryData(): any{
        return this._mutualFundSummaryData;
    }
}