import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';

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

  listaCondominios: any[] = [];
  listaCargos: string[] = [];
  listaBancos: string[] = [];
  listaServicos: any[] = [];

  pix: any;
  constructor(private fb: FormBuilder,
    private fs: FirestoreService,
  ) {

    this.cadastroCondominioForm = this.fb.group({
      cnpj: ['', []],
      nome: ['', [Validators.required]],
      endereco: ['', [Validators.required]],
      telefone: ['', []],
      banco: ['', []],
      agencia: ['', []],
      conta: ['', []],
      operacao: ['', []],
      pix: ['', []],
      chavepix: ['', []],
      email: ['', [Validators.email]],
      sindico: ['', [Validators.required]],
      cpfsindico: ['', [Validators.required]],
      conselhofiscal1: ['', []],
      cpfconselhofiscal1: ['', []],
      conselhofiscal2: ['', []],
      cpfconselhofiscal2: ['', []],
      conselhofiscal3: ['', []],
      cpfconselhofiscal3: ['', []],
      observacao: ['', []],
    });
    this.cadastroFuncionarioForm = this.fb.group({
      cpf: ['', [Validators.required,]],
      nome: ['', [Validators.required]],
      endereco: ['', []],
      telefone: ['', []],
      cargo: ['', [Validators.required]],
      banco: ['', []],
      condominio: ['', [Validators.required]],
      titular: ['', []],
      agencia: ['', []],
      conta: ['', []],
      operacao: ['', []],
      pix: ['', []],
      chavepix: ['', []],
      admissao: ['', [Validators.required]],
      email: ['', [Validators.email]],
      observacao: ['', []],
    });
    this.cadastroFornecedorForm = this.fb.group({
      cnpj: ['', []],
      cpf: ['', []],
      apelido: ['', []],
      nome: ['', [Validators.required]],
      endereco: ['', []],
      telefone: ['', [Validators.required,]],
      banco: ['', []],
      agencia: ['', []],
      conta: ['', []],
      operacao: ['', []],
      pix: ['', []],
      chavepix: ['', []],
      email: ['', [Validators.email]],
      servicosPrestados: ['', []],
      observacao: ['', []],
    });
    this.cadastroCondominoForm = this.fb.group({
      telefone: ['', []],
      observacao: ['', []],
      email: ['', [Validators.email]],
      unidade: ['', [Validators.required]],
      nome: ['', [Validators.required]],
      proprietariocpf: ['', []],
      locatario: ['', []],
      locatariocpf: ['', []],
      condominio: ['', [Validators.required]],

    });
    this.cadastroCargoForm = this.fb.group({
      nome: ['', [Validators.required]],
    });
    this.cadastroServicoForm = this.fb.group({
      nome: ['', [Validators.required]],
    });
    this.cadastroBancoForm = this.fb.group({
      nome: ['', [Validators.required]],
    });

  }

  async ngOnInit() {
    await this.fs.getCondominioDocs();
    await this.fs.getCargosDocs();
    await this.fs.getBancosDocs();
    await this.fs.getServicosDocs();
    this.listaCondominios = this.fs.listaCondominios;
    this.listaCargos = this.fs.listaCargos;
    this.listaBancos = this.fs.listaBancos;
    this.listaServicos = this.fs.listaServicos;
  }

  async cadastrarCondominio() {
    if (await this.fs.addCondominioDoc(this.cadastroCondominioForm)){
      this.cadastroCondominioForm.reset();
    }
  }

  async cadastrarFuncionario() {
    if (await this.fs.addFuncionarioDoc(this.cadastroFuncionarioForm)){
      this.cadastroCondominioForm.reset();
    }
  }

  async cadastrarFornecedor() {
    if (await this.fs.addFornecedorDoc(this.cadastroFornecedorForm, this.listaServicos)){
      this.cadastroFornecedorForm.reset();
    }
  }

  async cadastrarCondomino() {
    if (await this.fs.addCondominoDoc(this.cadastroCondominoForm)){
      this.cadastroCondominoForm.reset();
    }
  }

  async cadastrarCargo() {
    await this.fs.addCargoDoc(this.cadastroCargoForm);
    this.cadastroCargoForm.reset();
  }

  async cadastrarServico() {
    await this.fs.addServicoDoc(this.cadastroServicoForm);
    this.cadastroServicoForm.reset();
  }

  async cadastrarBanco() {
    await this.fs.addBancoDoc(this.cadastroBancoForm);
    this.cadastroBancoForm.reset();
  }

  cadServico(i: number) {
    this.listaServicos[i].checked = true;

  }

}
