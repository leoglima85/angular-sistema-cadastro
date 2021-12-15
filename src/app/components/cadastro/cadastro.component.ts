import { Component, OnInit } from '@angular/core';
import { collection, addDoc, getFirestore } from "firebase/firestore";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

    constructor() { }

  ngOnInit(): void {
    
  }
 
}
