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
  title = 'MCSM';
  titleNavBar = "MCSM - Gerenciado de Condomínios"
  username = "";
  perfil = "";
  uid : any;
  usuario :any;

  @ViewChild('sidenav') sidenav: MatSidenav | undefined;
  user: string | undefined;
   

  constructor(private route : Router,
              private fas: FireauthservService,
              private fs: FirestoreService
               )
    {
      //this.usuario = this.fas.getUser();
      
      getAuth().onAuthStateChanged( (user) => {
        if (user) {
          // User logged in already or has just logged in.
          this.uid = user.uid
          // this.usuario = user;
          // console.log(" fas user",user);
          this.getUserName(user.uid);
        } else {
          // User not logged in or has just logged out.
        }
      });
      //console.log("usuario no app comp:", this.username); //nao tem nada ainda
    }

  async ngOnInit() {
    //console.log('*** OnInit -> ',this.fas.getAuth());
    // const teste =  this.fas.perfil;
    // console.log("teste: ",teste)
  }

  logout() {
    this.fas.logout();
  }

  async getUserName (uid : any) {
    // onsole.log("AQUI",uid)
    let user : any;
    user = await this.fs.getUserDoc(uid);
    //console.log("user", user)
     this.username = user.nome;
     this.perfil = user.perfil;
     //console.log("username: ",this.username)
  }

  getNomeUsuario (){
      return this,this.username;

  }
}

