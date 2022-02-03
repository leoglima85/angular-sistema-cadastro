import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import { Generico } from 'src/app/models/generico';
import { FirestoreService } from 'src/app/services/firestore.service';

export interface listaServico {
  nome: string;
  checked: boolean;
  servicoID: string;
}
@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
})
export class EditarComponent implements OnInit {
  docID = '';
  docEscolha = '';
  docTipo = '';
  db = getFirestore();
  listaCondominios: any[] = [];
  listaCargos: any[] = [];
  listaBancos: any[] = [];
  listaServicos: listaServico[] = [];
  listaContratos: any[] = [];
  listaFornecedores: any[] = [];
  listaServicosPrestados: listaServico[] = [];
  docInfos: any = {};

  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private fs: FirestoreService
  ) {}

  async ngOnInit() {
    this.ar.params.subscribe((obj) => {
      this.docID = obj.id;
      this.docEscolha = obj.escolha;
      //this.docTipo = this.fs.tipo;
      //console.log("tipo: ",this.docTipo)
    });
    await this.fs.getCondominioDocs();
    await this.fs.getCargosDocs();
    await this.fs.getBancosDocs();
    await this.fs.getServicosDocs();
    await this.fs.getContratosDocs();
    await this.fs.getFornecedoresDocs();
    this.listaCondominios = this.fs.listaCondominios;
    this.listaCargos = this.fs.listaCargos;
    this.listaBancos = this.fs.listaBancos;
    this.listaServicos = this.fs.listaServicos;
    this.listaContratos = this.fs.listaContratos;
    this.listaFornecedores = this.fs.listaFornecedores;
    //console.log("lista cond: ",this.listaCondominios)
    // if (this.cons.tipo == "banco") {console.log("é Banco")}
    // if (this.cons.tipo == 'Cargo') {console.log("é Cargo")}
    await this.getDoc(this.docID, this.docEscolha);
    if (this.docInfos.servicosPrestados) {
      const listaArr = this.docInfos.servicosPrestados.split(' ');
      listaArr.pop();
      //console.log("listaArr",listaArr)
      for (let servicoID of listaArr) {
        //console.log("serv:",servicoID);
        if (servicoID != '') {
          for (let ls of this.listaServicos) {
            //console.log("ls:",ls);
            //console.log("ls.nome:",ls.nome,"serv:",servicoID);
            if (ls.servicoID == servicoID) ls.checked = true;
          }
        }
      }
    }
  }

  async getDoc(id: string, tipo: string) {
    const q = query(collection(this.db, tipo), where('__name__', '==', id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      //console.log(doc.id, " => ", doc.data());
      this.docInfos = doc.data();

    });
    //preencher a listaServiços
    //console.log("lista serviços prestados: ",this.docInfos.servicosPrestados);
  }

  async salvarAlteracaoCondominio() {
    const data = {
      endereco: this.docInfos.endereco,
      telefone: this.docInfos.telefone,
      nome: this.docInfos.nome,
      cnpj: this.docInfos.cnpj,
      banco: this.docInfos.banco,
      agencia: this.docInfos.agencia,
      conta: this.docInfos.conta,
      operacao: this.docInfos.operacao,
      pix: this.docInfos.pix,
      chavepix: this.docInfos.chavepix,
      sindico: this.docInfos.sindico,
      cpfsindico: this.docInfos.cpfsindico,
      subsindico: this.docInfos.subsindico,
      cpfsubsindico: this.docInfos.cpfsubsindico,
      conselhofiscal1: this.docInfos.conselhofiscal1,
      cpfconselhofiscal1: this.docInfos.cpfconselhofiscal1,
      conselhofiscal2: this.docInfos.conselhofiscal2,
      cpfconselhofiscal2: this.docInfos.cpfconselhofiscal2,
      conselhofiscal3: this.docInfos.conselhofiscal3,
      cpfconselhofiscal3: this.docInfos.cpfconselhofiscal3,
      email: this.docInfos.email,
    };
    await this.fs.atualizaDoc(this.docEscolha, this.docID, data);
  }

  async salvarAlteracaoFuncionario() {
    const data = {
      endereco: this.docInfos.endereco,
      observacao: this.docInfos.observacao,
      admissao: this.docInfos.admissao,
      nome: this.docInfos.nome,
      cargo: this.docInfos.cargo,
      telefone: this.docInfos.telefone,
      cpf: this.docInfos.cpf,
      banco: this.docInfos.banco,
      titular: this.docInfos.titular,
      agencia: this.docInfos.agencia,
      conta: this.docInfos.conta,
      operacao: this.docInfos.operacao,
      pix: this.docInfos.pix,
      chavepix: this.docInfos.chavepix,
      email: this.docInfos.email,
      condominio: this.docInfos.condominio,
      filiacaomae: this.docInfos.filiacaomae,
      pis: this.docInfos.pis,
      rg: this.docInfos.rg,
      nascimento: this.docInfos.nascimento,
      filiacaopai: this.docInfos.filiacaopai,
    };
    //console.log("data:",data)
    await this.fs.atualizaDoc(this.docEscolha, this.docID, data);
  }

  async salvarAlteracaoFornecedor() {
    //console.log("lista :", this.listaServicos);
    let listaString = '';
    for (let i of this.listaServicos) {
      if (i.checked == true) {
        listaString += i.servicoID + ' ';
      }
    }
    //console.log("listastring :",listaString);
    const data = this.docInfos;
    //console.log("data fornecedor update: ",data)
    await this.fs.atualizaDoc(this.docEscolha, this.docID, data);
  }

  async salvarAlteracaoCondomino() {
    const data = this.docInfos;
    await this.fs.atualizaDoc(this.docEscolha, this.docID, data);
  }

  async salvarAlteracaoBanco() {
    const data = {
      nome: this.docInfos.nome,
    };
    await this.fs.atualizaDoc(this.docEscolha, this.docID, data);
  }

  async salvarAlteracaoCargo() {
    const data = {
      nome: this.docInfos.nome,
    };
    await this.fs.atualizaDoc(this.docEscolha, this.docID, data);
  }

  async salvarAlteracaoServico() {
    const data = {
      nome: this.docInfos.nome,
    };
    await this.fs.atualizaDoc(this.docEscolha, this.docID, data);
  }

  async salvarAlteracaoContrato() {
    await this.fs.atualizaDoc(this.docEscolha, this.docID, this.docInfos);
  }

  marcarServico(i: number, event: any) {
    this.listaServicos[i].checked = event.checked;
  }

  cancelarAlteracao() {
    this.router.navigate(['consulta']);
  }
}
