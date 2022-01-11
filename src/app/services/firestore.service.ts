import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  collection, addDoc, getFirestore, getDocs,
  query, updateDoc, doc, orderBy, where
} from "firebase/firestore";
import { Extrato } from 'src/app/models/extrato';
import { Generico } from '../models/generico';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  db = getFirestore();
  colRef = collection(this.db, 'extrato');
  tipo = "";
  genericoTemp: any[] = [];
  public itens: Generico[] = [];
  public listaCondominios: string[] = [];
  public listaCargos: string[] = [];
  public listaBancos: string[] = [];
  public listaServicos: any[] = [];

  constructor(private _snackBar: MatSnackBar,
    private router: Router) {

  }

  async addMovimentacaoExtrato(mov: Extrato) {
    try {
      const docRef = await addDoc(collection(this.db, "extrato"), {
        conta: mov.conta,
        data_mov: mov.data_mov,
        nr_doc: mov.nr_doc,
        historico: mov.historico,
        valor: mov.valor,
        deb_cred: mov.deb_cred,
        check: mov.check
      });
      //console.log("Document written with ID: ", docRef.id);
      this._snackBar.open("Cadastrato com Sucesso", "", { duration: 4000, panelClass: ["snack-verde"] });
    } catch (e) {
      console.error("Error adding document: ", e);
      this._snackBar.open("Falha ao cadastrar", "", { duration: 4000, panelClass: ["snack-vermelho"] });
    }
  }

  async addCondominioDoc(dados: FormGroup) {
    try {
      const docRef = await addDoc(collection(this.db, "Condominio"), dados.value);
      //console.log("Document written with ID: ", docRef.id);
      this._snackBar.open("Cadastrato com Sucesso", "", { duration: 4000, panelClass: ["snack-verde"] });
    } catch (e) {
      console.error("Error adding document: ", e);
      this._snackBar.open("Falha ao cadastrar", "", { duration: 4000, panelClass: ["snack-vermelho"] });
    }
  }

  async addFuncionarioDoc(dados: FormGroup) {
    console.log("dados do form: ", dados)
    try {
      const docRef = await addDoc(collection(this.db, "Funcionario"), dados.value
      );
      //console.log("Document written with ID: ", docRef.id);
      this._snackBar.open("Cadastrato com Sucesso", "", { duration: 4000, panelClass: ["snack-verde"] });
    } catch (e) {
      console.error("Error adding document: ", e);
      this._snackBar.open("Falha ao cadastrar", "", { duration: 4000, panelClass: ["snack-vermelho"] });
    }
  }

  async addFornecedorDoc(dados: FormGroup, lista: any[]) {
    //console.log("lista :", lista);
    let listaString = "";
    for (let i of lista) {
      if (i.checked == true) {
        listaString += i.servico + " ";
      }
    }
    //console.log("listastring :",listaString);
    try {
      // const docRef = await addDoc(collection(this.db, "Fornecedor"),
      //     {...dados.value, servicosPrestados : listaString});
      // console.log("Document written with ID: ", docRef.id);
      this._snackBar.open("Cadastrato com Sucesso", "", { duration: 4000, panelClass: ["snack-verde"] });
    } catch (e) {
      console.error("Error adding document: ", e);
      this._snackBar.open("Falha ao cadastrar", "", { duration: 4000, panelClass: ["snack-vermelho"] });
    }
  }

  async addCondominoDoc(dados: FormGroup) {
    try {
      const docRef = await addDoc(collection(this.db, "Condomino"), dados.value);
      //console.log("Document written with ID: ", docRef.id);
      this._snackBar.open("Cadastrato com Sucesso", "", { duration: 4000, panelClass: ["snack-verde"] });
    } catch (e) {
      console.error("Error adding document: ", e);
      this._snackBar.open("Falha ao cadastrar", "", { duration: 4000, panelClass: ["snack-vermelho"] });
    }
  }

  async addCargoDoc(dados: FormGroup) {
    //verrificar se o doC ja existe, se existir retornar erro na tela, senao,
    //proseguir com o cadastro!. | where('nome', "==", nomeDesejado)
    //q = query(collection(this.db, tipo), where('__name__', "==", id));
    try {
      const docRef = await addDoc(collection(this.db, "Cargo"),
        {
          nome: dados.value.nome,
        });
      //console.log("Document written with ID: ", docRef.id);
      this._snackBar.open("Cadastrato com Sucesso", "", { duration: 4000, panelClass: ["snack-verde"] });
    } catch (e) {
      console.error("Error adding document: ", e);
      this._snackBar.open("Falha ao cadastrar", "", { duration: 4000, panelClass: ["snack-vermelho"] });
    }
  }

  async teste (){
    
    const q = query(collection(this.db, "Log"), where('nome', "==", "log0"));
    const querySnapshot = await getDocs(q);
    console.log("q",querySnapshot);
    if (querySnapshot.empty) {
      const docRef = await addDoc(collection(this.db, "Log"), {nome: "log1"});
      console.log("logID: ", docRef.id);

    }
    
  }

  async addServicoDoc(dados: FormGroup) {
    try {
      const docRef = await addDoc(collection(this.db, "Servico"),
        {
          nome: dados.value.nome,
        });
      //console.log("Document written with ID: ", docRef.id);
      this._snackBar.open("Cadastrato com Sucesso", "", { duration: 4000, panelClass: ["snack-verde"] });
    } catch (e) {
      console.error("Error adding document: ", e);
      this._snackBar.open("Falha ao cadastrar", "", { duration: 4000, panelClass: ["snack-vermelho"] });
    }
  }

  async addBancoDoc(dados: FormGroup) {
    //console.log("add banco",dados.value);
    try {
      const docRef = await addDoc(collection(this.db, "Banco"),
        {
          nome: dados.value.nome,
        });
      //console.log("Document written with ID: ", docRef.id);
      this._snackBar.open("Cadastrato com Sucesso", "", { duration: 4000, panelClass: ["snack-verde"] });
    } catch (e) {
      console.error("Error adding document: ", e);
      this._snackBar.open("Falha ao cadastrar", "", { duration: 4000, panelClass: ["snack-vermelho"] });
    }
  }

    async getConsultaDocs(opt: string) {
    this.itens = [];
    const outros = ['Servico', 'Banco', 'Cargo']
    if (opt == "Outros") {
      for (let i of outros) {
        const t = query(collection(this.db, i), orderBy("nome", "asc"));
        const qsnp = await getDocs(t);
        qsnp.forEach((doc) => {
          const item: any = { nome: '' };
          this.genericoTemp.push({ ...doc.data(), id: doc.id })
          if (i == "Servico") { item.servico = "Servico" }
          if (i == "Banco") { item.banco = "Banco" }
          if (i == "Cargo") { item.cargo = "Cargo" }
          item.id = doc.id;
          item.nome = doc.data().nome;
          this.itens.push(item);
        });
      }
      this.itens.sort();
    } else {
      const q = query(collection(this.db, opt), orderBy("nome", "asc"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const item: Generico = {
          id: '', nome: '', conta: '', agencia: '', banco: '',
          chavepix: '', cnpj: '', conselhofiscal1: '',
          conselhofiscal2: '', conselhofiscal3: '', proprietariocpf: '', locatariocpf: '',
          cpfconselhofiscal1: '', cpfconselhofiscal2: '',
          cpfconselhofiscal3: '', cpfsindico: '', email: '',
          endereco: '', operacao: '', pix: '', sindico: '',
          telefone: '', unidade: '', apelido: '', titular: '',
          locatario: '', condominio: '', observacao: '',
          servicosPrestados: '', cpf: '', admissao: '', cargo: '',
        };
        this.genericoTemp.push({ ...doc.data(), id: doc.id })
        item.id = doc.id;
        item.conta = doc.data().conta;
        item.agencia = doc.data().agencia;
        item.banco = doc.data().banco;
        item.chavepix = doc.data().chavepix;
        item.conselhofiscal1 = doc.data().conselhofiscal1;
        item.conselhofiscal2 = doc.data().conselhofiscal2;
        item.conselhofiscal3 = doc.data().conselhofiscal3;
        item.cpfconselhofiscal1 = doc.data().cpfconselhofiscal1;
        item.cpfconselhofiscal2 = doc.data().cpfconselhofiscal2;
        item.cpfconselhofiscal3 = doc.data().cpfconselhofiscal3;
        item.cpfsindico = doc.data().cpfsindico;
        item.endereco = doc.data().endereco;
        item.operacao = doc.data().operacao;
        item.pix = doc.data().pix;
        item.sindico = doc.data().sindico;
        item.nome = doc.data().nome;
        item.email = doc.data().email;
        item.telefone = doc.data().telefone;
        item.cnpj = doc.data().cnpj;
        item.unidade = doc.data().unidade;
        item.locatario = doc.data().locatario;
        item.condominio = doc.data().condominio;
        item.observacao = doc.data().observacao;
        item.servicosPrestados = doc.data().servicosPrestados;
        item.cpf = doc.data().cpf;
        item.admissao = doc.data().admissao;
        item.cargo = doc.data().cargo;
        item.apelido = doc.data().apelido;
        item.titular = doc.data().titular;
        this.itens.push(item);

      });
    }

  }

  async getCondominioDocs() {
    const lista: string[] = [];
    const q = query(collection(this.db, "Condominio"), orderBy("nome", "asc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      lista.push(doc.data().nome);
    });
    this.listaCondominios = lista;
    //console.log("lista de con", lista);
  }

  async getCargosDocs() {
    const lista: string[] = [];
    const q = query(collection(this.db, "Cargo"), orderBy("nome", "asc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      lista.push(doc.data().nome);
    });
    this.listaCargos = lista;
    //console.log("lista de cargos", lista);
  }

  async getBancosDocs() {
    const lista: string[] = [];
    const q = query(collection(this.db, "Banco"), orderBy("nome", "asc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      lista.push(doc.data().nome);
    });
    this.listaBancos = lista;
    //console.log("lista de bancos", lista);
  }

  async getServicosDocs() {
    const lista: any[] = [];
    const q = query(collection(this.db, "Servico"), orderBy("nome", "asc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      lista.push({ nome: doc.data().nome, checked: false });
    });
    this.listaServicos = lista;
    //console.log("lista de bancos", lista);
  }

  async atualizaDoc(base: string, id: string, dados: any) {
    //console.log("dados: ", dados)
    try {
      await updateDoc(doc(this.db, base, id), dados);
      this._snackBar.open("Editado com Sucesso", "", { duration: 4000, panelClass: ["snack-verde"] });
      this.router.navigate(['consulta']);
    } catch (e) {
      console.error("Error adding document: ", e);
      this._snackBar.open("Falha ao editar, verifique todas as informações e tente novamente", "", { duration: 4000, panelClass: ["snack-vermelho"] });
    }
  }

}
