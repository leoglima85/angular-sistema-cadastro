import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { collection, addDoc, getFirestore } from "firebase/firestore";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  
  cadastroForm!: FormGroup;
  constructor(private fb : FormBuilder) { }

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      cnpj:['',[]],
      cpf:['',[Validators.required]],
      nome:['',[Validators.required]],
      endereco:['',[Validators.required]],
      telefone:['',[]],
      cargo:['',[Validators.required]],
      contaBancaria:['',[]],
      banco:['',[]],
      agencia:['',[]],
      conta:['',[]],
      operacao:['',[]],
      pix:['',[]],
      chavepix:['',[]],
      admissao:['',[]],
      email:['',[]],
      unidade:['',[]],
      
    });
  }

  salvarCondominio(){
    console.log("criar condominio", this.cadastroForm.value);
    this.cadastroForm.reset();
  }
 
}
