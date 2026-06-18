import { ResultSetHeader } from "mysql2";
import { iCliente, Cliente } from "../models/cliente.model";
import { ClienteRepository } from "../repository/cliente.repository";

export class ClienteService {

  constructor(private repository = new ClienteRepository()) { }

  async selecionarTodos(): Promise<iCliente[]> {
    return await this.repository.selectAll();
  }

  async selecionarPorId(id: number): Promise<iCliente | null> {
    return await this.repository.selectById(id);
  }

  async inserir(nome: string, email: string): Promise<number> {
    if (!nome || nome.trim() === "") {
      throw new Error("O nome do cliente é obrigatório");
    }
    const cliente = Cliente.criar(nome, email);
    const id = await this.repository.insert(
      cliente.Nome,
      cliente.Email
    )
    return id;
  }

  async atualizar(id: number, nome: string, email: string): Promise<ResultSetHeader> {
    const clienteAtual = await this.repository.selectById(id);

    if (!clienteAtual) {
      throw new Error("Cliente não encontrado");
    }

    const cliente = Cliente.editar(
      nome ?? clienteAtual.nome,
      email ?? clienteAtual.email,
      id
    )

    const resultado = await this.repository.update(
      cliente.Id!,
      cliente.Nome,
      cliente.Email
    );
    return resultado;
  }

  async deletar(id: number): Promise<ResultSetHeader> {
    const result = await this.repository.delete(id);
    if (result.affectedRows === 0) {
      throw new Error("Cliente não encontrado");
    }
    return result;
  }

}