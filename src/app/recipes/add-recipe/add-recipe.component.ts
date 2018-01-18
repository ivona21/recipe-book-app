import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { RecipesService } from "../recipes.service";
import { Recipe } from "../recipe.model";

@Component({
    selector: "app-add-recipe",
    templateUrl: "./add-recipe.component.html",
    styleUrls: ["./add-recipe.component.css"]
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
            if (recipe.ingredients) {
                for (let ingredient of recipe.ingredients) {
                    recipeIngredients.push(
                        new FormGroup({
                           "name": new FormControl(ingredient.name, Validators.required),
                           "amount": new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
                        })
                    )
                }
            }
        }

        this.recipeForm = new FormGroup({
            "name": new FormControl(recipeName, Validators.required),
            "imagePath": new FormControl(recipeImagePath, Validators.required),
            "description": new FormControl(recipeDescription, Validators.required),
            "ingredients": recipeIngredients
        });
    }

    onAddIngredient(){
        (<FormArray>this.recipeForm.get("ingredients")).push(
            new FormGroup({
                "name": new FormControl(null, Validators.required),
                "amount": new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
        )
    }

    onSubmit() {
    //    const newRecipe = new Recipe(this.recipeForm.value["name"], this.recipeForm.value["description"], this.recipeForm.value["imagePath"], this.recipeForm.value["ingredients"]);
        
        if (this.editMode){
            this.recipeService.updateRecipe(this.id, this.recipeForm.value);           
        } else {
            this.recipeService.addRecipe(this.recipeForm.value);
        }
    }
}