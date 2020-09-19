export class CardInfoBean {
    cardType: string;
    cardId: string;
    referenceCode: string;
    idIssueCountryCode: string = 'TH';
    constructor (cardType: string, cardId: string, referenceCode: string, idIssueCountryCode: string) {
        this.cardType = cardType;
        this.cardId = cardId;
        this.referenceCode = referenceCode;
        this.idIssueCountryCode = idIssueCountryCode;
    }
}