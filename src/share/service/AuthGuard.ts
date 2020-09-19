import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PermissionMainMenu, PermissionChangeRoute, PermissionService } from './permission.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private permissionMainMenu: PermissionMainMenu,
        private permissionChangeRoute: PermissionChangeRoute,
        private permissionService: PermissionService
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        let menuName = route.data["menuCode"];
        let promise = new Promise<boolean>((resolve, reject) => {
            this.permissionChangeRoute.getActionListByMenu(menuName).then((result) => {


                // capture active menu name
                this.permissionService.activeMenuName = menuName;

                resolve(this.callGuard(menuName));
            }, function (error) {

                reject(false);
            });
        });


        return promise;
    };

    callGuard(menuName): boolean {
        //for submenu support RBAC
        menuName = menuName.split('.');
        let list = this.permissionMainMenu.getMainMenuKey();


        if (list != undefined) {
            if (list[menuName[0]] == true) {
                return true;
            }
        }

        // alert("AuthGuard fail please login")
        // this._Router.navigate(["login"]);
        this.permissionChangeRoute.changeRoute("HOME");
        return false;
    }
}

@Injectable()
// This class check authorize only user islogin =true; 
export class HalfAuthGuard implements CanActivate {
    constructor(private permissionService: PermissionService,
        private permissionChangeRoute: PermissionChangeRoute
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let islogin = this.permissionService.getIsLogin();

        if (islogin) {
            return true;
        } else {
            //  alert("AuthGuard fail please login")
            //  this.router.navigate(["login"]);
            this.permissionChangeRoute.changeRoute("HOME");
            return false;
        }
    }
}
