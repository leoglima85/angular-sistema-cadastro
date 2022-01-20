import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { collection, addDoc, getFirestore, getDocs, query, updateDoc, doc, orderBy, where, deleteDoc} from "firebase/firestore";
import { Extrato } from 'src/app/models/extrato';
import { Generico } from '../models/generico';
import { FireauthservService } from './fireauthserv.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  db = getFirestore();
  colRef = collection(this.db, 'extrato');
  tipo = "";
  public perfil = "";
  genericoTemp: any[] = [];
  public itens: Generico[] = [];
  public listaCondominios: any[] = [];
  public listaCargos: any[] = [];
  public listaBancos: any[] = [];
  public listaServicos: any[] = [];
  public listaServicosNomes: any[] = [];
  public listaLogs: any[] = [];

  public listaExportCondominios: any[] = [];
  public listaExportFuncionarios: any[] = [];
  public listaExportFornecedores: any[] = [];
  public listaExportCondominos: any[] = [];
  public listaExportCargos: any[] = [];
  public listaExportBancos: any[] = [];
  public listaExportUsers: any[] = [];
  public listaExportLogs: any[] = [];


  constructor(private _snackBar: MatSnackBar,
    private router: Router,
    private fas: FireauthservService,
    ) {

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
    if (await this.checarCadastro("Condominio", "nome", dados.value.nome)) {
      try {
        await addDoc(collection(this.db, "Condominio"), dados.value);
        
        await addDoc(collection(this.db, "Log"),
          {
            uusuarioID: this.fas.uid,
            usuarioNome: this.fas.userName,
            data: new Date(),
            tipo: "Criação",
            tabela: "Condominio",
            registro: dados.value,
          });
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
    if (await this.checarCadastro("Funcionario", "cpf", dados.value.cpf)) {
      try {
        await addDoc(collection(this.db, "Funcionario"), dados.value);
        
        await addDoc(collection(this.db, "Log"),
          {
            usuarioID: this.fas.uid,
          usuarioNome: this.fas.userName,
            data: new Date(),
            tipo: "Criação",
            tabela: "Funcionario",
            registro: dados.value,
          });
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
        listaString += i.servicoID + " ";
      }
    }
    if (await this.checarCadastro("Fornecedor", "telefone", dados.value.telefone)) {
      try {
        await addDoc(collection(this.db, "Fornecedor"),
          { ...dados.value, servicosPrestados: listaString });
        
        await addDoc(collection(this.db, "Log"),
          {
            usuarioID: this.fas.uid,
          usuarioNome: this.fas.userName,
            data: new Date(),
            tipo: "Criação",
            tabela: "Fornecedor",
            registro: { ...dados.value, servicosPrestados: listaString }
          });
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
        await addDoc(collection(this.db, "Condomino"), dados.value);
        
        await addDoc(collection(this.db, "Log"),
          {
            usuarioID: this.fas.uid,
          usuarioNome: this.fas.userName,
            data: new Date(),
            tipo: "Criação",
            tabela: "Condomino",
            registro: dados.value,
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
        await addDoc(collection(this.db, "Cargo"),
          {
            nome: dados.value.nome,
          });
        
        await addDoc(collection(this.db, "Log"),
          {
            uusuarioID: this.fas.uid,
            usuarioNome: this.fas.userName,
            data: new Date(),
            tipo: "Criação",
            tabela: "Cargo",
            registro: dados.value,
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
        await addDoc(collection(this.db, "Servico"),
          {
            nome: dados.value.nome,
          });
        
        await addDoc(collection(this.db, "Log"),
          {
            usuarioID: this.fas.uid,
          usuarioNome: this.fas.userName,
            data: new Date(),
            tipo: "Criação",
            tabela: "Servico",
            registro: dados.value,
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
        await addDoc(collection(this.db, "Banco"),
          {
            nome: dados.value.nome,
          });
        
        await addDoc(collection(this.db, "Log"),
          {
            usuarioID: this.fas.uid,
          usuarioNome: this.fas.userName,
            data: new Date(),
            tipo: "Criação",
            tabela: "Banco",
            registro: dados.value,
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
      querySnapshot.forEach(async (doc) => {
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

    this.itens.forEach(async (item) => {
      if (item.condominio) {
        item.condominio = await this.getCondominioNome(item.condominio)
      }
      if (item.cargo) {
        item.cargo = await this.getCargoNome(item.cargo)
      }
      if (item.banco) {
        item.banco = await this.getBancoNome(item.banco)
      }
      if (item.servicosPrestados) {
        item.servicosPrestados = await this.getServicoNome(item.servicosPrestados)
      }
    });

  }

  async getCondominioDocs() {
    const lista: any[] = [];
    const q = query(collection(this.db, "Condominio"), orderBy("nome", "asc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      lista.push({ nome: doc.data().nome, condominioID: doc.id });
    });
    this.listaCondominios = lista;
  }

  async getCondominioNome(id: string): Promise<string> {
    let nome = "";
    if (id.length >= 18) {
      const q = query(collection(this.db, "Condominio"), where('__name__', "==", id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        nome = doc.data().nome;
        return doc.data().nome;
      });
    }
    return nome;
  }

  async getCargoNome(id: string): Promise<string> {
    let nome = "";
    if (id.length >= 18) {
      const q = query(collection(this.db, "Cargo"), where('__name__', "==", id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        nome = doc.data().nome;
        return doc.data().nome;
      });
    }
    return nome;
  }

  async getBancoNome(id: string): Promise<string> {
    let nome = "";
    if (id.length >= 18) {
      const q = query(collection(this.db, "Banco"), where('__name__', "==", id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        nome = doc.data().nome;
        return doc.data().nome;
      });
    }
    return nome;
  }

  async getServicoNome(lista: string): Promise<string> {
    let listaString = [];
    let litaServicoConsulta = "";
    listaString = lista.split(" ");
    listaString.pop();
    for (let i of listaString) {
      const q = query(collection(this.db, "Servico"), where('__name__', "==", i));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        litaServicoConsulta += doc.data().nome+" ";
        return litaServicoConsulta;
      });
    }
    
    return litaServicoConsulta;
  }

  async getCargosDocs() {
    const lista: any[] = [];
    const q = query(collection(this.db, "Cargo"), orderBy("nome", "asc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      lista.push({ ...doc.data(), cargoID: doc.id });
    });
    this.listaCargos = lista;
  }

  async getBancosDocs() {
    const lista: any[] = [];
    const q = query(collection(this.db, "Banco"), orderBy("nome", "asc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      lista.push({ ...doc.data(), bancoID: doc.id });
    });
    this.listaBancos = lista;
  }

  async getServicosDocs() {
    const lista: any[] = [];
    const q = query(collection(this.db, "Servico"), orderBy("nome", "asc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      lista.push({ ...doc.data(), checked: false, servicoID: doc.id });
    });
    this.listaServicos = lista;
  }

  async getLogsDocs() {
    const lista: any[] = [];
    const q = query(collection(this.db, "Log"), orderBy("data", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      lista.push({ ...doc.data(), data: doc.data().data.toDate() });
    });
    this.listaLogs = lista;
    this.listaLogs.forEach(async (item) => {
      if (item.registro.condominio) {
        item.registro.condominio = await this.getCondominioNome(item.registro.condominio)
      }
      if (item.registro.cargo) {
        item.registro.cargo = await this.getCargoNome(item.registro.cargo)
      }
      if (item.registro.banco) {
        item.registro.banco = await this.getBancoNome(item.registro.banco)
      }
      if (item.registro.servicosPrestados) {
        item.registro.servicosPrestados = await this.getServicoNome(item.registro.servicosPrestados)
      }
    });
  }

  async atualizaDoc(base: string, id: string, dados: any) {
    try {
      await updateDoc(doc(this.db, base, id), dados);
      
      await addDoc(collection(this.db, "Log"),
        {
          usuarioID: this.fas.uid,
          usuarioNome: this.fas.userName,
          data: new Date(),
          tipo: "Alteração",
          tabela: base,
          registro: dados,
        });
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

  async getUserDoc(uid: any) {
    let nome : any// "";
    const q = query(collection(this.db, "User"), where('__name__', "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      nome = doc.data();
    });
    this.perfil = nome.perfil;
    return nome;
  }

  async carregarBaseCompleta() {
    const listaCondominios: any[] = [];
    const listaFuncionarios: any[] = [];
    const listaFornecedores: any[] = [];
    const listaCondominos: any[] = [];
    const listaCargos: any[] = [];
    const listaBancos: any[] = [];
    const listaLogs: any[] = [];
    const listaUsers: any[] = [];

    const queryCondominios = query(collection(this.db, "Condominio"), orderBy("nome", "asc"));
    const queryFuncionarios = query(collection(this.db, "Funcionario"), orderBy("nome", "asc"));
    const queryFornecedores = query(collection(this.db, "Fornecedor"), orderBy("nome", "asc"));
    const queryCondominos = query(collection(this.db, "Condomino"), orderBy("nome", "asc"));
    const queryCargos = query(collection(this.db, "Cargo"), orderBy("nome", "asc"));
    const queryBancos = query(collection(this.db, "Banco"), orderBy("nome", "asc"));
    const queryUsers = query(collection(this.db, "User"), orderBy("nome", "asc"));
    const queryLogs = query(collection(this.db, "Log"), orderBy("data", "desc"));

    const querySnapshotCondominios = await getDocs(queryCondominios);
    querySnapshotCondominios.forEach((doc) => { listaCondominios.push(doc.data())});
    this.listaExportCondominios = listaCondominios;
    this.listaExportCondominios.forEach(async (item) => {
      if (item.banco) {
        item.banco = await this.getBancoNome(item.banco)
      }});

    const querySnapshotFuncionario = await getDocs(queryFuncionarios);
    querySnapshotFuncionario.forEach((doc) => { listaFuncionarios.push(doc.data()) });
    this.listaExportFuncionarios = listaFuncionarios;
    this.listaExportFuncionarios.forEach(async (item) => {
      if (item.condominio) {
        item.condominio = await this.getCondominioNome(item.condominio)
      }
      if (item.cargo) {
        item.cargo = await this.getCargoNome(item.cargo)
      }
      if (item.banco) {
        item.banco = await this.getBancoNome(item.banco)
      }
    });

    const querySnapshotFornecedor = await getDocs(queryFornecedores);
    querySnapshotFornecedor.forEach((doc) => { listaFornecedores.push(doc.data()) });
    this.listaExportFornecedores = listaFornecedores;
    this.listaExportFornecedores.forEach(async (item) => {
      if (item.banco) {
        item.banco = await this.getBancoNome(item.banco)
      }
      if (item.servicosPrestados) {
        item.servicosPrestados = await this.getServicoNome(item.servicosPrestados)
      }
    });

    const querySnapshotCondomino = await getDocs(queryCondominos);
    querySnapshotCondomino.forEach((doc) => { listaCondominos.push(doc.data()) });
    this.listaExportCondominos = listaCondominos;
    this.listaExportCondominos.forEach(async (item) => {
      if (item.condominio) {
        item.condominio = await this.getCondominioNome(item.condominio)
      }
    });

    const querySnapshotCargos = await getDocs(queryCargos);
    querySnapshotCargos.forEach((doc) => { listaCargos.push(doc.data()) });
    this.listaExportCargos = listaCargos;

    const querySnapshotBancos = await getDocs(queryBancos);
    querySnapshotBancos.forEach((doc) => { listaBancos.push(doc.data()) });
    this.listaExportBancos = listaBancos;

    const querySnapshoUsers = await getDocs(queryUsers);
    querySnapshoUsers.forEach((doc) => { listaUsers.push(doc.data()) });
    this.listaExportUsers = listaUsers;

    const querySnapshotLogs = await getDocs(queryLogs);
    querySnapshotLogs.forEach((doc) => { listaLogs.push({ ...doc.data(), registro: JSON.stringify(doc.data().registro) }) });
    this.listaExportLogs = listaLogs;

  }

  async teste() {
    let nome = "";
    const q = query(collection(this.db, "Funcionario"), where('__name__', "==", "SpKAekQofji046FoLQMa"));
    const querySnapshot = await getDocs(q);
    console.log("aquii: ", querySnapshot.docs);
    querySnapshot.forEach((doc) => {
      console.log("dados: ", doc.data())
      nome = doc.data().nome;
    });
  }

  async deleteDoc(baseName: string, docID:string){
      const q = query(collection(this.db, baseName), where('__name__', "==", docID));
      const querySnapshot = await getDocs(q);
      let reg : any;
      if (querySnapshot.docs.length == 1){
        const del = await deleteDoc(doc(this.db, baseName, docID));
        querySnapshot.forEach((doc) => {
          reg = doc.data();
        });
        const add = await addDoc(collection(this.db, "Log"),
          {
            usuarioID: this.fas.uid,
          usuarioNome: this.fas.userName,
            data: new Date(),
            tipo: "Exclusão",
            tabela: baseName,
            registro: reg,
          });
        this._snackBar.open("Deletado com Sucesso", "", { duration: 4000, panelClass: ["snack-verde"] });
      }else {  
      this._snackBar.open("Falha ao deletar, verifique todas as informações e tente novamente", "", { duration: 4000, panelClass: ["snack-vermelho"] });
      }
  }

}
