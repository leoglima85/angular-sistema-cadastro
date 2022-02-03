import { FormBuilder, Validators, FormGroup, FormGroupDirective } from '@angular/forms';
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
  cadastroContratoForm: FormGroup;

  listaCondominios: any[] = [];
  listaCargos: any[] = [];
  listaBancos: any[] = [];
  listaServicos: any[] = [];
  listaFornecedores: any[] = [];

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
      subsindico: ['', []],
      cpfsubsindico: ['', []],
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
      filiacaopai: ['', []],
      filiacaomae: ['', []],
      pis: ['', []],
      rg: ['', []],
      nascimento: ['', []],
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
    this.cadastroContratoForm = this.fb.group({
      fornecedor: ['', [Validators.required]],
      condominio: ['', [Validators.required]],
      nome: ['', [Validators.required]],
      numeroContrato: ['', [Validators.required]],
      dataVencimento: ['', []],
      periodicidade: ['', []],
      dacc: ['', []],
      observacao: ['', []],
    });

  }

  async ngOnInit() {
    await this.fs.getCondominioDocs();
    await this.fs.getCargosDocs();
    await this.fs.getBancosDocs();
    await this.fs.getServicosDocs();
    await this.fs.getFornecedoresDocs();
    this.listaCondominios = this.fs.listaCondominios;
    this.listaCargos = this.fs.listaCargos;
    this.listaBancos = this.fs.listaBancos;
    this.listaServicos = this.fs.listaServicos;
    this.listaFornecedores = this.fs.listaFornecedores;
  }

  async cadastrarCondominio() {
    if (await this.fs.addCondominioDoc(this.cadastroCondominioForm)){
      this.cadastroCondominioForm.reset();
    }
  }

  async cadastrarFuncionario() {
    if (await this.fs.addFuncionarioDoc(this.cadastroFuncionarioForm)){
      this.cadastroFuncionarioForm.reset();
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

  async cadastrarContrato() {
    await this.fs.addContratoDoc(this.cadastroContratoForm);
    this.cadastroContratoForm.reset();
  }

  cadServico(i: number) {
    this.listaServicos[i].checked = true;
  }

  cancelarForm(form : FormGroupDirective){
    form.resetForm()
  }

}
