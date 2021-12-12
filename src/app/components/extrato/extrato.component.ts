import { FirestoreService } from './../../services/firestore.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.css']
})
export class ExtratoComponent implements OnInit {

  public fileString: any;

  constructor() {this.fileString
                 }

  ngOnInit(): void {
  }

  changeListener($event: { target: any; }): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    //var fileType = inputValue.parentElement.id;
    myReader.onloadend = (e) => {
        //myReader.result is a String of the uploaded file
        //console.log("resultado -> ",myReader.result);
        var texto = myReader.result?.toString();
        var texto2 = texto?.replace(/"\n"/gi,';');
        //console.log('\\n ->',texto2);
        texto2 = texto2?.replace(/"/gi,'');
        //console.log('" ->',texto2);
        //texto2 = texto2?.replace(/#/gi,';');
        //console.log('texto 2 ->',texto2);
        var texto3 = texto2?.toString().split(';');
        console.log('values ->', texto3?.length)
        console.log(texto3);
        //for
        //console.log(texto?.split(";"));
        //console.log('e ->',e.target?.result);
        this.fileString = texto3;
        //fileString = myReader.result would not work, 
        //because it is not in the scope of the callback
    }

    var tmp = myReader.readAsText(file);
    //console.log ('fss', tmp)

    //console.log('e ->',e.currentTarget);
  }

  carregarTexto (texto : string) {
    this.fileString = texto;
  }

}
