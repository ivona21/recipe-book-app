import { Directive, HostListener, HostBinding } from "@angular/core";

@Directive({
    selector: "[appDropdown]"
})
export class DropdownDirective {
    constructor() { };

    @HostBinding("class.open") isOpen: boolean = false;


    @HostListener("click") toggleOpen(eventData: Event) {
        this.isOpen = !this.isOpen;
    }
}