import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import {
  collection, getDocs, getFirestore,
  query, where
} from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FireauthservService {

  isLoggedIn = false;
  auth = getAuth();
  user: any;
  public uid: any;
  db = getFirestore();
  public userID: any;
  public userName: any;

  constructor(private route: Router,
  ) {
    this.userID = this.getUser();
    //this.teste();
  }

  logout() {
    getAuth().signOut()
    //console.log("logout", getAuth().signOut())
  }

  async signin(email: string, password: string) {
    //console.log('signIn no fireauthservice',email,password);
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



  async getUser() {
    onAuthStateChanged(this.auth, async (userid) => {
      if (userid) {
        this.uid = userid.uid;
        //console.log('**get user do fire auth:', this.uid);
        let nome = "";
        const q = query(collection(this.db, "User"), where('__name__', "==", this.uid));
        const querySnapshot = getDocs(q);
        (await querySnapshot).forEach((doc) => {
          //console.log("nome: ",doc.data().nome)  
          nome = doc.data().nome;
          this.userName = doc.data().nome;
        });
        //console.log('**get user do fire auth (end-if):', this.uid);
        return this.uid;
      } else {
        //console.log ('else do getuser')
      }
    });
    //console.log('get user do fire auth retorno uid:', this.uid);
    return this.uid;
  }

  async teste() {
    // let aut =  getAuth().currentUser;
    // console.log("auth: ",aut);
    // console.log("plus: ",aut);
    getAuth().onAuthStateChanged((user) => {
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
