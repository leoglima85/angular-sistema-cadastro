import { FireauthservService } from './../../services/fireauthserv.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Generico } from 'src/app/models/generico';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
@Component({
  selector: 'app-consulta',
  styleUrls: ['./consulta.component.css'],
  templateUrl: './consulta.component.html',
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
})
export class ConsultaComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nome', 'condominio'];
  dataSource2!: MatTableDataSource<Generico>;
  dataSourceTemp!: MatTableDataSource<Generico>;
  lista: string[] = [
    'Condomínio',
    'Funcionário',
    'Fornecedor',
    'Condômino',
    'Outros',
  ];
  escolha: string = '';
  public tipo: string = '';
  perfil = '';
  expandedElement: any = {};

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fs: FirestoreService,
              public dialog: MatDialog,
              private fas : FireauthservService ) {}

  async ngOnInit() {

  }

  ngAfterViewInit() {
    this.perfil = this.fas.perfil;
    //console.log("perfil no consulta:",this.perfil)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    let words = [];
    this.dataSource2.data = this.dataSourceTemp.data;
    words = filterValue.split(' ');
    words.map((word) => {
      this.dataSource2.filter = word.trim().toLowerCase();
      this.dataSource2.data = this.dataSource2.filteredData;
      if (this.dataSource2.paginator) {
        this.dataSource2.paginator.firstPage();
      }
    });
  }

  async filtrar(opt: string) {
    await this.fs.getConsultaDocs(opt);
    this.dataSource2 = new MatTableDataSource(this.fs.itens);
    this.dataSourceTemp = new MatTableDataSource(this.fs.itens);
    this.dataSource2.paginator = this.paginator;
    this.dataSource2.sort = this.sort;
  }

  openDialog(base: string, id: string) {
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        await this.fs.deleteDoc(base, id);
        this.filtrar(this.escolha);
      }
    });
  }
}
