import { Component, OnInit } from '@angular/core';
import { FormControl, Validators} from '@angular/forms';
import { FireauthservService } from 'src/app/services/fireauthserv.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  perfil : any;
  
  constructor(private fas: FireauthservService,
    ) { }

  ngOnInit() {
    
     //console.log("home comp:", this.perfil )
  }

    getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  onSignin(email: string, password:string){
    //console.log('signIn no home component',email,password);
    this.fas.signin(email,password)
    
  } 

  onSignup(email: string, password:string){
    //onsole.log('signUp no home component');
    this.fas.signup(email, password)
    
  } 
}
