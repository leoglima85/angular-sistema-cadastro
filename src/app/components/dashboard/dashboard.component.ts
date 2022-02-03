import { Component, OnInit, ViewChild } from '@angular/core';
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { FireauthservService } from 'src/app/services/fireauthserv.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import {FormControl} from '@angular/forms';
import {MatAccordion} from '@angular/material/expansion';

export interface Servico {
  nome : string ;
  checked : boolean;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatAccordion)
  accordion: MatAccordion = new MatAccordion;
   db = getFirestore();

   constructor(private fas: FireauthservService,
               private fs: FirestoreService)
      {

      }

  ngOnInit(): void {

  }



  cancelarAlteracao(){
    this.fs.teste();
  }
}
