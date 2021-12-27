import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { collection, addDoc, getFirestore, getDocs, query } from "firebase/firestore";
import { Extrato } from 'src/app/models/extrato';
import { Condominio } from '../models/condominio.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  db = getFirestore();
  colRef = collection(this.db,'extrato');
  condominiosTemp: any[] = [];
  public itens: Condominio[] = [];


  constructor(private _snackBar: MatSnackBar) {


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

    } catch (e) {
      console.error("Error adding document: ", e);
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
      this._snackBar.open("Mensagem", "", {duration: 4000, panelClass: ["snack-verde"]});
    } catch (e) {
      console.error("Error adding document: ", e);
      this._snackBar.open("Mensagem", "", {duration: 4000, panelClass: ["snack-vermelho"]});
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
        admissa : dados.value.admissao,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async addFornecedorDoc (dados: FormGroup) {
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
        servicosPrestados : dados.value.servicoesPrestados,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async addCondominoDoc (dados: FormGroup) {
    try {
      const docRef = await addDoc(collection(this.db, "condomino"),
      {

        nome : dados.value.nome,
        endereco : dados.value.endereco,
        telefone : dados.value.telefone,
        email : dados.value.email,
        unidade : dados.value.unidade,
        morador1 : dados.value.morador1,
        morador2 : dados.value.morador2,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async getConsultaDocs (opt : string)  {
    const q = query(collection(this.db, opt));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      //console.log("data",doc.data())// is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      const item : Condominio = {id: '',nome: '',conta: '',agencia: '',banco: '',chavepix: '',cnpj: '',conselhofiscal1: '',conselhofiscal2: '',conselhofiscal3: '',cpfconselhofiscal1: '',cpfconselhofiscal2: '',cpfconselhofiscal3: '',cpfsindico: '',email: '',endereco: '',operacao: '',pix: '',sindico: '',telefone: ''} ;
      this.condominiosTemp.push({ ...doc.data(), id: doc.id })
      item.nome = doc.data().nome;
      item.email = doc.data().email;
      item.telefone = doc.data().telefone;
      item.cnpj = doc.data().cnpj;
      this.itens.push(item);
      //console.log(item);
    });

    //this.itens = this.condominiosTemp;
    //console.log("this itens:",this.itens);
    //return this.itens;
  }


}
