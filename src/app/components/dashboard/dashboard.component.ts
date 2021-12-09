import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
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

  items: Observable<Item[]>;

  constructor(firestore: AngularFirestore,
              private fas: FireauthservService) { 
    this.items = firestore.collection<Item>('movimentacoes').valueChanges();
    //console.log(this.items);
   }

  ngOnInit(): void {
    console.log('OnInit dashboard component user:',this.fas.getAuth());
  }

}
