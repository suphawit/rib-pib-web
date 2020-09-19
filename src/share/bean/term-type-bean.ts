export class TermTypeBean {
    termNameTh: string;
    termNameEn: string;
    term: string;
    termCode: string;
    minAmount: number;
    maxAmount: number;
    freqIntPayCode: string;
    freqIntPay: number;
    freqIntPayDescTh: string;
    freqIntPayDescEn: string;
    language: string;
    productCode: string;
    currencyType: string;
    productTypeDescription: string;

    public getTermNameDisplay() {
        return this.language.toUpperCase() == "TH" ? this.termNameTh : this.termNameEn;
    }

    public getFreqIntPayDescDisplay() {
        return this.language.toUpperCase() == "TH" ? this.freqIntPayDescTh : this.freqIntPayDescEn;
    }
}