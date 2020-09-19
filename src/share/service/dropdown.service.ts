import { Injectable } from '@angular/core';
import { Constants } from '../../share/service/constants';

@Injectable()
export class DropdownDataService {
  private _productType: any;
  private _productTypeSubscription: any;
  private _anyIDType: any;
  private _cardType: any;
  private _languageSettings: any;
  private _immediateTypes: any;
  private _recurringTypes: any;
  private _notifyLanguages: any;

  constructor(
    private constants: Constants, 
  ) {

    this._productType = [
      { name: 'prodType.fd', value: 'FD' }//เงินฝาก

    ];
    this._productTypeSubscription = [
      { name: 'prodType.ca', value: 'CA' },
      { name: 'prodType.sa', value: 'SA' },
      { name: 'prodType.td', value: 'TD' }
    ];
    this._anyIDType = [
      { name: 'Citizen ID', value: 'NATID' },
      { name: 'Mobile', value: 'MSISDN' }
    ];
    this._cardType = [
      { name: 'cardType.idCard', value: 'I', selected: false },
      { name: 'cardType.passport', value: 'P', selected: false }
    ];

    this._languageSettings = [
      { name: 'option.langTH', value: 'th', selected: false },
      { name: 'option.langEN', value: 'en', selected: false }
    ];

    this._immediateTypes = [
      { value: this.constants.IMMEDIATE_TYPE_TODAY, display: "lbl.today" },
      { value: this.constants.IMMEDIATE_TYPE_LATER, display: "lbl.date" }
    ];

    this._recurringTypes = [
      { value: this.constants.RECURRING_TYPE_YES, display: "lbl.yes" },
      { value: this.constants.RECURRING_TYPE_NO, display: "lbl.no" }
    ];

    this._notifyLanguages = [
      { value: this.constants.CULTURE_SHORTNAME_ENGLISH, display: "lbl.english" },
      { value: this.constants.CULTURE_SHORTNAME_THAI, display: "lbl.thai" }
    ];
  }

  get productType() {
    return this._productType;
  }
  get productTypeSubscription() {
    return this._productTypeSubscription;
  }
  get anyIDType() {
    return this._anyIDType;
  }
  get cardType() {
    return this._cardType;
  }
  get languageSetting() {
    return this._languageSettings;
  }
  get immediateTypes() {
    return this._immediateTypes;
  }
  get recurringTypes() {
    return this._recurringTypes;
  }
  get notifyLanguages() {
    return this._notifyLanguages;
  }
}
