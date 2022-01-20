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
    this._snackBar.open("Carregando, aguarde!", "", { duration: 5000, panelClass: ["snack-vermelho"] });
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    await this.fs.carregarBaseCompleta();
    await this.fs.getBancosDocs();
    await this.fs.getCargosDocs();
    await this.fs.getServicosDocs();
    await this.fs.getLogsDocs();
    const listaCondominios = this.fs.listaExportCondominios;
    const listaFuncionarios = this.fs.listaExportFuncionarios;
    const listaFornecedores = this.fs.listaExportFornecedores;
    const listaCondominos = this.fs.listaExportCondominos;
    const listaServicos = this.fs.listaServicos;
    const listaBancos = this.fs.listaExportBancos;
    const listaCargos = this.fs.listaExportCargos;
    const listaUsers = this.fs.listaExportUsers;
    const listaLogs = this.fs.listaExportLogs;

    const wsCondominios: XLSX.WorkSheet = XLSX.utils.json_to_sheet(listaCondominios);
    XLSX.utils.book_append_sheet(wb, wsCondominios, 'Condominios');
    const wsFuncionarios: XLSX.WorkSheet = XLSX.utils.json_to_sheet(listaFuncionarios);
    XLSX.utils.book_append_sheet(wb, wsFuncionarios, 'Funcionarios');
    const wscFornecedores: XLSX.WorkSheet = XLSX.utils.json_to_sheet(listaFornecedores);
    XLSX.utils.book_append_sheet(wb, wscFornecedores, 'Fornecedores');
    const wscondominos: XLSX.WorkSheet = XLSX.utils.json_to_sheet(listaCondominos);
    XLSX.utils.book_append_sheet(wb, wscondominos, 'Condominos');
    const wsServicos: XLSX.WorkSheet = XLSX.utils.json_to_sheet(listaServicos);
    XLSX.utils.book_append_sheet(wb, wsServicos, 'Servicos');
    const wsBancos: XLSX.WorkSheet = XLSX.utils.json_to_sheet(listaBancos);
    XLSX.utils.book_append_sheet(wb, wsBancos, 'Bancos');
    const wsCargos: XLSX.WorkSheet = XLSX.utils.json_to_sheet(listaCargos);
    XLSX.utils.book_append_sheet(wb, wsCargos, 'Cargos');
    const wsUsers: XLSX.WorkSheet = XLSX.utils.json_to_sheet(listaUsers);
    XLSX.utils.book_append_sheet(wb, wsUsers, 'Users');
    const wsLogs: XLSX.WorkSheet = XLSX.utils.json_to_sheet(listaLogs);
    XLSX.utils.book_append_sheet(wb, wsLogs, 'Logs');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  
  
}
