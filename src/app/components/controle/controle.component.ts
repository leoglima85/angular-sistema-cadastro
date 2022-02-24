import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-controle',
  templateUrl: './controle.component.html',
  styleUrls: ['./controle.component.css']
})
export class ControleComponent implements OnInit {
  displayedColumns: string[] = ['contrato', 'competencia', 'dataVencimento', 'valor', 'recebido', 'nota'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  listaContratos: any[] = [];
  notas: any[] = [];

  // contratos = [
  //   // { condominio: "E5KJiJ2z5v3YMuPyaKul", dacc: true, dataVencimento: 1, fornecedor: "51IQ9wAqgPwNXbEJX6W2", nome: "0O9J90X6lMpx6nQ4LqBn", numeroContrato: "D034KFD87", observacao: "sem obs", periodicidade: "Mensal" },
  //   // { condominio: "DJOlrSQCSPnnT1vqHPYK", dacc: true, dataVencimento: 5, fornecedor: "51IQ9wAqgPwNXbEJX6W2", nome: "0O9J90X6lMpx6nQ4LqBn", numeroContrato: "DSK30FH54", observacao: "sem obs", periodicidade: "Anual" }
  // ];

  // notas = [
  //   { contrato: "D034KFD87", competencia: 1, dataVencimento: "10/1/2022", valor: 123.45, recebido: "nao", obs: "" },
  //   // { contrato: "DSK30FH54", competencia: 2, dataVencimento: "11/2/2022", valor: 123.45, recebido: "nao", obs: "" },
  //   // { contrato: "D034KFD87", competencia: 3, dataVencimento: "12/3/2022", valor: 123.45, recebido: "nao", obs: "" },
  //   // { contrato: "DSK30FH54", competencia: 4, dataVencimento: "13/4/2022", valor: 123.45, recebido: "nao", obs: "" },
  // ];


  constructor(private fs : FirestoreService) {
    
    
  }

  async ngOnInit(): Promise<void> {
    await this.fs.getContratosDocs()
    this.listaContratos = this.fs.listaContratos
    await this.fs.getNotasDocs()
    this.notas = this.fs.listaNotas
    // console.log(this.listaContratos)
    // console.log("ntas: ",this.notas)
    let busca = false
    let mes = new Date().getMonth() + 1
    let mesAnterior = mes - 1
    let mesSeguinte1 = mes + 1
    let mesSeguinte2 = mes + 2
    const ano = new Date().getFullYear()
    let anoAnterior = ano - 1
    let anoSeguinte = ano + 1
    this.listaContratos.forEach(doc => {
      // console.log("doc: ", doc.numeroContrato, "mes: ",mes)
      if (mes > 1 && mes < 11) {
        console.log(">1<11.", mes)
        busca = false
        this.notas.find(nota => {
          if (nota.contrato === doc.numeroContrato && (mesAnterior) == nota.competencia)
            busca = true
        })
        if (!busca) {
          this.fs.addNotaDoc({contrato: doc.numeroContrato,
            competencia: mesAnterior,
            dataVencimento: `${doc.dataVencimento}/${mesAnterior}/${ano}`,
            valor: 0,
            recebido: "nao",
            obs: ""})
          // this.notas.push({
          //   contrato: doc.numeroContrato,
          //   competencia: mesAnterior,
          //   dataVencimento: `${doc.dataVencimento}/${mesAnterior}/${ano}`,
          //   valor: 0,
          //   recebido: "nao",
          //   obs: ""
          // })
        }
        busca = false
        this.notas.find(nota => {
          if (nota.contrato === doc.numeroContrato && (mes) == nota.competencia)
            busca = true
        })
        if (!busca) {
          this.fs.addNotaDoc({contrato: doc.numeroContrato,
            competencia: mes,
            dataVencimento: `${doc.dataVencimento}/${mes}/${ano}`,
            valor: 0,
            recebido: "nao",
            obs: ""})
          // this.notas.push({
          //   contrato: doc.numeroContrato,
          //   competencia: mes,
          //   dataVencimento: `${doc.dataVencimento}/${mes}/${ano}`,
          //   valor: 0,
          //   recebido: "nao",
          //   obs: ""
          // })
        }
        busca = false
        this.notas.find(nota => {
          if (nota.contrato === doc.numeroContrato && (mesSeguinte1) == nota.competencia)
            busca = true
        })
        if (!busca) {
          this.fs.addNotaDoc({contrato: doc.numeroContrato,
            competencia: mesSeguinte1,
            dataVencimento: `${doc.dataVencimento}/${mesSeguinte1}/${ano}`,
            valor: 0,
            recebido: "nao",
            obs: ""})
          // this.notas.push({
          //   contrato: doc.numeroContrato,
          //   competencia: mesSeguinte1,
          //   dataVencimento: `${doc.dataVencimento}/${mesSeguinte1}/${ano}`,
          //   valor: 0,
          //   recebido: "nao",
          //   obs: ""
          // })
        }
        busca = false
        this.notas.find(nota => {
          if (nota.contrato === doc.numeroContrato && (mesSeguinte2) == nota.competencia)
            busca = true
        })
        if (!busca) {
          this.fs.addNotaDoc({contrato: doc.numeroContrato,
            competencia: mesSeguinte2,
            dataVencimento: `${doc.dataVencimento}/${mesSeguinte2}/${ano}`,
            valor: 0,
            recebido: "nao",
            obs: ""})
          // this.notas.push({
          //   contrato: doc.numeroContrato,
          //   competencia: mesSeguinte2,
          //   dataVencimento: `${doc.dataVencimento}/${mesSeguinte2}/${ano}`,
          //   valor: 0,
          //   recebido: "nao",
          //   obs: ""
          // })
        }
      } else if (mes == 1) {
        mesAnterior = 12
        mesSeguinte1 = 2
        mesSeguinte2 = 3
        console.log("1.", mes)
        busca = false
        this.notas.find(nota => {
          if (nota.contrato === doc.numeroContrato && (mesAnterior) == nota.competencia)
            busca = true
        })
        if (!busca) {
          this.fs.addNotaDoc({contrato: doc.numeroContrato,
            competencia: mesAnterior,
            dataVencimento: `${doc.dataVencimento}/${mesAnterior}/${anoAnterior}`,
            valor: 0,
            recebido: "nao",
            obs: ""})
          // this.notas.push({
          //   contrato: doc.numeroContrato,
          //   competencia: mesAnterior,
          //   dataVencimento: `${doc.dataVencimento}/${mesAnterior}/${anoAnterior}`,
          //   valor: 0,
          //   recebido: "nao",
          //   obs: ""
          // })
        }
        busca = false
        this.notas.find(nota => {
          if (nota.contrato === doc.numeroContrato && (mes) == nota.competencia)
            busca = true
        })
        if (!busca) {
          this.fs.addNotaDoc({contrato: doc.numeroContrato,
            competencia: mes,
            dataVencimento: `${doc.dataVencimento}/${mes}/${ano}`,
            valor: 0,
            recebido: "nao",
            obs: ""})
          // this.notas.push({
          //   contrato: doc.numeroContrato,
          //   competencia: mes,
          //   dataVencimento: `${doc.dataVencimento}/${mes}/${ano}`,
          //   valor: 0,
          //   recebido: "nao",
          //   obs: ""
          // })
        }
        busca = false
        this.notas.find(nota => {
          if (nota.contrato === doc.numeroContrato && (mesSeguinte1) == nota.competencia)
            busca = true
        })
        if (!busca) {
          this.fs.addNotaDoc({contrato: doc.numeroContrato,
            competencia: mesSeguinte1,
            dataVencimento: `${doc.dataVencimento}/${mesSeguinte1}/${ano}`,
            valor: 0,
            recebido: "nao",
            obs: ""})
          // this.notas.push({
          //   contrato: doc.numeroContrato,
          //   competencia: mesSeguinte1,
          //   dataVencimento: `${doc.dataVencimento}/${mesSeguinte1}/${ano}`,
          //   valor: 0,
          //   recebido: "nao",
          //   obs: ""
          // })
        }
        busca = false
        this.notas.find(nota => {
          if (nota.contrato === doc.numeroContrato && (mesSeguinte2) == nota.competencia)
            busca = true
        })
        if (!busca) {
          this.fs.addNotaDoc({contrato: doc.numeroContrato,
            competencia: mesSeguinte2,
            dataVencimento: `${doc.dataVencimento}/${mesSeguinte2}/${ano}`,
            valor: 0,
            recebido: "nao",
            obs: ""})
          // this.notas.push({
          //   contrato: doc.numeroContrato,
          //   competencia: mesSeguinte2,
          //   dataVencimento: `${doc.dataVencimento}/${mesSeguinte2}/${ano}`,
          //   valor: 0,
          //   recebido: "nao",
          //   obs: ""
          // })
        }
      } else if (mes == 11) {
        mesSeguinte2 = 1
        console.log("11.", mes)
        busca = false
        this.notas.find(nota => {
          if (nota.contrato === doc.numeroContrato && (mesAnterior) == nota.competencia)
            busca = true
        })
        if (!busca) {
          this.fs.addNotaDoc({contrato: doc.numeroContrato,
            competencia: mesAnterior,
            dataVencimento: `${doc.dataVencimento}/${mesAnterior}/${ano}`,
            valor: 0,
            recebido: "nao",
            obs: ""})
          // this.notas.push({
          //   contrato: doc.numeroContrato,
          //   competencia: mesAnterior,
          //   dataVencimento: `${doc.dataVencimento}/${mesAnterior}/${ano}`,
          //   valor: 0,
          //   recebido: "nao",
          //   obs: ""
          // })
        }
        busca = false
        this.notas.find(nota => {
          if (nota.contrato === doc.numeroContrato && (mes) == nota.competencia)
            busca = true
        })
        if (!busca) {
          this.fs.addNotaDoc({contrato: doc.numeroContrato,
            competencia: mes,
            dataVencimento: `${doc.dataVencimento}/${mes}/${ano}`,
            valor: 0,
            recebido: "nao",
            obs: ""})
          // this.notas.push({
          //   contrato: doc.numeroContrato,
          //   competencia: mes,
          //   dataVencimento: `${doc.dataVencimento}/${mes}/${ano}`,
          //   valor: 0,
          //   recebido: "nao",
          //   obs: ""
          // })
        }
        busca = false
        this.notas.find(nota => {
          if (nota.contrato === doc.numeroContrato && (mesSeguinte1) == nota.competencia)
            busca = true
        })
        if (!busca) {
          this.fs.addNotaDoc({contrato: doc.numeroContrato,
            competencia: mesSeguinte1,
            dataVencimento: `${doc.dataVencimento}/${mesSeguinte1}/${ano}`,
            valor: 0,
            recebido: "nao",
            obs: ""})
          // this.notas.push({
          //   contrato: doc.numeroContrato,
          //   competencia: mesSeguinte1,
          //   dataVencimento: `${doc.dataVencimento}/${mesSeguinte1}/${ano}`,
          //   valor: 0,
          //   recebido: "nao",
          //   obs: ""
          // })
        }
        busca = false
        this.notas.find(nota => {
          if (nota.contrato === doc.numeroContrato && (mesSeguinte2) == nota.competencia)
            busca = true
        })
        if (!busca) {
          this.fs.addNotaDoc({contrato: doc.numeroContrato,
            competencia: mesSeguinte2,
            dataVencimento: `${doc.dataVencimento}/${mesSeguinte2}/${anoSeguinte}`,
            valor: 0,
            recebido: "nao",
            obs: ""})
          // this.notas.push({
          //   contrato: doc.numeroContrato,
          //   competencia: mesSeguinte2,
          //   dataVencimento: `${doc.dataVencimento}/${mesSeguinte2}/${anoSeguinte}`,
          //   valor: 0,
          //   recebido: "nao",
          //   obs: ""
          // })
        }
      } else if (mes == 12) {
        mesSeguinte1 = 1
        mesSeguinte2 = 2
        console.log("12.", mes)
        busca = false
        this.notas.find(nota => {
          if (nota.contrato === doc.numeroContrato && (mesAnterior) == nota.competencia)
            busca = true
        })
        if (!busca) {
          this.fs.addNotaDoc({contrato: doc.numeroContrato,
            competencia: mesAnterior,
            dataVencimento: `${doc.dataVencimento}/${mesAnterior}/${ano}`,
            valor: 0,
            recebido: "nao",
            obs: ""})
          // this.notas.push({
          //   contrato: doc.numeroContrato,
          //   competencia: mesAnterior,
          //   dataVencimento: `${doc.dataVencimento}/${mesAnterior}/${ano}`,
          //   valor: 0,
          //   recebido: "nao",
          //   obs: ""
          // })
        }
        busca = false
        this.notas.find(nota => {
          if (nota.contrato === doc.numeroContrato && (mes) == nota.competencia)
            busca = true
        })
        if (!busca) {
          this.fs.addNotaDoc({contrato: doc.numeroContrato,
            competencia: mes,
            dataVencimento: `${doc.dataVencimento}/${mes}/${ano}`,
            valor: 0,
            recebido: "nao",
            obs: ""})
          // this.notas.push({
          //   contrato: doc.numeroContrato,
          //   competencia: mes,
          //   dataVencimento: `${doc.dataVencimento}/${mes}/${ano}`,
          //   valor: 0,
          //   recebido: "nao",
          //   obs: ""
          // })
        }
        busca = false
        this.notas.find(nota => {
          if (nota.contrato === doc.numeroContrato && (mesSeguinte1) == nota.competencia)
            busca = true
        })
        if (!busca) {
          this.fs.addNotaDoc({contrato: doc.numeroContrato,
            competencia: mesSeguinte1,
            dataVencimento: `${doc.dataVencimento}/${mesSeguinte1}/${anoSeguinte}`,
            valor: 0,
            recebido: "nao",
            obs: ""})
          // this.notas.push({
          //   contrato: doc.numeroContrato,
          //   competencia: mesSeguinte1,
          //   dataVencimento: `${doc.dataVencimento}/${mesSeguinte1}/${anoSeguinte}`,
          //   valor: 0,
          //   recebido: "nao",
          //   obs: ""
          // })
        }
        busca = false
        this.notas.find(nota => {
          if (nota.contrato === doc.numeroContrato && (mesSeguinte2) == nota.competencia)
            busca = true
          
        })
        if (!busca) {
          this.fs.addNotaDoc({contrato: doc.numeroContrato,
            competencia: mesSeguinte2,
            dataVencimento: `${doc.dataVencimento}/${mesSeguinte2}/${anoSeguinte}`,
            valor: 0,
            recebido: "nao",
            obs: ""})
          // this.notas.push({
          //   contrato: doc.numeroContrato,
          //   competencia: mesSeguinte2,
          //   dataVencimento: `${doc.dataVencimento}/${mesSeguinte2}/${anoSeguinte}`,
          //   valor: 0,
          //   recebido: "nao",
          //   obs: ""
          // })
        }
      }

    })
    this.notas.sort((a, b) => { return a.competencia - b.competencia })
  }

  ngAfterViewInit() {
    //this.load()
    
  }

  load(){
    // console.log("load")
    this.dataSource = new MatTableDataSource(this.notas);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
