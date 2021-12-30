import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { Generico } from 'src/app/models/generico';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})

export class EditarComponent implements OnInit {
  docID = "";
  docEscolha = "";
  db = getFirestore();
  docInfos : Generico ={ id: '',nome: '',conta: '',agencia: '',banco: '',
                          chavepix: '',cnpj: '',conselhofiscal1: '',
                          conselhofiscal2: '',conselhofiscal3: '',
                          cpfconselhofiscal1: '',cpfconselhofiscal2: '',
                          cpfconselhofiscal3: '',cpfsindico: '',email: '',
                          endereco: '',operacao: '',pix: '',sindico: '',
                          telefone: '',unidade :  '', apelido : '',
                          locatario :  '', condominio :  '', observacao : '',
                          servicosPrestados:  '', cpf:  '', admissao:  '', cargo:  '',} ;
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe( (obj) => {
      this.docID = obj.id;
      this.docEscolha = obj.escolha;
      //console.log(obj.id, " - ", obj.escolha);
    });
    this.getDoc(this.docID, this.docEscolha)
  }

  async getDoc(id: string, tipo: string){
    const q = query(collection(this.db, tipo), where('__name__', "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      this.docInfos.id = doc.id;
      this.docInfos.conta = doc.data().conta;
      this.docInfos.agencia= doc.data().agencia;
      this.docInfos.banco= doc.data().banco;
      this.docInfos.chavepix= doc.data().chavepix;
      this.docInfos.conselhofiscal1= doc.data().conselhofiscal1;
      this.docInfos.conselhofiscal2= doc.data().conselhofiscal2;
      this.docInfos.conselhofiscal3= doc.data().conselhofiscal3;
      this.docInfos.cpfconselhofiscal1= doc.data().cpfconselhofiscal1;
      this.docInfos.cpfconselhofiscal2= doc.data().cpfconselhofiscal2;
      this.docInfos.cpfconselhofiscal3= doc.data().cpfconselhofiscal3;
      this.docInfos.cpfsindico= doc.data().cpfsindico;
      this.docInfos.endereco= doc.data().endereco;
      this.docInfos.operacao= doc.data().operacao;
      this.docInfos.pix= doc.data().pix;
      this.docInfos.sindico= doc.data().sindico;
      this.docInfos.nome = doc.data().nome;
      this.docInfos.email = doc.data().email;
      this.docInfos.telefone = doc.data().telefone;
      this.docInfos.cnpj = doc.data().cnpj;
      this.docInfos.unidade = doc.data().unidade;
      this.docInfos.locatario = doc.data().morador2;
      this.docInfos.condominio = doc.data().condominio;
      this.docInfos.observacao = doc.data().observacao;
      this.docInfos.servicosPrestados = doc.data().servicosPrestados;
      this.docInfos.cpf = doc.data().cpf;
      this.docInfos.admissao = doc.data().admissao;
      this.docInfos.cargo = doc.data().cargo;
      this.docInfos.apelido = doc.data().apelido;
    });
  }

  salvarAlteracao (){
    console.log("logaica para salvar alterações");
  }

}

