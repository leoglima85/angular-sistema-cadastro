import { Component, OnInit } from '@angular/core';
import { collection, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

interface Item {
  conta: string;
  id: string,
  mes_ref: any;
  tipo: string;
  valor: number;
};

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  db = getFirestore();
  item!: Item;
  constructor() { }

  ngOnInit(): void {
    //this.adcicionarDoc ();
  }

  

  async adcicionarDoc () {
    try {
      const docRef = await addDoc(collection(this.db, "movimentacoes"), {
        conta: "conta",
        valor: 3,
        tipo: "1815",
        mes_ref: "12/12/2021"
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }


}
