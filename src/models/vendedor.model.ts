import { RowDataPacket } from "mysql2";

export interface iVendedor extends RowDataPacket {
    id_vendedor?: number;
    nome?: string;
}

export class Vendedor {
    private _id_vendedor?: number;
    private _nome: string = '';

    constructor(nome: string, id?: number) {
        this.Nome = nome;
        this._id_vendedor = id;
    }

    // Getters
    public get Id(): number | undefined {
        return this._id_vendedor;
    }

    public get Nome(): string {
        return this._nome;
    }

    // Setters
    public set Nome(value: string) {
        this._validarNome(value);
        this._nome = value;
    }

    // Factory
    public static criar(nome: string): Vendedor {
        return new Vendedor(nome);
    }

    public static editar(nome: string, id: number): Vendedor {
        return new Vendedor(nome, id);
    }

    private _validarNome(value: string): void {
        if (!value || value.trim().length < 3) {
            throw new Error("Nome do vendedor deve ter pelo menos 3 caracteres");
        }

        if (value.trim().length > 100) {
            throw new Error("Nome do vendedor deve ter no máximo 100 caracteres");
        }
    }
}