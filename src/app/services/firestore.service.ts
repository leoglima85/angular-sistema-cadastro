import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { collection, addDoc, getFirestore, getDocs } from "firebase/firestore";
import { Extrato } from 'src/app/models/extrato';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  db = getFirestore();
  
  colRef = collection(this.db,'extrato');

  constructor() { 
    
    
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
    } catch (e) {
      console.error("Error adding document: ", e);
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
  

}
