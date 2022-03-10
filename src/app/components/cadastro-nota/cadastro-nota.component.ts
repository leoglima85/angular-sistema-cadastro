import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExtrasService } from 'src/app/services/extras.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-cadastro-nota',
  templateUrl: './cadastro-nota.component.html',
  styleUrls: ['./cadastro-nota.component.css']
})
export class CadastroNotaComponent implements OnInit {

  cadastroNotaForm!: FormGroup;
  cadastroNotaAvulsaForm: FormGroup;
  dados: any;
  listaCondominios: any[] = [];
  listaServicos: any[] = [];
  listaFornecedores: any[] = [];
  listaContratos: any[] = [];


  constructor(private fb: FormBuilder,
              private fs: FirestoreService,
              ) {

    // console.log("Constructor cadastro nota: ")
    ExtrasService.notaCriada.subscribe(
      nota => this.dados = nota //console.log(" const notaCriada: ", nota)//
    );
    this.cadastroNotaAvulsaForm = this.fb.group({
      condominio: ['', []],
      contrato: ['', []],
      servico: ['', []],
      fornecedor: ['', []],
      competencia: ['', []],
      dataVencimento: ['', []],
      valor: ['', []],
      recebido: ['sim',[]],
      obs: ['', []],
    });

    if (!this.dados) {
      this.dados = {
        condominio:'',
        contrato:'',
        servico:'',
        fornecedor:'',
        competencia:'',
        dataVencimento:'',
        valor:'',
        obs:'',
        notaID:'',
       }
    }
    
    // this.cadastroNotaForm.value.condominio = "teste"
  }

  async ngOnInit(){
    await this.fs.getCondominioDocs();
    await this.fs.getCargosDocs();
    await this.fs.getBancosDocs();
    await this.fs.getServicosDocs();
    await this.fs.getFornecedoresDocs();
    await this.fs.getContratosDocs()
    this.listaContratos = this.fs.listaContratos
    this.listaCondominios = this.fs.listaCondominios;
    this.listaServicos = this.fs.listaServicos;
    this.listaFornecedores = this.fs.listaFornecedores;
    // console.log(this.listaContratos)
    this.cadastroNotaForm = this.fb.group({
      condominio: [this.dados.condominio, []],
      contrato: [this.dados.contrato, []],
      servico: [this.dados.servico, []],
      fornecedor: [this.dados.fornecedor, []],
      competencia: [this.dados.competencia, []],
      dataVencimento: [this.dados.dataVencimento, []],
      valor: [this.dados.valor, []],
      obs: [this.dados.obs, []],
    });
    
    // console.log("onInit dados: ", this.dados)
  }

  async salvar() {
    // console.log(">>>", this.cadastroNotaForm.value)
    await this.fs.atualizaNotaDoc('Nota',this.dados.notaID, this.cadastroNotaForm.value)
    ExtrasService.fecharDialog.emit();
    
  }

  cancelar(teste : any){
    console.log("teste: ",teste)
    
  }

  setDados() {
    // this.testeInput = dados;
    console.log("dados: ")
  }

  ngOnDestroy() {
    // console.log("destruindo componente da nota")
  }

  async cadNotaAvulsa(){
    this.cadastroNotaForm.value.recebido = 'sim'
    // console.log("form aqui: ", this.cadastroNotaAvulsaForm.value)
    await this.fs.addNotaDoc(this.cadastroNotaAvulsaForm.value)
    ExtrasService.fecharDialog.emit();
  }

 
}
