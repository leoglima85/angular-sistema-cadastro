import { Injectable } from '@angular/core';
import { collection, addDoc, getFirestore, getDocs } from "firebase/firestore";
import { Extrato } from 'src/app/models/extrato';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  db = getFirestore();
  
  colRef = collection(this.db,'extrato');

  constructor() { 
    
    
  }

  async addMovimentacaoExtrato (mov: Extrato) {
    try {
      const docRef = await addDoc(collection(this.db, "extrato"), {
        conta : mov.conta,
        data_mov: mov.data_mov,
        nr_doc: mov.nr_doc,
        historico: mov.historico,
        valor: mov.valor,
        deb_cred: mov.deb_cred,
        check: mov.check
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  

}
