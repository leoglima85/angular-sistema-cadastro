import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  collection, addDoc, getFirestore, getDocs,
  query, updateDoc, doc, orderBy, where, setDoc
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
      this._snackBar.open("Cadastrato com Sucesso", "", { duration: 4000, panelClass: ["snack-verde"] });
    } catch (e) {
      console.error("Error adding document: ", e);
      this._snackBar.open("Falha ao cadastrar", "", { duration: 4000, panelClass: ["snack-vermelho"] });
    }
  }

  async addCondominioDoc(dados: FormGroup) {
    if (await this.checarCadastro("Condominio", "nome", dados.value.telefone)) {
      try {
        const docRef = await addDoc(collection(this.db, "Condominio"), dados.value);
        this._snackBar.open("Condomínio Cadastrato com Sucesso", "", { duration: 4000, panelClass: ["snack-verde"] });
        return true;
      } catch (e) {
        this._snackBar.open("Falha ao cadastrar", "", { duration: 4000, panelClass: ["snack-vermelho"] });
        return false;
      }
    } else {
      this._snackBar.open("Já existe um Condomínio cadastrado com esse nome. Favor verificar!", "", { duration: 4000, panelClass: ["snack-vermelho"] });
      return false;
    }
  }

  async addFuncionarioDoc(dados: FormGroup): Promise<boolean> {
    if (await this.checarCadastro("Funcionario", "cpf", dados.value.telefone)) {
      try {
        const docRef = await addDoc(collection(this.db, "Funcionario"), dados.value);
        this._snackBar.open("Funcionario Cadastrato com Sucesso", "", { duration: 4000, panelClass: ["snack-verde"] });
        return true;
      } catch (e) {
        this._snackBar.open("Falha ao cadastrar", "", { duration: 4000, panelClass: ["snack-vermelho"] });
        return false;
      }
    } else {
      this._snackBar.open("Já existe um Funcionario cadastrado com esse CPF. Favor verificar!", "", { duration: 4000, panelClass: ["snack-vermelho"] });
      return false;
    }
  }

  async addFornecedorDoc(dados: FormGroup, lista: any[]): Promise<boolean> {
    let listaString = "";
    for (let i of lista) {
      if (i.checked == true) {
        listaString += i.nome + " ";
      }
    }
    if (await this.checarCadastro("Fornecedor", "telefone", dados.value.telefone)) {
      try {
        const docRef = await addDoc(collection(this.db, "Fornecedor"),
          { ...dados.value, servicosPrestados: listaString });
        this._snackBar.open("Fornecedor Cadastrato com Sucesso", "", { duration: 4000, panelClass: ["snack-verde"] });
        return true;
      } catch (e) {
        this._snackBar.open("Falha ao cadastrar", "", { duration: 4000, panelClass: ["snack-vermelho"] });
        return false;
      }
    } else {
      this._snackBar.open("Já existe um Fornecedor cadastrado com esse telefone. Favor verificar!", "", { duration: 4000, panelClass: ["snack-vermelho"] });
      return false;
    }
  }

  async addCondominoDoc(dados: FormGroup): Promise<boolean> {
    if (await this.checarCadastro("Condômino", "nome", dados.value.nome)) {
      try {
        const docRef = await addDoc(collection(this.db, "Condomino"),
          {
            nome: dados.value.nome,
          });
        this._snackBar.open("Condômino Cadastrato com Sucesso", "", { duration: 4000, panelClass: ["snack-verde"] });
        return true;
      } catch (e) {
        this._snackBar.open("Falha ao cadastrar", "", { duration: 4000, panelClass: ["snack-vermelho"] });
        return false;
      }
    } else {
      this._snackBar.open("Já existe um Condômino cadastrado com esse nome. Favor verificar!", "", { duration: 4000, panelClass: ["snack-vermelho"] });
      return false;
    }
  }

  async addCargoDoc(dados: FormGroup) {
    if (await this.checarCadastro("Cargo", "nome", dados.value.nome)) {
      try {
        const docRef = await addDoc(collection(this.db, "Cargo"),
          {
            nome: dados.value.nome,
          });
        this._snackBar.open("Cadastrato com Sucesso", "", { duration: 4000, panelClass: ["snack-verde"] });
      } catch (e) {
        console.error("Error adding document: ", e);
        this._snackBar.open("Falha ao cadastrar", "", { duration: 4000, panelClass: ["snack-vermelho"] });
      }
    } else {
      this._snackBar.open("Já existe um Cargo cadastrado com esse nome. Favor verificar!", "", { duration: 4000, panelClass: ["snack-vermelho"] });
    }
  }

  async addServicoDoc(dados: FormGroup) {
    if (await this.checarCadastro("Servico", "nome", dados.value.nome)) {
      try {
        const docRef = await addDoc(collection(this.db, "Servico"),
          {
            nome: dados.value.nome,
          });
        this._snackBar.open("Servico Cadastrato com Sucesso", "", { duration: 4000, panelClass: ["snack-verde"] });
      } catch (e) {
        console.error("Error adding document: ", e);
        this._snackBar.open("Falha ao cadastrar", "", { duration: 4000, panelClass: ["snack-vermelho"] });
      }
    } else {
      this._snackBar.open("Já existe um Servico cadastrado com esse nome. Favor verificar!", "", { duration: 4000, panelClass: ["snack-vermelho"] });
    }
  }

  async addBancoDoc(dados: FormGroup) {
    if (await this.checarCadastro("Banco", "nome", dados.value.nome)) {
      try {
        const docRef = await addDoc(collection(this.db, "Banco"),
          {
            nome: dados.value.nome,
          });
        this._snackBar.open("Banco Cadastrato com Sucesso", "", { duration: 4000, panelClass: ["snack-verde"] });
      } catch (e) {
        console.error("Error adding document: ", e);
        this._snackBar.open("Falha ao cadastrar", "", { duration: 4000, panelClass: ["snack-vermelho"] });
      }
    } else {
      this._snackBar.open("Já existe um Banco cadastrado com esse nome. Favor verificar!", "", { duration: 4000, panelClass: ["snack-vermelho"] });
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
  }

  async atualizaDoc(base: string, id: string, dados: any) {
    try {
      await updateDoc(doc(this.db, base, id), dados);
      this._snackBar.open("Editado com Sucesso", "", { duration: 4000, panelClass: ["snack-verde"] });
      this.router.navigate(['consulta']);
    } catch (e) {
      console.error("Error adding document: ", e);
      this._snackBar.open("Falha ao editar, verifique todas as informações e tente novamente", "", { duration: 4000, panelClass: ["snack-vermelho"] });
    }
  }

  async checarCadastro(base: string, campo: string, item: string): Promise<boolean> {
    const q = query(collection(this.db, base), where(campo, "==", item));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return true; // caso ok para cadastrar
    } else {
      return false; //já cadastrado.
    }
  }

  async teste() {
    // cadastra um doc com um ID especifico...
    // const docRef = doc(this.db, "User", "dsfsdfsdf");
    // await setDoc(docRef, { nome: "leo" })
    

  }

  async getUserDoc(uid : any) {
    let nome = "";
    const q = query(collection(this.db, "User"), where('__name__', "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
       //console.log("nome: ",doc.data().nome)  
        nome = doc.data().nome;
      });
      return nome;
  }

}
