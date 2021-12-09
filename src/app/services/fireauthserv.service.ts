import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class FireauthservService {

  isLoggedIn = false;
  //auth = getAuth();
  user : any;  
  
  constructor(private route: Router,
              
  ) { }

  logout(){
    console.log("logout click", getAuth().signOut())
  }

  async signin(email: string, password:string){
    console.log('signIn no fireauthservice');
    signInWithEmailAndPassword(getAuth(), email, password)
      .then((userCredential) => {
        // Logged in
        this.user = userCredential.user.email;
        console.log('aqui o user: ',this.user);
        //this.fireuser = userCredential;
        //this.user.email = this.fireuser;
        console.log('Conta logada com sucesso!. uid: ', userCredential.user.uid)
        //this.user.username = userCredential.user.uid;
        this.isLoggedIn = true;
        //this.user.email = email;
        //this.user.nome = userCredential.user.uid.toString();
        console.log('user.uid:',userCredential.user.uid);
        console.log('user.email:',userCredential.user.email);
        this.route.navigate(['dashboard']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        // .. 
      });
  }

  async signup(email: string, password:string){
    createUserWithEmailAndPassword(getAuth(), email, password)
      .then((userCredential) => {
        // Logged in
        const user = userCredential.user;
        console.log(userCredential.user.uid);
        console.log('Conta criada com sucesso')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
    }

    getAuth () {
      return getAuth().currentUser?.uid;
    }

    getUser () {
      return this.user
    }

}
