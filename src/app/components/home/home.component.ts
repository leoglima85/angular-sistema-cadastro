import { Component, OnInit } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import { FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);

  
  constructor(private route: Router,
              private user: AppComponent
    ) { }

  ngOnInit(): void {
    const auth = getAuth();
    auth.onAuthStateChanged((res) => {console.log('resultado: ',res)}); 
  }

    

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  async onSignin(email: string, password:string){
    console.log('clicado no signin: ' + email +' |-| ' + password )
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Logged in
        const user = userCredential.user;
        console.log('Conta logada com sucesso!. uid: ', userCredential.user.uid)
        this.user.username = userCredential.user.uid;
        this.route.navigate(['dashboard']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // .. 
      });
  } 

  async onSignup(email: string, password:string){
    console.log('clicado no signup: ' + email +' |-| ' + password )
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
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
}
