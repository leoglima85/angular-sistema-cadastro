import { Component, OnInit } from '@angular/core';
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { FireauthservService } from 'src/app/services/fireauthserv.service';

interface Item {
  conta: string;
  id: string,
  mes_ref: any;
  tipo: string;
  valor: number;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
   db = getFirestore();
   //colRef = collection(this.db,'movimentacoes');
   movimentacoes: any[] = [];

   constructor(private fas: FireauthservService) { 
    this.getDocsFunc();     
      }

  ngOnInit(): void {
    //console.log('OnInit dashboard component user:',this.fas.getAuth());
  }

  async getDocsFunc(){
    const querySnapshot = await getDocs(collection(this.db, "extrato"));
    querySnapshot.forEach((doc) => {
      //console.log('aqui',`${doc.id} => ${doc.data()}`);
      this.movimentacoes.push({...doc.data(),id: doc.id})
    });
  }

}
