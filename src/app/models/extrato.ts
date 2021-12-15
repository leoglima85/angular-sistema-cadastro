export interface Extrato {
    id?: string;
    conta : number;
    data_mov : Date;
    nr_doc : number;
    historico :string;
    valor : number;
    deb_cred :string;
    check : boolean;
}
