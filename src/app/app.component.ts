import { Component, OnInit, ViewChild } from '@angular/core';
import { getAuth } from "firebase/auth";
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
  @ViewChild('sidenav') sidenav: MatSidenav | undefined;
  isExpanded = false;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  username : string | undefined = "Visitante";

  constructor(private route : Router,
              private fas: FireauthservService ){
    
  }
  ngOnInit(): void {
    this.username = this.fas.getUser();
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
    this.fas.logout();
  }

  
}

