import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipesComponent } from "./recipes/recipes.component";

const appRoutes = [
    { path: "", redirectTo: "recipes", pathMatch: "full" },
    { path: "shopping-list", component: ShoppingListComponent },
    { path: "recipes", component: RecipesComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}