import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
    selector: "app-add-recipe",
    templateUrl: "./add-recipe.component.html"
})
export class AddRecipeComponent implements OnInit{
    constructor(private route: ActivatedRoute){}
    isEdit: boolean = false;
    id: number;

    ngOnInit(){
        this.route.params.subscribe(
            (params: Params) => {
                this.isEdit = params["id"] ? true : false;
                this.id = params["id"] ? Number(params["id"]) : null;
            }
        )
    }
}