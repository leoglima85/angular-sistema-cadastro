import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from '@firebase/util';
import { Condominio } from 'src/app/models/condominio.model';
import { FirestoreService } from 'src/app/services/firestore.service';

export interface UserData {
  nome: string;
  telefone: string;
  sindico: string;
}

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nome', 'email', 'telefone', 'editar'];
  dataSource!: MatTableDataSource<UserData>;
  dataSource2!: MatTableDataSource<Condominio>;
  lista : string[] = ['Condominio','Funcionario','Fornecedor','Condomino'];
  escolha: string = "";
  //itens!: Promise<Condominio[]> ;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fs : FirestoreService) {
    // Create 100 users
    //const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));
    //const users = [{ nome: "", telefone: "", sindico: "" }];

    // Assign the data to the data source for the table to render
    //this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();

    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }

  filtrar(opt : string){
    
    console.log(opt);
    this.fs.getConsultaDocs(opt);
    console.log("this itens: ",this.fs.itens);
    this.dataSource2 = new MatTableDataSource(this.fs.itens);
    this.dataSource2.paginator = this.paginator;
    this.dataSource2.sort = this.sort;
    console.log("DTS2: ",this.dataSource2.data);
  }

  
}