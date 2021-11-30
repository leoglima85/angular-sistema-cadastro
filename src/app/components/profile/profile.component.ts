
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

interface Item {
  conta: string;
  id: string,
  mes_ref: any;
  tipo: string;
  valor: number;
};

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent  {

  items: Observable<Item[]>;

  constructor(firestore: AngularFirestore) { 
    this.items = firestore.collection<Item>('movimentacoes').valueChanges();
    //console.log(this.items);
   }

}
