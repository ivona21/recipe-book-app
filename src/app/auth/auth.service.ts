import * as firebase from "firebase";

export class AuthService {
    
    signupUser(email: string, password: string){     
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(
                (data) => console.log(data)
            )
            .catch(
                error => console.log(error)
            )
    }
}