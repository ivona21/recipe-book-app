import * as ShoppingListActions from "./shopping-list.actions";

import { Ingredient } from "../../shared/ingredient.model";

const initialState = {
    ingredients: [
        new Ingredient("Apples", 5),
        new Ingredient("Tomatoes", 10)
    ]
}

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
    switch (ShoppingListActions.ADD_INGREDIENT) {
        case action.type: {
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            }
        }
        default: return state;
    }   
}