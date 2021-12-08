import { Component, OnInit, ViewChild } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
//import firebase from 'firebase/app';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-sistema-cadastro';
  isSignedIn = false;
  @ViewChild('sidenav') sidenav: MatSidenav | undefined;
  isExpanded = false;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  username : string | undefined = "Visitante";

  constructor(private route : Router){
    
  }
  ngOnInit(): void {
    console.log(this.username);
    if (this.username != "Visitante") {
      this.username = getAuth().currentUser?.uid;
      console.log('aqui > ',this.username);
      this.route.navigate(['home']);
    }
  }

  
  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  logout() {
    
    
    console.log("logout click", getAuth().signOut())
  }

  
}

