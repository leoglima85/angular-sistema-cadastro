import { Component, OnInit } from '@angular/core';
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { FireauthservService } from 'src/app/services/fireauthserv.service';

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
   db = getFirestore();
   //colRef = collection(this.db,'movimentacoes');
   movimentacoes: any[] = [];
   lista : Servico[] = [
                    {nome : 'serviço1', checked : false},
                    {nome : 'serviço2', checked : false},
                    {nome : 'serviço3', checked : false},
                    {nome : 'serviço4', checked : false},
                    {nome : 'serviço5', checked : false},
                    {nome : 'serviço6', checked : false},
                    {nome : 'serviço7', checked : false},
                    {nome : 'serviço8', checked : false},
                    {nome : 'serviço9', checked : false},
                    {nome : 'serviço10', checked : false},
                    {nome : 'serviço11', checked : false},
                    {nome : 'serviço12', checked : false},
                    {nome : 'serviço13', checked : false},
                    {nome : 'serviço14', checked : false},
                    {nome : 'serviço15', checked : false},
                    {nome : 'serviço16', checked : false},
                    {nome : 'serviço17', checked : false},
                    {nome : 'serviço18', checked : false},
                    {nome : 'serviço19', checked : false},
                    {nome : 'serviço20', checked : false},
                  ];

  lista2 : any[] = ['teste', 'dois','tres','quatro'];

   constructor(private fas: FireauthservService) 
      { 
         
      }

  ngOnInit(): void {
    
  }

  async getDocsFunc(){
    const querySnapshot = await getDocs(collection(this.db, "extrato"));
    querySnapshot.forEach((doc) => {
      this.movimentacoes.push({...doc.data(),id: doc.id})
    });
  }

  ver () {
    console.log("lista1: ",this.lista);
  }

  

}
