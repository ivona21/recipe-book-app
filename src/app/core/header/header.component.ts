import { Component } from "@angular/core";
import { HttpEvent, HttpEventType } from "@angular/common/http";

import { DataStorageService } from "../../shared/data-storage.service";
import { AuthService } from "../../auth/auth.service";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"]
})
export class HeaderComponent {       
    constructor(private storageService: DataStorageService, private authService: AuthService) {     };
      
    onSaveData(){
        this.storageService.storeRecipes()
            .subscribe(
                (response: HttpEvent<Object>) => {
                   
                }
            );
    }

    onFetchData(){
        this.storageService.retrieveRecipes();
    }

    onLogout(){
        this.authService.logout();
    }

    isAuth(){
        return this.authService.isAuthenticated();
    }
}