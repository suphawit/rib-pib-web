import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class TermAndConditionModalService {
    private _action: Subject<any> = new Subject();

    getAction(): Subject<any> {
      return this._action;
    }
    updateAction() {
      this._action.next();
    }
}