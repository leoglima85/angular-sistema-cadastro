import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExtrasService {

  static notaCriada = new EventEmitter<string>();
  static fecharDialog = new EventEmitter<string>();

  constructor() {}
  
}
