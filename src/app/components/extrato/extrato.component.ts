import { FirestoreService } from './../../services/firestore.service';
import { Component, OnInit } from '@angular/core';
import { Extrato } from 'src/app/models/extrato';
import { collection, getFirestore, getDocs } from "firebase/firestore";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.css']
})
export class ExtratoComponent implements OnInit {

  public fileString: any;
  tam : number | undefined = 0;
  extrato: Extrato[] = [];
  db = getFirestore();
  movimentacoes: any[] = [];
  displayedColumns: string[] = ['conta', 'data_mov', 'nr_doc', 'historico','valor','deb_cred','check','delete'];
  dataSource2 = this.extrato;
  
  constructor(private fs: FirestoreService,
              private datePipe: DatePipe) 
  
                { 
                  this.fileString;
                }

  async ngOnInit() {
     await this.getExtratoDocs();
  }

  changeListener($event: { target: any; }): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
        var texto = myReader.result?.toString();
        var texto2 = texto?.replace(/"/gi,'');
        texto2 = texto2?.replace(/\r/gi,';');
        texto2 = texto2?.replace(/\n/gi,'');
        var texto3 = texto2?.toString().split(';');
        this.fileString = texto3;
        var cont = 6;
        this.tam = texto3?.length;
        var temp =  true;
        while  ( temp ){
          if (this.fileString[cont] == 0) {
            console.log("undefined")
          }else {
            let data2  = this.fileString[cont+1];
            var year        = data2.substring(0,4);
            var month       = data2.substring(4,6);
            var day         = data2.substring(6,8);
            var date        = new Date(year, month-1, day);
            console.log("original:",this.fileString[cont+1],"revertido: ",date)
            let mov : Extrato = {
              conta :Number(this.fileString[cont]),
              data_mov: date,
              nr_doc: Number(this.fileString[cont+2]),
              historico: this.fileString[cont+3],
              valor: Number(this.fileString[cont+4]),
              deb_cred: this.fileString[cont+5],
              check: false,
            }
            this.fs.addMovimentacaoExtrato(mov);
            cont = cont +6;
            if (this.fileString[cont] == undefined || this.fileString[cont] == 0 ){ 
                temp = false;
            }
          }
        }
      }

    var tmp = myReader.readAsText(file);
     
  }

  carregarTexto (texto : string) {
    this.fileString = texto;
  }

  async getExtratoDocs(){
    const querySnapshot = await getDocs(collection(this.db, "extrato"));
    querySnapshot.forEach((doc) => {
      //console.log('aqui',doc.data().id);
      this.movimentacoes.push({...doc.data(),id: doc.id})

    });
    //console.log(this.movimentacoes)
    //console.log(this.dataSource)
    //console.log(this.dataSource2)
    this.extrato = this.movimentacoes;
  }

}
