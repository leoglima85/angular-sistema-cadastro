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
  cadastroCargoForm: FormGroup;
  cadastroServicoForm: FormGroup;
  cadastroBancoForm: FormGroup;

  listaCondominios : string [] = [];
  listaCargos : string [] = [];
  listaBancos : string [] = [];

  pix : any;
  //pixSel : any;
  constructor(private fb : FormBuilder,
              private fs : FirestoreService,
              )
    {

    this.cadastroCondominioForm = this.fb.group({
      cnpj:['',[]], ///^(\d{3}\.){2}\d{3}\-\d{2}$/
      nome:['',[Validators.required]],
      endereco:['',[Validators.required]],
      telefone:['',[]],
      banco:['',[]],
      agencia:['',[]],
      conta:['',[]],
      operacao:['',[]],
      pix:['',[]],
      chavepix:['',[]],
      email:['',[Validators.email]],
      sindico:['',[Validators.required]],
      cpfsindico:['',[Validators.required]],
      conselhofiscal1:['',[]],
      cpfconselhofiscal1:['',[]],
      conselhofiscal2:['',[]],
      cpfconselhofiscal2:['',[]],
      conselhofiscal3:['',[]],
      cpfconselhofiscal3:['',[]],
    });
    this.cadastroFuncionarioForm = this.fb.group({
      cpf:['',[Validators.required,]], //Validators.pattern(/^(\d{3}\.){2}\d{3}\-\d{2}$/)
      nome:['',[Validators.required]],
      endereco:['',[Validators.required]],
      telefone:['',[Validators.required,]], //Validators.pattern("[0-9 ]{11}")
      cargo:['',[Validators.required]],
      banco:['',[]],
      condominio:['',[]],
      titular:['',[]],
      agencia:['',[]],
      conta:['',[]],
      operacao:['',[]],
      pix:['',[]],
      chavepix:['',[]],
      admissao:['',[Validators.required]],
      email:['',[]],
    });
    this.cadastroFornecedorForm = this.fb.group({
      cnpj:['',[]],
      //fazer um combo box para escolher cpf e cnpj e obrigar.
      //apelido do fornecedor....
      cpf:['',[]],
      apelido:['',[]],
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
      servicoesPrestados:['',[]],
    });
    this.cadastroCondominoForm = this.fb.group({
      telefone:['',[]],
      observacao:['',[]],
      email:['',[]],
      unidade:['',[]],
      morador1:['',[Validators.required]],
      morador2:['',[]],
      condominio:['',[]],
    });
    this.cadastroCargoForm = this.fb.group({
      cargo:['',[Validators.required]],
    });
    this.cadastroServicoForm = this.fb.group({
      servico:['',[Validators.required]],
    });
    this.cadastroBancoForm = this.fb.group({
      banco:['',[Validators.required]],
    });

  }

  async ngOnInit() {
    await this.fs.getCondominioDocs();
    await this.fs.getCargosDocs();
    await this.fs.getBancosDocs();
    this.listaCondominios = this.fs.listaCondominios;
    this.listaCargos = this.fs.listaCargos;
    this.listaBancos = this.fs.listaBancos;
    //console.log("construtor: ",this.listaCondominios)
  }

  async salvarCondominio(){
    //console.log("criar condominio", this.cadastroCondominioForm.value);
    await this.fs.addCondominioDoc(this.cadastroCondominioForm);
    this.cadastroCondominioForm.reset();
  }

  async salvarFuncionario(){
    //console.log("criar funcionario", this.cadastroFuncionarioForm.value);
    await this.fs.addFuncionarioDoc(this.cadastroFuncionarioForm);
    this.cadastroCondominioForm.reset();
  }

  async salvarFornecedor(){
    //console.log("criar fornecedor", this.cadastroFornecedorForm.value);
    await this.fs.addFornecedorDoc(this.cadastroFornecedorForm);
    this.cadastroCondominioForm.reset();
  }

  async salvarCondomino(){
    //console.log("criar condomino", this.cadastroCondominoForm.value);
    await this.fs.addCondominoDoc(this.cadastroCondominoForm);
    this.cadastroCondominoForm.reset();
  }

  async salvarCargo(){
    //console.log("criar cargo: ", this.cadastroCargoForm.value);
    await this.fs.addCargoDoc(this.cadastroCargoForm);
    this.cadastroCargoForm.reset();
  }

  async salvarServico(){
    //console.log("criar servico", this.cadastroServicoForm.value);
    await this.fs.addServicoDoc(this.cadastroServicoForm);
    this.cadastroServicoForm.reset();
  }

  async salvarBanco(){
    //console.log("criar banco", this.cadastroBancoForm.value);
    await this.fs.addBancoDoc(this.cadastroBancoForm);
    this.cadastroBancoForm.reset();
  }

}
