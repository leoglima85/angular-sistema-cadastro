import { FirestoreService } from './../../services/firestore.service';
import { Component, OnInit } from '@angular/core';
import { Extrato } from 'src/app/models/extrato';
import { collection, getFirestore, getDocs, query, where, orderBy, collectionGroup } from "firebase/firestore";
import { Condominio } from 'src/app/models/condominio.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.css']
})
export class ExtratoComponent implements OnInit {

  db = getFirestore();
  public fileString: any;
  
  check_cred = true;
  check_deb = true;
  
  mes : string = "";
  condominio : number = 0 ;
  somaTotal : number = 0 ;
  extrato: Extrato[] = [];
  condominios: Condominio[] = [];
  condominiosTemp: any[] = [];
  movimentacoes: any[] = [];
  displayedColumns: string[] = ['conta', 'data_mov', 'nr_doc', 'historico','valor','deb_cred','check'];
  meses = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
  
  dataSource2 = this.extrato;
  
  constructor(private fs: FirestoreService,
              fb: FormBuilder) 
  
                { 
                  this.fileString;
                 
                }

  async ngOnInit() {
     await this.getExtratoDocs();
     await this.getCondominioDocs();
      this.filtrar();
  }

  changeListener($event : any) {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
        var texto = myReader.result?.toString();
        var texto2 = texto?.replace(/"/gi,'');
        texto2 = texto2?.replace(/\r/gi,';');
        texto2 = texto2?.replace(/\n/gi,';');
        var texto3 = texto2?.toString().split(';');
        this.fileString = texto3;
        var cont = 6;
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
            console.log(mov);
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
      this.somaTotal = this.somaTotal + doc.data().valor;
      console.log("mes:",doc.data().data_mov.toDate().getMonth(),"ano: ",doc.data().data_mov.toDate().getFullYear())
      this.movimentacoes.push({...doc.data(),id: doc.id})
    });
    this.extrato = this.movimentacoes;
    
  }

  async getCondominioDocs(){
    const q = query(collection(this.db, "condominios"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      //console.log("data",doc.data())// is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      this.condominiosTemp.push({...doc.data(),id: doc.id})
    });
    
    this.condominios = this.condominiosTemp;
  }

  async filtrar(){
    
    console.log ("cred: ",this.check_cred,"deb: ",this.check_deb, "cond:", this.condominio, "mes:", this.mes );
    const ref = query(collection(this.db, 'extrato'), where('deb_cred', '==', 'D'));
    const querySnapshot = await getDocs(ref);
    querySnapshot.forEach((doc) => {
        //console.log(doc.id, ' => ', doc.data());
   });


  }

  onChange() {
    console.log ("cred: ",this.check_cred,"deb: ",this.check_deb, "cond:", this.condominio, "mes:", this.mes );
    
  }



}
