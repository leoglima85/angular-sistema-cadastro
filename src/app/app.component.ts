import { Component, OnInit, ViewChild } from '@angular/core';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { FireauthservService } from './services/fireauthserv.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-sistema-cadastro';
  public username = "Visitante";
  auth = getAuth();
  public uid : any;

  @ViewChild('sidenav') sidenav: MatSidenav | undefined;
   

  constructor(private route : Router,
              private fas: FireauthservService,
               ){
    
  }
  ngOnInit() {
    console.log('*** OnInit -> ',this.fas.getAuth());
    
  }

  logout() {
    this.fas.logout();
  }

  
}

