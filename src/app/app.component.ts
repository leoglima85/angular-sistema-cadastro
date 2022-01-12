import { Component, OnInit, ViewChild } from '@angular/core';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { FireauthservService } from './services/fireauthserv.service';
import { FirestoreService } from './services/firestore.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-sistema-cadastro';
  public username = "";
  uid : any;

  @ViewChild('sidenav') sidenav: MatSidenav | undefined;
  user: string | undefined;
   

  constructor(private route : Router,
              private fas: FireauthservService,
              private fs: FirestoreService
               )
    {
      getAuth().onAuthStateChanged( (user) => {
        if (user) {
          // User logged in already or has just logged in.
          this.uid = user.uid
          //console.log(" fas uid",user);
          this.getUserName(user.uid);
        } else {
          // User not logged in or has just logged out.
        }
      });
    }
  ngOnInit() {
    //console.log('*** OnInit -> ',this.fas.getAuth());
    
  }

  logout() {
    this.fas.logout();
  }

  async getUserName (uid : any) {
     //console.log("AQUI")
     this.username = await this.fs.getUserDoc(uid);
     //console.log("username: ",this.username)
    
  }
}

