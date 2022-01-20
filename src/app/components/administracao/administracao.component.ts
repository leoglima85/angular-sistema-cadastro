import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirestoreService } from 'src/app/services/firestore.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-administracao',
  templateUrl: './administracao.component.html',
  styleUrls: ['./administracao.component.css']
})
export class AdministracaoComponent implements OnInit {
  fileName = 'BaseDeDados.xlsx';
  spinner = 0;

  constructor(private fs: FirestoreService,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  async exportarBase() {
    this.spinner = 5;
    this._snackBar.open("Carregando, aguarde!", "", { duration: 5000, panelClass: ["snack-vermelho"] });
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    await this.fs.carregarBaseCompleta();
    this.spinner = 10;
    await this.fs.getBancosDocs();
    this.spinner = 15;
    await this.fs.getCargosDocs();
    this.spinner = 20;
    await this.fs.getServicosDocs();
    this.spinner = 25;
    await this.fs.getLogsDocs();
    this.spinner = 30;
    const listaCondominios = this.fs.listaExportCondominios;
    const listaFuncionarios = this.fs.listaExportFuncionarios;
    const listaFornecedores = this.fs.listaExportFornecedores;
    const listaCondominos = this.fs.listaExportCondominos;
    const listaServicos = this.fs.listaServicos;
    const listaBancos = this.fs.listaExportBancos;
    const listaCargos = this.fs.listaExportCargos;
    const listaUsers = this.fs.listaExportUsers;
    const listaLogs = this.fs.listaExportLogs;
    this.spinner = 35;
    const wsCondominios: XLSX.WorkSheet = XLSX.utils.json_to_sheet(listaCondominios);
    XLSX.utils.book_append_sheet(wb, wsCondominios, 'Condominios');
    this.spinner = 40;
    const wsFuncionarios: XLSX.WorkSheet = XLSX.utils.json_to_sheet(listaFuncionarios);
    XLSX.utils.book_append_sheet(wb, wsFuncionarios, 'Funcionarios');
    this.spinner = 45;
    const wscFornecedores: XLSX.WorkSheet = XLSX.utils.json_to_sheet(listaFornecedores);
    XLSX.utils.book_append_sheet(wb, wscFornecedores, 'Fornecedores');
    this.spinner = 50;
    const wscondominos: XLSX.WorkSheet = XLSX.utils.json_to_sheet(listaCondominos);
    XLSX.utils.book_append_sheet(wb, wscondominos, 'Condominos');
    this.spinner = 60;
    const wsServicos: XLSX.WorkSheet = XLSX.utils.json_to_sheet(listaServicos);
    XLSX.utils.book_append_sheet(wb, wsServicos, 'Servicos');
    this.spinner = 70;
    const wsBancos: XLSX.WorkSheet = XLSX.utils.json_to_sheet(listaBancos);
    XLSX.utils.book_append_sheet(wb, wsBancos, 'Bancos');
    this.spinner = 75;
    const wsCargos: XLSX.WorkSheet = XLSX.utils.json_to_sheet(listaCargos);
    XLSX.utils.book_append_sheet(wb, wsCargos, 'Cargos');
    this.spinner = 80;
    const wsUsers: XLSX.WorkSheet = XLSX.utils.json_to_sheet(listaUsers);
    XLSX.utils.book_append_sheet(wb, wsUsers, 'Users');
    this.spinner = 90;
    const wsLogs: XLSX.WorkSheet = XLSX.utils.json_to_sheet(listaLogs);
    XLSX.utils.book_append_sheet(wb, wsLogs, 'Logs');
    /* save to file */
    
    this.spinner = 95;
    XLSX.writeFile(wb, this.fileName);
    this.spinner = 0;
  }

  
  
}
