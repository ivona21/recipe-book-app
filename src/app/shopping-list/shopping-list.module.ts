import { NgModule } from "@angular/core";
import { ShoppingListRoutingModule } from "./shopping-list-routing.module";
import { ShoppingListComponent } from '../shopping-list/shopping-list.component';
import { ShoppingEditComponent } from '../shopping-list/shopping-edit/shopping-edit.component';
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,   
    ],
    imports: [
        FormsModule,
        ShoppingListRoutingModule,
        SharedModule
    ]
})
export class ShoppingListModule {
    
}