import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {
    //actioncode: string;
    private actioncode: any;
    
    constructor() {
    }

    set setLoginStatus(actioncode) {
        this.actioncode = actioncode;
        
    }
    get getLoginStatus() {
        return this.actioncode;
    }
}