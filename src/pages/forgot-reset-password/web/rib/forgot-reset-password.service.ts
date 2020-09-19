import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { CardInfoBean } from '../../../../share/bean/card-info-bean';

@Injectable()
export class ForgotResetPasswordService {
  private _cardInfo: CardInfoBean;
  private _observer: Subject<any> = new Subject();
  
  private _cache: any;

  getObserver(): Subject<any> {
    return this._observer;
  }
  updateObserver(param: any) {
    this._observer.next(param);
  }

  get cardInfo(): CardInfoBean {
      return this._cardInfo;
  }
  set cardInfo(cardInfo: CardInfoBean) {
      this._cardInfo = cardInfo;
  }

  get cache(): any {
    return this._cache;
  }
  set cache(cache: any) {
      this._cache = cache;
  }
  
}