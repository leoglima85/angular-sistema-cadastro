import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FirestoreService } from 'src/app/services/firestore.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-controle',
  templateUrl: './controle.component.html',
  styleUrls: ['./controle.component.css']
})
export class ControleComponent implements OnInit {
  displayedColumns: string[] = ['contrato', 'condominio', 'servico', 'competencia', 'dataVencimento', 'valor', 'recebido', 'nota'];
  dataSource!: MatTableDataSource<any>;
  dataSourceTemp!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  listaContratos: any[] = [];
  listaServicos: any[] = [];
  listaCondominios: any[] = [];
  listaFornecedores: any[] = [];
  buscaForm: FormGroup;
  notas: any[] = [];
  meses = [{mes:'Janeiro', codigo: 1},{mes:'Fevereiro', codigo: 2},{mes:'Março', codigo: 3},
          {mes:'Abril', codigo: 4},{mes:'Maio', codigo: 5},{mes:'Junho', codigo: 6},
          {mes:'Julho', codigo: 7},{mes:'Agosto', codigo: 8},{mes:'Setembro', codigo: 91},
          {mes:'Outubro', codigo: 10},{mes:'Novembro', codigo: 11},{mes:'Dezembro', codigo: 12},]

  constructor(private fs: FirestoreService,
              private dialog: MatDialog,
              private fb: FormBuilder,) 
    {
      this.buscaForm = this.fb.group({
        condominio:  [''],
        fornecedor: [''],
        servico:  [''],
        mes:  [''],
        recebido:  [''],
        
      });
    }

  async ngOnInit(): Promise<void> {
    await this.fs.getContratosDocs()
    await this.fs.getNotasDocs()
    await this.fs.getCondominioDocs();
    await this.fs.getServicosDocs();
    await this.fs.getFornecedoresDocs();
    this.listaCondominios = this.fs.listaCondominios;
    this.listaServicos = this.fs.listaServicos;
    this.listaFornecedores = this.fs.listaFornecedores;
    this.listaContratos = this.fs.listaContratos
    this.notas = this.fs.listaNotas
    
    let busca = false
    let mes = new Date().getMonth() + 1
    let mesAnterior = mes - 1
    let mesSeguinte1 = mes + 1
    let mesSeguinte2 = mes + 2
    const ano = new Date().getFullYear()
    let anoAnterior = ano - 1
    let anoSeguinte = ano + 1
    this.listaContratos.forEach(doc => {
      if (doc.periodicidade == "Anual") {
        busca = false
        this.notas.find(nota => {
          if (nota.contrato === doc.numeroContrato && doc.dataVencimento == nota.competencia)
            busca = true
        })
        if (!busca) {
          console.log("cadastrar nota anual ", busca)
          this.fs.addNotaDoc({
            contrato: doc.numeroContrato,
            condominio: doc.condominio,
            servico: doc.nome,
            competencia: doc.dataVencimento,
            dataVencimento: `${doc.dataVencimento}/${doc.dataVencimento}/${ano}`,
            valor: 0,
            recebido: "nao",
            obs: ""
          })
        }
      } else {
        // console.log("doc Mensal")
        if (mes > 1 && mes < 11) {
          // console.log(">1<11.", mes)
          busca = false
          this.notas.find(nota => {
            if (nota.contrato === doc.numeroContrato && (mesAnterior) == nota.competencia)
              busca = true
          })
          if (!busca) {
            this.fs.addNotaDoc({
              contrato: doc.numeroContrato,
              condominio: doc.condominio,
              servico: doc.nome,
              competencia: mesAnterior,
              dataVencimento: `${doc.dataVencimento}/${mesAnterior}/${ano}`,
              valor: 0,
              recebido: "nao",
              obs: ""
            })

          }
          busca = false
          this.notas.find(nota => {
            if (nota.contrato === doc.numeroContrato && (mes) == nota.competencia)
              busca = true
          })
          if (!busca) {
            this.fs.addNotaDoc({
              contrato: doc.numeroContrato,
              condominio: doc.condominio,
              servico: doc.nome,
              competencia: mes,
              dataVencimento: `${doc.dataVencimento}/${mes}/${ano}`,
              valor: 0,
              recebido: "nao",
              obs: ""
            })

          }
          busca = false
          this.notas.find(nota => {
            if (nota.contrato === doc.numeroContrato && (mesSeguinte1) == nota.competencia)
              busca = true
          })
          if (!busca) {
            this.fs.addNotaDoc({
              contrato: doc.numeroContrato,
              condominio: doc.condominio,
              servico: doc.nome,
              competencia: mesSeguinte1,
              dataVencimento: `${doc.dataVencimento}/${mesSeguinte1}/${ano}`,
              valor: 0,
              recebido: "nao",
              obs: ""
            })

          }
          busca = false
          this.notas.find(nota => {
            if (nota.contrato === doc.numeroContrato && (mesSeguinte2) == nota.competencia)
              busca = true
          })
          if (!busca) {
            this.fs.addNotaDoc({
              contrato: doc.numeroContrato,
              condominio: doc.condominio,
              servico: doc.nome,
              competencia: mesSeguinte2,
              dataVencimento: `${doc.dataVencimento}/${mesSeguinte2}/${ano}`,
              valor: 0,
              recebido: "nao",
              obs: ""
            })

          }
        } else if (mes == 1) {
          mesAnterior = 12
          mesSeguinte1 = 2
          mesSeguinte2 = 3
          // console.log("1.", mes)
          busca = false
          this.notas.find(nota => {
            if (nota.contrato === doc.numeroContrato && (mesAnterior) == nota.competencia)
              busca = true
          })
          if (!busca) {
            this.fs.addNotaDoc({
              contrato: doc.numeroContrato,
              condominio: doc.condominio,
              servico: doc.nome,
              competencia: mesAnterior,
              dataVencimento: `${doc.dataVencimento}/${mesAnterior}/${anoAnterior}`,
              valor: 0,
              recebido: "nao",
              obs: ""
            })

          }
          busca = false
          this.notas.find(nota => {
            if (nota.contrato === doc.numeroContrato && (mes) == nota.competencia)
              busca = true
          })
          if (!busca) {
            this.fs.addNotaDoc({
              contrato: doc.numeroContrato,
              condominio: doc.condominio,
              servico: doc.nome,
              competencia: mes,
              dataVencimento: `${doc.dataVencimento}/${mes}/${ano}`,
              valor: 0,
              recebido: "nao",
              obs: ""
            })

          }
          busca = false
          this.notas.find(nota => {
            if (nota.contrato === doc.numeroContrato && (mesSeguinte1) == nota.competencia)
              busca = true
          })
          if (!busca) {
            this.fs.addNotaDoc({
              contrato: doc.numeroContrato,
              condominio: doc.condominio,
              servico: doc.nome,
              competencia: mesSeguinte1,
              dataVencimento: `${doc.dataVencimento}/${mesSeguinte1}/${ano}`,
              valor: 0,
              recebido: "nao",
              obs: ""
            })

          }
          busca = false
          this.notas.find(nota => {
            if (nota.contrato === doc.numeroContrato && (mesSeguinte2) == nota.competencia)
              busca = true
          })
          if (!busca) {
            this.fs.addNotaDoc({
              contrato: doc.numeroContrato,
              condominio: doc.condominio,
              servico: doc.nome,
              competencia: mesSeguinte2,
              dataVencimento: `${doc.dataVencimento}/${mesSeguinte2}/${ano}`,
              valor: 0,
              recebido: "nao",
              obs: ""
            })

          }
        } else if (mes == 11) {
          mesSeguinte2 = 1
          // console.log("11.", mes)
          busca = false
          this.notas.find(nota => {
            if (nota.contrato === doc.numeroContrato && (mesAnterior) == nota.competencia)
              busca = true
          })
          if (!busca) {
            this.fs.addNotaDoc({
              contrato: doc.numeroContrato,
              condominio: doc.condominio,
              servico: doc.nome,
              competencia: mesAnterior,
              dataVencimento: `${doc.dataVencimento}/${mesAnterior}/${ano}`,
              valor: 0,
              recebido: "nao",
              obs: ""
            })

          }
          busca = false
          this.notas.find(nota => {
            if (nota.contrato === doc.numeroContrato && (mes) == nota.competencia)
              busca = true
          })
          if (!busca) {
            this.fs.addNotaDoc({
              contrato: doc.numeroContrato,
              condominio: doc.condominio,
              servico: doc.nome,
              competencia: mes,
              dataVencimento: `${doc.dataVencimento}/${mes}/${ano}`,
              valor: 0,
              recebido: "nao",
              obs: ""
            })

          }
          busca = false
          this.notas.find(nota => {
            if (nota.contrato === doc.numeroContrato && (mesSeguinte1) == nota.competencia)
              busca = true
          })
          if (!busca) {
            this.fs.addNotaDoc({
              contrato: doc.numeroContrato,
              condominio: doc.condominio,
              servico: doc.nome,
              competencia: mesSeguinte1,
              dataVencimento: `${doc.dataVencimento}/${mesSeguinte1}/${ano}`,
              valor: 0,
              recebido: "nao",
              obs: ""
            })

          }
          busca = false
          this.notas.find(nota => {
            if (nota.contrato === doc.numeroContrato && (mesSeguinte2) == nota.competencia)
              busca = true
          })
          if (!busca) {
            this.fs.addNotaDoc({
              contrato: doc.numeroContrato,
              condominio: doc.condominio,
              servico: doc.nome,
              competencia: mesSeguinte2,
              dataVencimento: `${doc.dataVencimento}/${mesSeguinte2}/${anoSeguinte}`,
              valor: 0,
              recebido: "nao",
              obs: ""
            })

          }
        } else if (mes == 12) {
          mesSeguinte1 = 1
          mesSeguinte2 = 2
          // console.log("12.", mes)
          busca = false
          this.notas.find(nota => {
            if (nota.contrato === doc.numeroContrato && (mesAnterior) == nota.competencia)
              busca = true
          })
          if (!busca) {
            this.fs.addNotaDoc({
              contrato: doc.numeroContrato,
              condominio: doc.condominio,
              servico: doc.nome,
              competencia: mesAnterior,
              dataVencimento: `${doc.dataVencimento}/${mesAnterior}/${ano}`,
              valor: 0,
              recebido: "nao",
              obs: ""
            })

          }
          busca = false
          this.notas.find(nota => {
            if (nota.contrato === doc.numeroContrato && (mes) == nota.competencia)
              busca = true
          })
          if (!busca) {
            this.fs.addNotaDoc({
              contrato: doc.numeroContrato,
              condominio: doc.condominio,
              servico: doc.nome,
              competencia: mes,
              dataVencimento: `${doc.dataVencimento}/${mes}/${ano}`,
              valor: 0,
              recebido: "nao",
              obs: ""
            })

          }
          busca = false
          this.notas.find(nota => {
            if (nota.contrato === doc.numeroContrato && (mesSeguinte1) == nota.competencia)
              busca = true
          })
          if (!busca) {
            this.fs.addNotaDoc({
              contrato: doc.numeroContrato,
              condominio: doc.condominio,
              servico: doc.nome,
              competencia: mesSeguinte1,
              dataVencimento: `${doc.dataVencimento}/${mesSeguinte1}/${anoSeguinte}`,
              valor: 0,
              recebido: "nao",
              obs: ""
            })

          }
          busca = false
          this.notas.find(nota => {
            if (nota.contrato === doc.numeroContrato && (mesSeguinte2) == nota.competencia)
              busca = true

          })
          if (!busca) {
            this.fs.addNotaDoc({
              contrato: doc.numeroContrato,
              condominio: doc.condominio,
              servico: doc.nome,
              competencia: mesSeguinte2,
              dataVencimento: `${doc.dataVencimento}/${mesSeguinte2}/${anoSeguinte}`,
              valor: 0,
              recebido: "nao",
              obs: ""
            })

          }
        }
      }

    })
    this.notas.sort((a, b) => { return a.competencia - b.competencia })
    // this.load()
    setTimeout(() => {
      // this.dataSource = new MatTableDataSource(this.notas);
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
    }, 3000)


  }

  ngAfterViewInit() {

  }

  async setRecebido(row: any) {
    // console.log("teste",row)
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // this.dialog.open(DialogComponent, dialogConfig);

    if (row.recebido == "sim") {
      row.recebido = "nao"
    } else {
      row.recebido = "sim"
    }
    await this.fs.atualizaNotaDoc("Nota", row.notaID, row)
    // await this.ngOnInit()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    let words = [];
    this.dataSource.data = this.dataSourceTemp.data;
    words = filterValue.split(' ');
    words.map((word) => {
      this.dataSource.filter = word.trim().toLowerCase();
      this.dataSource.data = this.dataSource.filteredData;
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    });
  }

  filtros(){
    // console.log(this.buscaForm.value)
    // console.log(this.listaCondominios)
    let notas2 = this.notas
    if (this.buscaForm.value.condominio) {
      notas2 = notas2.filter(x => x.condominio == this.buscaForm.value.condominio);
    }
    if (this.buscaForm.value.servico) {
      notas2 = notas2.filter(x => x.servico == this.buscaForm.value.servico);
    }
    if (this.buscaForm.value.fornecedor) {
      notas2 = notas2.filter(x => x.fornecedor == this.buscaForm.value.fornecedor);
    }
    if (this.buscaForm.value.mes) {
      notas2 = notas2.filter(x => x.mes == this.buscaForm.value.mes);
    }
    if (this.buscaForm.value.recebido) {
      notas2 = notas2.filter(x => x.recebido == this.buscaForm.value.recebido);
    }

    // notas2 = this.notas.filter(x => x.condominio == this.buscaForm.value.condominio && 
    //                             x.recebido == this.buscaForm.value.recebido);
    // console.log( "notas2 ",notas2)
    notas2 = notas2.filter((el, i, a) => i === a.indexOf(el))
    // console.log( "notas2noDups ",notas2)
    this.dataSource = new MatTableDataSource(notas2);
    this.dataSourceTemp = new MatTableDataSource(notas2);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
