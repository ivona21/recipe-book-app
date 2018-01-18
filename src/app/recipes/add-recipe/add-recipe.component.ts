import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { FormGroup, FormControl, FormArray } from "@angular/forms";
import { RecipesService } from "../recipes.service";

@Component({
    selector: "app-add-recipe",
    templateUrl: "./add-recipe.component.html"
})
export class AddRecipeComponent implements OnInit {
    constructor(private route: ActivatedRoute,
        private recipeService: RecipesService) { }
    editMode: boolean = false;
    id: number;
    recipeForm: FormGroup;

    ngOnInit() {
        console.log(this.route.params);
        this.route.params.subscribe(
            (params: Params) => {
                this.editMode = params["id"] ? true : false;
                this.id = params["id"] ? Number(params["id"]) : null;
                this.initForm();
            }
        )
    }

    initForm() {
        let recipeName = "";
        let recipeImagePath = "";
        let recipeDescription = "";
        let recipeIngredients = new FormArray([]);

        if (this.editMode) {
            const recipe = this.recipeService.getRecipeById(this.id);
            recipeName = recipe.name;
            recipeImagePath = recipe.imagePath;
            recipeDescription = recipe.description;
            if (recipe["ingredients"]) {
                for (let ingredient of recipe.ingredients) {
                    recipeIngredients.push(
                        new FormGroup({
                            "name": new FormControl(ingredient.name),
                            "amount": new FormControl(ingredient.amount)
                        })
                    )                    
                }
            }
        }

        this.recipeForm = new FormGroup({
            "name": new FormControl(recipeName),
            "imagePath": new FormControl(recipeImagePath),
            "description": new FormControl(recipeDescription),
            "ingredients": recipeIngredients
        });
    }

    onSubmit() {
        console.log(this.recipeForm);
    }
}