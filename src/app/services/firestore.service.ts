import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { collection, addDoc, getFirestore, getDocs, query } from "firebase/firestore";
import { Extrato } from 'src/app/models/extrato';
import { Generico } from '../models/generico';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  db = getFirestore();
  colRef = collection(this.db,'extrato');
  condominiosTemp: any[] = [];
  public itens: Generico[] = [];
  public listaCondominios: string[] = [];
  public listaCargos: string[] = [];
  public listaBancos: string[] = [];
  public listaServicos: any[] = [];

  constructor(private _snackBar: MatSnackBar)
    {

    }

  async addMovimentacaoExtrato (mov: Extrato) {
    try {
      const docRef = await addDoc(collection(this.db, "extrato"), {
        conta : mov.conta,
        data_mov: mov.data_mov,
        nr_doc: mov.nr_doc,
        historico: mov.historico,
        valor: mov.valor,
        deb_cred: mov.deb_cred,
        check: mov.check
      });
      console.log("Document written with ID: ", docRef.id);
      this._snackBar.open("Cadastrato com Sucesso", "", {duration: 4000, panelClass: ["snack-verde"]});
    } catch (e) {
      console.error("Error adding document: ", e);
      this._snackBar.open("Falha ao cadastrar", "", {duration: 4000, panelClass: ["snack-vermelho"]});
    }
  }

  async addCondominioDoc (dados: FormGroup) {
    try {
      const docRef = await addDoc(collection(this.db, "Condominio"),
      { // objeto a ser enviado
        cnpj : dados.value.cnpj,
        nome : dados.value.nome,
        endereco : dados.value.endereco,
        telefone : dados.value.telefone,
        banco : dados.value.banco,
        agencia : dados.value.agencia,
        conta : dados.value.conta,
        operacao : dados.value.operacao,
        pix : dados.value.pix,
        chavepix : dados.value.chavepix,
        email : dados.value.email,
        sindico : dados.value.sindico,
        cpfsindico : dados.value.cpfsindico,
        conselhofiscal1 : dados.value.conselhofiscal1,
        cpfconselhofiscal1 : dados.value.cpfconselhofiscal1,
        conselhofiscal2 : dados.value.conselhofiscal2,
        cpfconselhofiscal2 : dados.value.cpfconselhofiscal2,
        conselhofiscal3 : dados.value.conselhofiscal3,
        cpfconselhofiscal3 : dados.value.cpfconselhofiscal3
      });
      console.log("Document written with ID: ", docRef.id);
      this._snackBar.open("Cadastrato com Sucesso", "", {duration: 4000, panelClass: ["snack-verde"]});
    } catch (e) {
      console.error("Error adding document: ", e);
      this._snackBar.open("Falha ao cadastrar", "", {duration: 4000, panelClass: ["snack-vermelho"]});
    }
  }

  async addFuncionarioDoc (dados: FormGroup) {
    try {
      const docRef = await addDoc(collection(this.db, "Funcionario"),
      {
        cpf : dados.value.cpf,
        nome : dados.value.nome,
        endereco : dados.value.endereco,
        telefone : dados.value.telefone,
        cargo : dados.value.cargo,
        banco : dados.value.banco,
        agencia : dados.value.agencia,
        conta : dados.value.conta,
        operacao : dados.value.operacao,
        pix : dados.value.pix,
        chavepix : dados.value.chavepix,
        email : dados.value.email,
        admissao : dados.value.admissao,
        condominio : dados.value.condominio,
      });
      console.log("Document written with ID: ", docRef.id);
      this._snackBar.open("Cadastrato com Sucesso", "", {duration: 4000, panelClass: ["snack-verde"]});
    } catch (e) {
      console.error("Error adding document: ", e);
      this._snackBar.open("Falha ao cadastrar", "", {duration: 4000, panelClass: ["snack-vermelho"]});
    }
  }

  async addFornecedorDoc (dados: FormGroup, lista: any[]) {
    let listaString = "";
    for ( let i of lista){
      listaString +=i.nome +" ";
    }
    console.log(listaString);
    try {
      const docRef = await addDoc(collection(this.db, "Fornecedor"),
      {
        cnpj : dados.value.cnpj,
        cpf : dados.value.cpf,
        nome : dados.value.nome,
        endereco : dados.value.endereco,
        telefone : dados.value.telefone,
        banco : dados.value.banco,
        agencia : dados.value.agencia,
        conta : dados.value.conta,
        operacao : dados.value.operacao,
        pix : dados.value.pix,
        chavepix : dados.value.chavepix,
        email : dados.value.email,
        servicosPrestados : listaString,
      });
      console.log("Document written with ID: ", docRef.id);
      this._snackBar.open("Cadastrato com Sucesso", "", {duration: 4000, panelClass: ["snack-verde"]});
    } catch (e) {
      console.error("Error adding document: ", e);
      this._snackBar.open("Falha ao cadastrar", "", {duration: 4000, panelClass: ["snack-vermelho"]});
    }
  }

  async addCondominoDoc (dados: FormGroup) {
    try {
      const docRef = await addDoc(collection(this.db, "Condomino"),
      {
        telefone : dados.value.telefone,
        email : dados.value.email,
        unidade : dados.value.unidade,
        nome : dados.value.nome,
        locatario : dados.value.locatario,
        condominio : dados.value.condominio,
        observacao : dados.value.observacao
      });
      console.log("Document written with ID: ", docRef.id);
      this._snackBar.open("Cadastrato com Sucesso", "", {duration: 4000, panelClass: ["snack-verde"]});
    } catch (e) {
      console.error("Error adding document: ", e);
      this._snackBar.open("Falha ao cadastrar", "", {duration: 4000, panelClass: ["snack-vermelho"]});
    }
  }

  async addCargoDoc (dados: FormGroup) {
    try {
      const docRef = await addDoc(collection(this.db, "Cargo"),
      {
        cargo : dados.value.cargo,
      });
      console.log("Document written with ID: ", docRef.id);
      this._snackBar.open("Cadastrato com Sucesso", "", {duration: 4000, panelClass: ["snack-verde"]});
    } catch (e) {
      console.error("Error adding document: ", e);
      this._snackBar.open("Falha ao cadastrar", "", {duration: 4000, panelClass: ["snack-vermelho"]});
    }
  }

  async addServicoDoc (dados: FormGroup) {
    try {
      const docRef = await addDoc(collection(this.db, "Servico"),
      {
        servico : dados.value.servico,
      });
      console.log("Document written with ID: ", docRef.id);
      this._snackBar.open("Cadastrato com Sucesso", "", {duration: 4000, panelClass: ["snack-verde"]});
    } catch (e) {
      console.error("Error adding document: ", e);
      this._snackBar.open("Falha ao cadastrar", "", {duration: 4000, panelClass: ["snack-vermelho"]});
    }
  }

  async addBancoDoc (dados: FormGroup) {
    //console.log("add banco",dados.value);
    try {
      const docRef = await addDoc(collection(this.db, "Banco"),
      {
        banco : dados.value.banco,
      });
      console.log("Document written with ID: ", docRef.id);
      this._snackBar.open("Cadastrato com Sucesso", "", {duration: 4000, panelClass: ["snack-verde"]});
    } catch (e) {
      console.error("Error adding document: ", e);
      this._snackBar.open("Falha ao cadastrar", "", {duration: 4000, panelClass: ["snack-vermelho"]});
    }
  }

  async getConsultaDocs (opt : string)  {
    this.itens = [];
    const q = query(collection(this.db, opt));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      //console.log("data",doc.data())// is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      const item : Generico = {id: '',nome: '',conta: '',agencia: '',banco: '',
                              chavepix: '',cnpj: '',conselhofiscal1: '',
                              conselhofiscal2: '',conselhofiscal3: '',
                              cpfconselhofiscal1: '',cpfconselhofiscal2: '',
                              cpfconselhofiscal3: '',cpfsindico: '',email: '',
                              endereco: '',operacao: '',pix: '',sindico: '',
                              telefone: '',unidade :  '', apelido : '',
                              locatario :  '', condominio :  '', observacao : '',
                              servicosPrestados:  '', cpf:  '', admissao:  '', cargo:  '',} ;
      this.condominiosTemp.push({ ...doc.data(), id: doc.id })
      item.id = doc.id;
      item.conta = doc.data().conta;
      item.agencia= doc.data().agencia;
      item.banco= doc.data().banco;
      item.chavepix= doc.data().chavepix;
      item.conselhofiscal1= doc.data().conselhofiscal1;
      item.conselhofiscal2= doc.data().conselhofiscal2;
      item.conselhofiscal3= doc.data().conselhofiscal3;
      item.cpfconselhofiscal1= doc.data().cpfconselhofiscal1;
      item.cpfconselhofiscal2= doc.data().cpfconselhofiscal2;
      item.cpfconselhofiscal3= doc.data().cpfconselhofiscal3;
      item.cpfsindico= doc.data().cpfsindico;
      item.endereco= doc.data().endereco;
      item.operacao= doc.data().operacao;
      item.pix= doc.data().pix;
      item.sindico= doc.data().sindico;
      item.nome = doc.data().nome;
      item.email = doc.data().email;
      item.telefone = doc.data().telefone;
      item.cnpj = doc.data().cnpj;
      item.unidade = doc.data().unidade;
      item.locatario = doc.data().morador2;
      item.condominio = doc.data().condominio;
      item.observacao = doc.data().observacao;
      item.servicosPrestados = doc.data().servicosPrestados;
      item.cpf = doc.data().cpf;
      item.admissao = doc.data().admissao;
      item.cargo = doc.data().cargo;
      item.apelido = doc.data().apelido;

      this.itens.push(item);
      //console.log(item);
    });

    //this.itens = this.condominiosTemp;
    //console.log("this itens:",this.itens);
    //return this.itens;
  }

  async getCondominioDocs() {
    const lista : string [] = [];
    const q = query(collection(this.db, "Condominio"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      lista.push(doc.data().nome);
    });
    this.listaCondominios = lista;
    //console.log("lista de con", lista);
  }

  async getCargosDocs() {
    const lista : string [] = [];
    const q = query(collection(this.db, "Cargo"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      lista.push(doc.data().cargo);
    });
    this.listaCargos = lista;
    //console.log("lista de cargos", lista);
  }

  async getBancosDocs() {
    const lista : string [] = [];
    const q = query(collection(this.db, "Banco"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      lista.push(doc.data().banco);
    });
    this.listaBancos = lista;
    //console.log("lista de bancos", lista);
  }

  async getServicosDocs() {
    const lista : any [] = [];
    const q = query(collection(this.db, "Servico"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      lista.push({nome: doc.data().servico, checked: false});
    });
    this.listaServicos = lista;
    //console.log("lista de bancos", lista);
  }


}
