import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-log-eventos',
  templateUrl: './log-eventos.component.html',
  styleUrls: ['./log-eventos.component.css']
})
export class LogEventosComponent implements OnInit {

  constructor( private fs : FirestoreService

  ) { }

  ngOnInit(): void {
  }

  async teste(){
    await this.fs.teste();
    
  }

}
