import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "../auth/auth-guard.service";
import { RecipesComponent } from "../recipes/recipes.component";
import { AddRecipeComponent } from "../recipes/add-recipe/add-recipe.component";
import { RecipeDetailComponent } from "../recipes/recipe-detail/recipe-detail.component";
import { RecipeStartComponent } from "../recipes/recipe-start/recipe-start.component";

const recipeRoutes : Routes = [
    {
        path: "", component: RecipesComponent, children: [
            { path: "new", component: AddRecipeComponent, canActivate: [AuthGuard] },
            { path: ":id/edit", component: AddRecipeComponent, canActivate: [AuthGuard] },
            { path: ":id", component: RecipeDetailComponent },
            { path: "", component: RecipeStartComponent }
        ]
    },
]

@NgModule({
    imports: [
        RouterModule.forChild(recipeRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class RecipesRoutingModule {
   
}