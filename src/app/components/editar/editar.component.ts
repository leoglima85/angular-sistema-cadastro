import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { collection, doc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { Generico } from 'src/app/models/generico';
import { FirestoreService } from 'src/app/services/firestore.service';


export interface listaServico {
  nome: string;
  checked: boolean;
}

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})

export class EditarComponent implements OnInit {
  docID = "";
  docEscolha = "";
  docTipo = "";
  db = getFirestore();
  listaCondominios: string[] = [];
  listaCargos: string[] = [];
  listaBancos: string[] = [];
  listaServicos: listaServico[] = [];
  listaServicosPrestados: listaServico[] = [];
  docInfos: Generico = {
    id: '', nome: '', conta: '', agencia: '', banco: '',
    chavepix: '', cnpj: '', conselhofiscal1: '',
    conselhofiscal2: '', conselhofiscal3: '', proprietariocpf: '', locatariocpf: '',
    cpfconselhofiscal1: '', cpfconselhofiscal2: '',
    cpfconselhofiscal3: '', cpfsindico: '', email: '',
    endereco: '', operacao: '', pix: '', sindico: '',
    telefone: '', unidade: '', apelido: '', titular: '',
    locatario: '', observacao: '', condominio: '',
    servicosPrestados: '', cpf: '', admissao: '', cargo: '',
  };

  constructor(private route: ActivatedRoute,
    private fs: FirestoreService,
  ) { }

  async ngOnInit() {
    this.route.params.subscribe((obj) => {
      this.docID = obj.id;
      this.docEscolha = obj.escolha;
      //this.docTipo = this.fs.tipo;
      //console.log("tipo: ",this.docTipo)

    });
    await this.fs.getCondominioDocs();
    await this.fs.getCargosDocs();
    await this.fs.getBancosDocs();
    await this.fs.getServicosDocs();
    this.listaCondominios = this.fs.listaCondominios;
    this.listaCargos = this.fs.listaCargos;
    this.listaBancos = this.fs.listaBancos;
    this.listaServicos = this.fs.listaServicos;
    // console.log("cons.tipo: ",this.cons.tipo)
    // if (this.cons.tipo == "banco") {console.log("é Banco")}
    // if (this.cons.tipo == 'Cargo') {console.log("é Cargo")}
    await this.getDoc(this.docID, this.docEscolha)
    if (this.docInfos.servicosPrestados) {
      const listaArr = this.docInfos.servicosPrestados.split(' ');
      for (let serv of listaArr) {
        if (serv != "") {
          for (let ls of this.listaServicos) {
            if (ls.nome == serv)
              ls.checked = true;
          }
        }
      }
    }

  }

  async getDoc(id: string, tipo: string) {
    const q = query(collection(this.db, tipo), where('__name__', "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      //console.log(doc.id, " => ", doc.data());
      this.docInfos.admissao = doc.data().admissao;
      this.docInfos.agencia = doc.data().agencia;
      this.docInfos.apelido = doc.data().apelido;
      this.docInfos.banco = doc.data().banco;
      this.docInfos.cargo = doc.data().cargo;
      this.docInfos.chavepix = doc.data().chavepix;
      this.docInfos.cnpj = doc.data().cnpj;
      this.docInfos.condominio = doc.data().condominio;
      this.docInfos.conselhofiscal1 = doc.data().conselhofiscal1;
      this.docInfos.conselhofiscal2 = doc.data().conselhofiscal2;
      this.docInfos.conselhofiscal3 = doc.data().conselhofiscal3;
      this.docInfos.conta = doc.data().conta;
      this.docInfos.cpf = doc.data().cpf;
      this.docInfos.cpfconselhofiscal1 = doc.data().cpfconselhofiscal1;
      this.docInfos.cpfconselhofiscal2 = doc.data().cpfconselhofiscal2;
      this.docInfos.cpfconselhofiscal3 = doc.data().cpfconselhofiscal3;
      this.docInfos.cpfsindico = doc.data().cpfsindico;
      this.docInfos.email = doc.data().email;
      this.docInfos.endereco = doc.data().endereco;
      this.docInfos.id = doc.id;
      this.docInfos.locatario = doc.data().locatario;
      this.docInfos.nome = doc.data().nome;
      this.docInfos.observacao = doc.data().observacao;
      this.docInfos.operacao = doc.data().operacao;
      this.docInfos.pix = doc.data().pix;
      this.docInfos.servicosPrestados = doc.data().servicosPrestados;
      this.docInfos.sindico = doc.data().sindico;
      this.docInfos.telefone = doc.data().telefone;
      this.docInfos.titular = doc.data().titular;
      this.docInfos.unidade = doc.data().unidade;
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
    };
    await this.fs.atualizaDoc(this.docEscolha, this.docID, data);
  }

  async salvarAlteracaoFornecedor() {
    //console.log("lista :", this.listaServicos);
    let listaString = "";
    for (let i of this.listaServicos) {
      if (i.checked == true) {
        listaString += i.nome + " ";
      }
    }
    //console.log("listastring :",listaString);
    const data = {
      nome: this.docInfos.nome,
      apelido: this.docInfos.apelido,
      cpf: this.docInfos.cpf,
      cnpj: this.docInfos.cnpj,
      telefone: this.docInfos.telefone,
      endereco: this.docInfos.endereco,
      email: this.docInfos.email,
      pix: this.docInfos.pix,
      chavepix: this.docInfos.chavepix,
      servicosPrestados: listaString,
      banco: this.docInfos.banco,
      agencia: this.docInfos.agencia,
      conta: this.docInfos.conta,
      operacao: this.docInfos.operacao,
      observacao: this.docInfos.observacao,

    };
    await this.fs.atualizaDoc(this.docEscolha, this.docID, data);
  }

  async salvarAlteracaoCondomino() {
    const data = {
      observacao: this.docInfos.observacao,
      unidade: this.docInfos.unidade,
      locatario: this.docInfos.locatario,
      locatariocpf: this.docInfos.locatariocpf,
      condominio: this.docInfos.condominio,
      telefone: this.docInfos.telefone,
      nome: this.docInfos.nome,
      proprietariocpf: this.docInfos.proprietariocpf,
    };
    await this.fs.atualizaDoc(this.docEscolha, this.docID, data);
  }

  marcarServico(i: number, event: any) {

    this.listaServicos[i].checked = event.checked;

  }


}

