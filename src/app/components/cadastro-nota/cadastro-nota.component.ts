import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExtrasService } from 'src/app/services/extras.service';

@Component({
  selector: 'app-cadastro-nota',
  templateUrl: './cadastro-nota.component.html',
  styleUrls: ['./cadastro-nota.component.css']
})
export class CadastroNotaComponent implements OnInit {

  cadastroNotaForm!: FormGroup;
  dados: any;

  constructor(private fb: FormBuilder) {


    // console.log("Constructor cadastro nota: ")
    ExtrasService.notaCriada.subscribe(
      nota => this.dados = nota //console.log(" const notaCriada: ", nota)//
    );
    
    // this.cadastroNotaForm.value.condominio = "teste"


  }

  ngOnInit(): void {
    this.cadastroNotaForm = this.fb.group({
      condominio: [this.dados.condominio, []],
      numeroContrato: [this.dados.numeroContrato, []],
      servico: [this.dados.servico, []],
      fornecedor: [this.dados.fornecedor, []],
      competencia: [this.dados.competencia, []],
      dataVencimento: [this.dados.dataVencimento, []],
      valor: [this.dados.valor, []],
      observacao: [this.dados.observacao, []],
    });
    // console.log("ngOnInit cadastro nota: ")
    // ExtrasService.notaCriada.subscribe(
    //   nota => console.log(" const notaCriada: ", nota)//this.dados = nota //
    // );
    // console.log("teste cadastro condo: ",this.dados)
  }

  teste() {
    console.log(">>>", this.dados)

    // ExtrasService.notaCriada.subscribe(
    //   nota => console.log(" teste const notaCriada: ", nota)//this.dados = nota //
    // );
  }

  setDados() {
    // this.testeInput = dados;
    console.log("dados: ")
  }

}
