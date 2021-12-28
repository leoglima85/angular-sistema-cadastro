import { Condominio } from './../../models/condominio.model';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from '@firebase/util';
import {animate, state, style, transition, trigger} from '@angular/animations';

import { FirestoreService } from 'src/app/services/firestore.service';

export interface UserData {
  nome: string;
  telefone: string;
  sindico: string;
}

@Component({
  selector: 'app-consulta',
  styleUrls: ['./consulta.component.css'],
  templateUrl: './consulta.component.html',
  animations: [
      trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ConsultaComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nome'];
  dataSource!: MatTableDataSource<UserData>;
  dataSource2!: MatTableDataSource<Condominio>;
  lista : string[] = ['Condominio','Funcionario','Fornecedor','Condomino'];
  escolha: string = "";
  expandedElement: Condominio = {id: '',nome: '',conta: '',agencia: '',banco: '',chavepix: '',cnpj: '',conselhofiscal1: '',conselhofiscal2: '',conselhofiscal3: '',cpfconselhofiscal1: '',cpfconselhofiscal2: '',cpfconselhofiscal3: '',cpfsindico: '',email: '',endereco: '',operacao: '',pix: '',sindico: '',telefone: ''};

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  

  constructor(private fs : FirestoreService,
    private changeDetectorRefs: ChangeDetectorRef) 
    {
      //this.expandedElement = new Condominio{};
    }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();

    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }

  async filtrar(opt : string){
    
    //console.log(opt);
    await this.fs.getConsultaDocs(opt);
    //console.log("this itens: ",this.fs.itens);
    //this.dataSource2 = new MatTableDataSource;
    this.dataSource2 = new MatTableDataSource(this.fs.itens);

    //console.log("DTS2: ",this.dataSource2.data);
    this.dataSource2.paginator = this.paginator;
    this.dataSource2.sort = this.sort;
    
   
  }

  ngOnChanges() {
    console.log("on change");
  }


}
