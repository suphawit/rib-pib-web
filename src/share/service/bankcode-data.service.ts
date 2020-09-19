import { Injectable } from '@angular/core';
import { Constants } from '../../share/service/constants';

declare var BUILD_NUM;

@Injectable()
export class BankCodeDataService {

    private _bankCodeImageProperties = {
        "000": { 'url': "images/banks/000.png?v="+BUILD_NUM, 'color': '#D1D3D4', 'bankCode': '000', 'bankName': 'Bank' },
        "002": { 'url': "images/banks/002.png?v="+BUILD_NUM, 'color': '#02419a', 'bankCode': '002', 'bankName': 'BBL' },
        "004": { 'url': "images/banks/004.png?v="+BUILD_NUM, 'color': '#2FB457', 'bankCode': '004', 'bankName': 'KBAN' },
        "005": { 'url': "images/banks/005.png?v="+BUILD_NUM, 'color': '#333B97', 'bankCode': '005', 'bankName': 'ABNA' },
        "006": { 'url': "images/banks/006.png?v="+BUILD_NUM, 'color': '#00a4e4', 'bankCode': '006', 'bankName': 'KTB' },
        "008": { 'url': "images/banks/008.png?v="+BUILD_NUM, 'color': '#007bc0', 'bankCode': '008', 'bankName': 'JPMO' },
        "009": { 'url': "images/banks/009.png?v="+BUILD_NUM, 'color': '#e62129', 'bankCode': '009', 'bankName': 'OCBC' },
        "010": { 'url': "images/banks/010.png?v="+BUILD_NUM, 'color': '#bc010c', 'bankCode': '010', 'bankName': 'BTMU' },
        "011": { 'url': "images/banks/011.png?v="+BUILD_NUM, 'color': '#0379c3', 'bankCode': '011', 'bankName': 'TMB' },
        "014": { 'url': "images/banks/014.png?v="+BUILD_NUM, 'color': '#592974', 'bankCode': '014', 'bankName': 'SCB' },
        "017": { 'url': "images/banks/017.png?v="+BUILD_NUM, 'color': '#003a75', 'bankCode': '017', 'bankName': 'CITI' },
        "018": { 'url': "images/banks/018.png?v="+BUILD_NUM, 'color': '#b3d457', 'bankCode': '018', 'bankName': 'SMBC' },
        "020": { 'url': "images/banks/020.png?v="+BUILD_NUM, 'color': '#0072AA', 'bankCode': '020', 'bankName': 'SCBT' },
        "022": { 'url': "images/banks/022.png?v="+BUILD_NUM, 'color': '#7e262b', 'bankCode': '022', 'bankName': 'CIMB' },
        "023": { 'url': "images/banks/023.png?v="+BUILD_NUM, 'color': '#0168b3', 'bankCode': '023', 'bankName': 'RHB' },
        "024": { 'url': "images/banks/024.png?v="+BUILD_NUM, 'color': '#00367b', 'bankCode': '024', 'bankName': 'UOBT' },
        "025": { 'url': "images/banks/025.png?v="+BUILD_NUM, 'color': '#FFC425', 'bankCode': '025', 'bankName': 'AYUD' },
        "026": { 'url': "images/banks/026.png?v="+BUILD_NUM, 'color': '#005395', 'bankCode': '026', 'bankName': 'MEGA' },
        "027": { 'url': "images/banks/027.png?v="+BUILD_NUM, 'color': '#ee1b2e', 'bankCode': '027', 'bankName': 'BA' },
        "028": { 'url': "images/banks/028.png?v="+BUILD_NUM, 'color': '#007856', 'bankCode': '028', 'bankName': 'CACI' },
        "029": { 'url': "images/banks/029.png?v="+BUILD_NUM, 'color': '#04aeec', 'bankCode': '029', 'bankName': 'IOB' },
        "030": { 'url': "images/banks/030.png?v="+BUILD_NUM, 'color': '#EC098D', 'bankCode': '030', 'bankName': 'GSB' },
        "031": { 'url': "images/banks/031.png?v="+BUILD_NUM, 'color': '#ED1C24', 'bankCode': '031', 'bankName': 'HSBC' },
        "032": { 'url': "images/banks/032.png?v="+BUILD_NUM, 'color': '#010088', 'bankCode': '032', 'bankName': 'DEUT' },
        "033": { 'url': "images/banks/033.png?v="+BUILD_NUM, 'color': '#ff860b', 'bankCode': '033', 'bankName': 'GHB' },
        "034": { 'url': "images/banks/034.png?v="+BUILD_NUM, 'color': '#13007d', 'bankCode': '034', 'bankName': 'AGRI' },
        "035": { 'url': "images/banks/035.png?v="+BUILD_NUM, 'color': '#cc0000', 'bankCode': '035', 'bankName': 'EXIM' },
        "039": { 'url': "images/banks/039.png?v="+BUILD_NUM, 'color': '#2f2a77', 'bankCode': '039', 'bankName': 'MHCB' },
        "045": { 'url': "images/banks/045.png?v="+BUILD_NUM, 'color': '#019678', 'bankCode': '045', 'bankName': 'BNPP' },
        "052": { 'url': "images/banks/052.png?v="+BUILD_NUM, 'color': '#a6002b', 'bankCode': '052', 'bankName': 'BOC' },
        "053": { 'url': "images/banks/053.png?v="+BUILD_NUM, 'color': '#ed1b2e', 'bankCode': '053', 'bankName': 'SCOT' },
        "065": { 'url': "images/banks/065.png?v="+BUILD_NUM, 'color': '#F57F20', 'bankCode': '065', 'bankName': 'TBAN' },
        "066": { 'url': "images/banks/066.png?v="+BUILD_NUM, 'color': '#006F3B', 'bankCode': '066', 'bankName': 'ISBT' },
        "067": { 'url': "images/banks/067.png?v="+BUILD_NUM, 'color': '#034EA2', 'bankCode': '067', 'bankName': 'TISC' },
        "069": { 'url': "images/banks/069.png?v="+BUILD_NUM, 'color': '#594F74', 'bankCode': '069', 'bankName': 'KKPB' },
        "070": { 'url': "images/banks/070.png?v="+BUILD_NUM, 'color': '#c90205', 'bankCode': '070', 'bankName': 'ICBC' },
        "071": { 'url': "images/banks/071.png?v="+BUILD_NUM, 'color': '#0060aa', 'bankCode': '071', 'bankName': 'TCRB' },
        "073": { 'url': "images/banks/073.png?v="+BUILD_NUM, 'color': '#004f92', 'bankCode': '073', 'bankName': 'LH' },
        "079": { 'url': "images/banks/079.png?v="+BUILD_NUM, 'color': '#007dba', 'bankCode': '079', 'bankName': 'ANZB' },
        "080": { 'url': "images/banks/080.png?v="+BUILD_NUM, 'color': '#0379c3', 'bankCode': '080', 'bankName': 'SMTP' },
        "098": { 'url': "images/banks/098.png?v="+BUILD_NUM, 'color': '#4674b2', 'bankCode': '098', 'bankName': 'SMEB' }
    };

    constructor(private constants: Constants) {
        
    }

    get bankCodeImageProperties(): any {
        return this._bankCodeImageProperties;
    }

    getBankCodeImagePropertiesByField(bankCode, field): any {
        let result = this._bankCodeImageProperties[bankCode] || this._bankCodeImageProperties[this.constants.DEFAULT_BANK_CODE];
        return result[field];
    }

    getBankCodeImageProperty(bankCode): any {
        return this._bankCodeImageProperties[bankCode] || this._bankCodeImageProperties[this.constants.DEFAULT_BANK_CODE];
    }
}