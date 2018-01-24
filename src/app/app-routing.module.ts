import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./core/home/home.component";

const appRoutes: Routes = [
    { path: "", component: HomeComponent },
    { path: "recipes", loadChildren: "./recipes/recipes.module#RecipesModule"},
    { path: "", redirectTo: "recipes", pathMatch: "full" }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }