import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  temp = "teste";

  constructor() { }

  getTemp (){
    return this.temp;
  }
}
