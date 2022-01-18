import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Generico } from 'src/app/models/generico';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-consulta',
  styleUrls: ['./consulta.component.css'],
  templateUrl: './consulta.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ConsultaComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nome'];
  dataSource2!: MatTableDataSource<Generico>;
  lista: string[] = ['Condomínio', 'Funcionário', 'Fornecedor', 'Condômino', 'Outros'];
  escolha: string = "";
  public tipo : string = "";
  expandedElement: Generico = {
    id: '', nome: '', conta: '', agencia: '', banco: '',
    chavepix: '', cnpj: '', conselhofiscal1: '', proprietariocpf:'', locatariocpf: '',
    conselhofiscal2: '', conselhofiscal3: '', 
    cpfconselhofiscal1: '', cpfconselhofiscal2: '',
    cpfconselhofiscal3: '', cpfsindico: '', email: '',
    endereco: '', operacao: '', pix: '', sindico: '',
    telefone: '', unidade: '', apelido: '', titular: '',
    locatario: '', condominio: '', observacao: '', 
    servicosPrestados: '', cpf: '', admissao: '', cargo: '',
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fs: FirestoreService,
              public dialog: MatDialog
              ) 
      {

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

  async filtrar(opt: string) {
    await this.fs.getConsultaDocs(opt);
    this.dataSource2 = new MatTableDataSource(this.fs.itens);
    this.dataSource2.paginator = this.paginator;
    this.dataSource2.sort = this.sort;

  }

  opcao(banco:string, cargo: string) {
    //console.log(banco,cargo)
    if (banco) {this.tipo = "banco"}
    if (cargo) {this.tipo = "cargo"}
  }

  deletarDoc(base:string, id:string){
    //alert("Tem certeza que deseja deletar esse registro ?")
    //this.fs.deleteDoc(base,id);
  }

  openDialog() {
    //this.dialog.open();
  }

}
