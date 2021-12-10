import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class FireauthservService {

  isLoggedIn = false;
  public auth = getAuth();
  user : any;  
  public uid : any;

  constructor(private route: Router,
              
  ) { 
    
  }

  logout(){
    console.log("logout", getAuth().signOut())
  }

  async signin(email: string, password:string){
    console.log('signIn no fireauthservice');
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        this.user = userCredential.user.email;
        console.log('aqui o user: ',this.user);
        //console.log('Conta logada com sucesso!. uid: ', userCredential.user.uid)
        this.isLoggedIn = true;
        //console.log('user.uid:',userCredential.user.uid);
        //console.log('user.email:',userCredential.user.email);
        this.route.navigate(['dashboard']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      });
  }

  async signup(email: string, password:string){
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(userCredential.user.uid);
        console.log('Conta criada com sucesso')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    }

    getAuth () {
      console.log('getAuth ->', this.auth);
      return getAuth().currentUser?.uid;
    }

    getUser () {
      onAuthStateChanged(this.auth, (userid) => {
        if (userid) {
           this.uid = userid.uid;
          console.log('**get user do fire auth:', this.uid);
          return this.uid;
        } else {
          console.log ('else do getuser')
        }
      });
      //console.log('get user do fire auth retorno uid:', this.uid);
      return this.uid;
    }
      

}
