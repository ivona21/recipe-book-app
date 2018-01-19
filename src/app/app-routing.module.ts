import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { AddRecipeComponent } from "./recipes/add-recipe/add-recipe.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { SigninComponent } from "./auth/signin/signin.component";

const appRoutes: Routes = [
    { path: "", redirectTo: "recipes", pathMatch: "full" },
    { path: "shopping-list", component: ShoppingListComponent },
    {
        path: "recipes", component: RecipesComponent, children: [
            { path: "new", component: AddRecipeComponent },
            { path: ":id/edit", component: AddRecipeComponent },
            { path: ":id", component: RecipeDetailComponent },
            { path: "", component: RecipeStartComponent }
        ]
    },
    { path: "signup", component: SignupComponent },
    { path: "signin", component: SigninComponent}


];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}