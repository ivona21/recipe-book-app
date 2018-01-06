import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"]
})
export class HeaderComponent {
    @Output() componentChosen = new EventEmitter<string>();

    chooseComponent(component: string){      
        this.componentChosen.emit(component);
    }
}