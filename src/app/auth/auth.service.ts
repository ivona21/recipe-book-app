import { Injectable } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import * as firebase from "firebase";

@Injectable()
export class AuthService {
    token: string;

    constructor(private router: Router, private route: ActivatedRoute) { }

    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(
            (data) => console.log(data)
            )
            .catch(
            error => console.log(error)
            )
    }

    signinUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
            (response) => {
                this.router.navigate(["/"]);
                firebase.auth().currentUser.getToken()
                    .then(
                     (token: string) => this.token = token
                    )
            })
            .catch(
            error => console.log(error)
            )
    }

    logout() {
        firebase.auth().signOut();
        this.token = null;
        this.router.navigate(["/recipes"]);
    }

    getToken() {
        firebase.auth().currentUser.getToken()
            .then(
            (token: string) => {
                this.token = token;
            }
            )
        return this.token;
    }

    isAuthenticated() {
        return this.token != null;
    }
}