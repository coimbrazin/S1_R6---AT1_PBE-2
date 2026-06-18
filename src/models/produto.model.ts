import { RowDataPacket } from "mysql2";

export interface iProduto extends RowDataPacket {
    id_produto?: number;
    nome?: string;
    preco?: number;
    id_categoria?: number;
    vinculo_imagem?: string;
}

export class Produto {
    private _id_produto?: number;
    private _nome: string = '';
    private _preco: number = 0;
    private _id_categoria: number = 0;
    private _vinculo_imagem: string = '';

    constructor(
        nome: string,
        preco: number,
        id_categoria: number,
        vinculo_imagem: string,
        id?: number
    ) {
        this.Nome = nome;
        this.Preco = preco;
        this.IdCategoria = id_categoria;
        this.VinculoImagem = vinculo_imagem;
        this._id_produto = id;
    }

    // GETTERS

    public get Id(): number | undefined {
        return this._id_produto;
    }

    public get Nome(): string {
        return this._nome;
    }

    public get Preco(): number {
        return this._preco;
    }

    public get IdCategoria(): number {
        return this._id_categoria;
    }

    public get VinculoImagem(): string {
        return this._vinculo_imagem;
    }

    // SETTERS

    public set Nome(value: string) {
        this._validarNome(value);
        this._nome = value;
    }

    public set Preco(value: number) {
        this._validarPreco(value);
        this._preco = value;
    }

    public set IdCategoria(value: number) {
        if (!value || value <= 0) {
            throw new Error("Categoria inválida");
        }

        this._id_categoria = value;
    }

    public set VinculoImagem(value: string) {
        this._vinculo_imagem = value
    }

    // FACTORY

    public static criar(nome: string, preco: number, id_categoria: number, vinculo_imagem: string): Produto {
        return new Produto(nome, preco, id_categoria, vinculo_imagem);
    }

    public static editar(nome: string, preco: number, id_categoria: number, id: number): Produto {
        return new Produto(nome, preco, id_categoria, '', id);
    }

    // VALIDAÇÕES

    private _validarNome(value: string): void {
        if (!value || value.trim().length < 3) {
            throw new Error("Nome do produto deve ter pelo menos 3 caracteres");
        }

        if (value.trim().length > 100) {
            throw new Error("Nome do produto deve ter no máximo 100 caracteres");
        }
    }

    private _validarPreco(value: number): void {
        if (!value || value <= 0) {
            throw new Error("Preço deve ser maior que zero");
        }
    }
}