import { RowDataPacket } from "mysql2";

export interface iCliente extends RowDataPacket {
    id_vendedor?: number;
    nome?: string;
    email?: string;
}

export class Cliente {
    private _id_vendedor?: number;
    private _nome: string = '';
    private _email: string = ''

    constructor(nome: string, email: string, id?: number) {
        this.Nome = nome;
        this.Email = email;
        this._id_vendedor = id;
    }

    // Getters
    public get Id(): number | undefined {
        return this._id_vendedor;
    }

    public get Nome(): string {
        return this._nome;
    }

    public get Email(): string {
        return this._email;
    }

    // Setters
    public set Nome(value: string) {
        this._validarNome(value);
        this._nome = value;
    }

    public set Email(value: string) {
        this._validarEmail(value);
        this._email = value;
    }

    // Factory
    public static criar(nome: string, email: string): Cliente {
        return new Cliente(nome, email);
    }

    public static editar(nome: string, email: string, id: number): Cliente {
        return new Cliente(nome, email, id);
    }

    private _validarNome(value: string): void {
        if (!value || value.trim().length < 3) {
            throw new Error("Nome do cliente deve ter pelo menos 3 caracteres");
        }

        if (value.trim().length > 100) {
            throw new Error("Nome do cliente deve ter no máximo 100 caracteres");
        }

        if (!value || value.trim() === "") {
            throw new Error("O nome do cliente é obrigatório");
        }
    }

    private _validarEmail(value: string): void {
        if (!value || value.trim().length < 3) {
            throw new Error("Email deve ter pelo menos 3 caracteres");
        }

        if (value.trim().length > 100) {
            throw new Error("Email deve ter no máximo 100 caracteres");
        }

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value && !regexEmail.test(value)) {
            throw new Error("Email inválido");
        }
    }
}