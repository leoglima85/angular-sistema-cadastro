import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, } from "firebase/auth";
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';

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
  public perfil = "";


  constructor(
    private route: Router,
    private _snackBar: MatSnackBar
  ) {
    this.userID = this.getUser();
  }

  logout() {
    getAuth().signOut()
  }

  async signin(email: string, password: string) {
    await signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        this.user = userCredential.user.email;
        this.isLoggedIn = true;
        this.route.navigate(['cadastro']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this._snackBar.open("Falha ao autenticar, verifique todas as informações e tente novamente", "", { duration: 4000, panelClass: ["snack-vermelho"] });
      });
  }

  async signup(email: string, password: string) {
    await createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
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
        let nome = "";
        let perfil = "";
        const q = query(collection(this.db, "User"), where('__name__', "==", this.uid));
        const querySnapshot = getDocs(q);
        (await querySnapshot).forEach((doc) => {
          nome = doc.data().nome;
          perfil = doc.data().perfil;
          this.perfil = perfil;
          this.userName = doc.data().nome;
        });
        return perfil;
      } else {
        return false
      }
    });
  }

  async teste() {
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user.uid
      } else {
      }
    });
  }
}
