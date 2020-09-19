import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class IsLoginService { 

    @Output() multipleLoginEvent: EventEmitter<any> = new EventEmitter(true);
    private isLogin:boolean;
    private isPrivate:boolean;
    private multiplelogoutAlready = false;
    private isKick:boolean = false;

    public setIsLongPollingKick(status){
        this.isKick = status;
    }

    public getIsLongPollingKick(){
        return this.isKick;
    }

    public setIsLogin(isLogin){
        this.isLogin = isLogin;
        if(isLogin){
             this.multiplelogoutAlready = false;
        }
    }
    public getIsLogin():boolean{
        return this.isLogin;
    }

    public setIsPrivate(status){
        this.isPrivate = status;
    }

    public getIsPrivate(){
        return this.isPrivate;
    }
    public setMultipleLoginEmitter(status){
        if(!this.multiplelogoutAlready){
            this.multipleLoginEvent.emit(status);
        }
        this.multiplelogoutAlready = true;
    }




} 