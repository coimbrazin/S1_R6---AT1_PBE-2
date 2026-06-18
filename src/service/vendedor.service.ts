import { ResultSetHeader } from "mysql2";
import { VendedorRepository } from "../repository/vendedor.repository";
import { iVendedor, Vendedor } from "../models/vendedor.model";

export class VendedorService {

    constructor(private repository = new VendedorRepository()) {}

    async selecionarTodos(): Promise<iVendedor[]> {
        return await this.repository.selectAll();
    }

    async selecionarPorId(id: number): Promise<iVendedor | null> {
        return await this.repository.selectById(id);
    }

    async inserir(nome: string): Promise<number> {
        if (!nome || nome.trim() === "") {
            throw new Error("O nome do vendedor é obrigatório");
        }

        const vendedor = Vendedor.criar(nome)
        const result = await this.repository.insert(vendedor.Nome);
        return result;
    }

    async atualizar(id: number, nome: string): Promise<ResultSetHeader> {
        if (!nome || nome.trim() === "") {
            throw new Error("O nome do vendedor é obrigatório");
        }

        const vendedor = Vendedor.editar(nome, id)
        const result = await this.repository.update(id, vendedor.Nome);
        if (result.affectedRows === 0) {
            throw new Error("Vendedor não encontrado");
        }
        return result;
    }

    async deletar(id: number): Promise<ResultSetHeader> {
        const result = await this.repository.delete(id);
        if (result.affectedRows === 0) {
            throw new Error("Vendedor não encontrado");
        }
        return result;
    }

}