import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,
  onAuthStateChanged,
  getIdToken
} from "firebase/auth";

export interface User {
  displayName: string | null,	//The display name of the user.
  email: string | null,	//The //email of the user.
  phoneNumber: string | null,	//The phone number normalized based on the E.164 standard (e.g. +16505550101) for the user.
  photoURL: string | null,	//The profile photo URL of the user.
  providerId: string, //	The //provider used to authenticate the user.
  uid: string,
  emailVerified: boolean,	//Whether the email has been verified with sendEmailVerification() and applyActionCode().
  isAnonymous: boolean,	//Whether the user is authenticated using the ProviderId.ANONYMOUS provider.
  refreshToken: string,	//Refresh token used to reauthenticate the user. Avoid using this directly and prefer User.getIdToken() to refresh the ID token instead.
  tenantId: string | null
}


@Injectable({
  providedIn: 'root'
})
export class FireauthservService {

  isLoggedIn = false;
  auth: any;
  user: any;
  public uid: any;

  constructor(private route: Router,
  ) {
    //this.user = new User();
    //this.teste();
  }

  logout() {
    //console.log("logout", getAuth().signOut())
  }

  async signin(email: string, password: string) {
    //console.log('signIn no fireauthservice');
    await signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        this.user = userCredential.user.email;
        //console.log('aqui o user: ', this.user);
        //console.log('Conta logada com sucesso!. uid: ', userCredential.user.uid)
        this.isLoggedIn = true;
        //console.log('user.uid:',userCredential.user.uid);
        //console.log('user.email:',userCredential.user.email);
        this.route.navigate(['dashboard']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        //console.log(error);
      });
  }

  async signup(email: string, password: string) {
    await createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        //console.log(userCredential.user.uid);
        //console.log('Conta criada com sucesso')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }



  getUser() {
    onAuthStateChanged(this.auth, (userid) => {
      if (userid) {
        this.uid = userid.uid;
        console.log('**get user do fire auth:', this.uid);
        return this.uid;
      } else {
        //console.log ('else do getuser')
      }
    });
    console.log('get user do fire auth retorno uid:', this.uid);
    return this.uid;
  }

  async teste() {
    // let aut =  getAuth().currentUser;
    // console.log("auth: ",aut);
    // console.log("plus: ",aut);
    getAuth().onAuthStateChanged( (user) => {
      if (user) {
        // User logged in already or has just logged in.
        this.user = user.uid
        //console.log("uid",user.uid);
      } else {
        // User not logged in or has just logged out.
      }
    });
  }


}
