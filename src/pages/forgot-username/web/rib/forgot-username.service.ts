import { Injectable } from '@angular/core';
import { CardInfoBean } from '../../../../share/bean/card-info-bean';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class ForgotUsernameService {
  private _username: string;
  private _cardInfo: CardInfoBean;
  private _observer: Subject<any> = new Subject();

  get username(): string {
      return this._username;
  }
  set username(username: string) {
      this._username = username;
  }

  get cardInfo(): CardInfoBean {
      return this._cardInfo;
  }
  set cardInfo(cardInfo: CardInfoBean) {
      this._cardInfo = cardInfo;
  }

  getObserver(): Subject<any> {
    return this._observer;
  }
  updateObserver(param: any) {
    this._observer.next(param);
  }

}