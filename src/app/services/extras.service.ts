import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExtrasService {

  emitirCadastrarNota = new EventEmitter<string>();
  static notaCriada = new EventEmitter<string>();

  constructor() { console.log("Extras Service")}

  addNota(dados : any){
    console.log("Extras Service - addNota: ",dados);
    // this.emitirCadastrarNota.emit("dados");
    ExtrasService.notaCriada.emit(dados);
  }
}
