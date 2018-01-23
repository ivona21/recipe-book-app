import { NgModule } from "@angular/core";
import { SignupComponent } from '../auth/signup/signup.component';
import { SigninComponent } from '../auth/signin/signin.component';
import { SharedModule } from "../shared/shared.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        SignupComponent,
        SigninComponent
    ],
    imports: [
        FormsModule,
        SharedModule,
        AuthRoutingModule
    ]
})
export class AuthModule{

}