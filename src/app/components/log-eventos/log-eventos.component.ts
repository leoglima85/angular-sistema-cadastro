import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FirestoreService } from 'src/app/services/firestore.service';
import { MatPaginator } from '@angular/material/paginator';
import { Generico } from 'src/app/models/generico';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-log-eventos',
  templateUrl: './log-eventos.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
  styleUrls: ['./log-eventos.component.css'],
})
export class LogEventosComponent implements OnInit {
  listaLogs: any[] = [];
  displayedColumns: string[] = ['data', 'usuarioNome', 'tipo', 'tabela'];
  dataSource!: MatTableDataSource<any>;
  expandedElement: Generico = {
    id: '',
    nome: '',
    conta: '',
    agencia: '',
    banco: '',
    chavepix: '',
    cnpj: '',
    conselhofiscal1: '',
    proprietariocpf: '',
    locatariocpf: '',
    conselhofiscal2: '',
    conselhofiscal3: '',
    cpfconselhofiscal1: '',
    cpfconselhofiscal2: '',
    cpfconselhofiscal3: '',
    cpfsindico: '',
    email: '',
    endereco: '',
    operacao: '',
    pix: '',
    sindico: '',
    telefone: '',
    unidade: '',
    apelido: '',
    titular: '',
    locatario: '',
    condominio: '',
    observacao: '',
    servicosPrestados: '',
    cpf: '',
    admissao: '',
    cargo: '',
    filiacaomae: '',
    pis: '',
    rg: '',
    nascimento: '',
    filiacaopai: '',
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fs: FirestoreService) {}

  async ngOnInit() {
    await this.fs.getLogsDocs();
    this.listaLogs = this.fs.listaLogs;
    //console.log(this.listaLogs)
    this.dataSource = new MatTableDataSource(this.listaLogs);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: any, filter) => {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    };

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
