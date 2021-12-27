import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { FirestoreService } from 'src/app/services/firestore.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  
  cadastroCondominioForm: FormGroup;
  cadastroFuncionarioForm: FormGroup;
  cadastroFornecedorForm: FormGroup;
  cadastroCondominoForm: FormGroup;
  pix : any;
  //pixSel : any;
  constructor(private fb : FormBuilder,
              private fs : FirestoreService,
              ) {
    this.cadastroCondominioForm = this.fb.group({
      cnpj:['',[Validators.required,Validators.pattern("[0-9 ]{14}")]], ///^(\d{3}\.){2}\d{3}\-\d{2}$/
      nome:['',[Validators.required]],
      endereco:['',[]],
      telefone:['',[Validators.required,Validators.pattern("[0-9 ]{11}")]],
      banco:['',[]],
      agencia:['',[]],
      conta:['',[]],
      operacao:['',[]],
      pix:['',[]],
      chavepix:['',[]],
      email:['',[Validators.email]],
      sindico:['',[]],
      cpfsindico:['',[]],
      conselhofiscal1:['',[]],
      cpfconselhofiscal1:['',[]],
      conselhofiscal2:['',[]],
      cpfconselhofiscal2:['',[]],
      conselhofiscal3:['',[]],
      cpfconselhofiscal3:['',[]],
    });
    this.cadastroFuncionarioForm = this.fb.group({
      cpf:['',[Validators.required,Validators.pattern(/^(\d{3}\.){2}\d{3}\-\d{2}$/)]],
      nome:['',[Validators.required]],
      endereco:['',[Validators.required]],
      telefone:['',[Validators.required,Validators.pattern("[0-9 ]{11}")]],
      cargo:['',[Validators.required]],
      banco:['',[]],
      agencia:['',[]],
      conta:['',[]],
      operacao:['',[]],
      pix:['',[]],
      chavepix:['',[]],
      admissao:['',[Validators.required]],
      email:['',[Validators.email]],      
    });
    this.cadastroFornecedorForm = this.fb.group({
      cnpj:['',[Validators.required,Validators.pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)]],
      cpf:['',[]],
      nome:['',[Validators.required]],
      endereco:['',[Validators.required]],
      telefone:['',[Validators.required,Validators.pattern("[0-9 ]{11}")]],
      banco:['',[]],
      agencia:['',[]],
      conta:['',[]],
      operacao:['',[]],
      pix:['',[]],
      chavepix:['',[]],
      email:['',[Validators.email]],
      servicoesPrestados:['',[]],
    });
    this.cadastroCondominoForm = this.fb.group({
      cpf:['',[Validators.required,Validators.pattern(/^(\d{3}\.){2}\d{3}\-\d{2}$/)]],
      nome:['',[Validators.required]],
      endereco:['',[Validators.required]],
      telefone:['',[Validators.required,Validators.pattern("[0-9 ]{11}")]],
      observação:['',[]],
      email:['',[Validators.email]],
      unidade:['',[]],
      morador1:['',[]],
      morador2:['',[]],
    });
  }
  
  ngOnInit(): void {
    
  }

  salvarCondominio(){
    console.log("criar condominio", this.cadastroCondominioForm.value);
    //this.cadastroCondominioForm.reset();
    this.fs.addCondominioDoc(this.cadastroCondominioForm);
    
  }
  
  salvarFuncionario(){
    console.log("criar funcionario", this.cadastroFuncionarioForm.value);
    //this.cadastroCondominioForm.reset();
    this.fs.addCondominioDoc(this.cadastroFuncionarioForm);
  }

  salvarFornecedor(){
    console.log("criar fornecedor", this.cadastroFornecedorForm.value);
    //this.cadastroCondominioForm.reset();
    this.fs.addCondominioDoc(this.cadastroFornecedorForm);
  }

  salvarCondomino(){
    console.log("criar condomino", this.cadastroCondominoForm.value);
    //this.cadastroCondominioForm.reset();
    this.fs.addCondominioDoc(this.cadastroCondominoForm);
  }
 
}
