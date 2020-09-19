import { NgModule, ModuleWithProviders } from '@angular/core';
import { AccountService } from "./account.service";
import { AuthGuard } from "./AuthGuard";
import { BankCodeDataService } from "./bankcode-data.service";
import { CanvasService } from "./canvas.service";
import { Constants } from "./constants";
import { Dateservice } from "./date.service";
import { DropdownDataService } from "./dropdown.service";
import { FundTransferService } from "./fund-transfer.service";
import { GetinformationService } from "./getInformation.service";
import { IsLoginService } from "./islogin.service";
import { MasterDataService } from "./master-data.service";
import { MutualFundService } from "./mutual-fund.service";
import { PreloadService } from "./preload.service";
import { UtilService } from "./util.service";
import { ValidationService } from "./validation.service";
import { PermissionAction, PermissionMainMenu, PermissionService, PermissionChangeRoute } from "./permission.service";
import { MainMenuPibMobileService } from "./main-menu.service";
import { ReportService } from "./report.service";
@NgModule({
	declarations: [
	],
	imports: [
	],
	providers: [
	],
	exports: [
	]
})
export class ServicePIBMobileModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: ServicePIBMobileModule,
			providers: [
                AccountService,
                AuthGuard,
                BankCodeDataService,
                CanvasService,
                Constants,
                Dateservice,
                DropdownDataService,
                FundTransferService,
                GetinformationService,
                IsLoginService,
                MasterDataService,
                PreloadService,
                UtilService,
                ValidationService,
                MainMenuPibMobileService,
                PermissionAction,
                PermissionMainMenu,
                PermissionService,
                PermissionChangeRoute,
                ReportService
			],
		}
	}
}
