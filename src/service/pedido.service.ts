import { PedidoRepository } from "../repository/pedido.repository";
import { iPedido, Pedido } from "../models/pedido.model";
import { ResultSetHeader } from "mysql2";

export class PedidoService {

    constructor(private repository = new PedidoRepository()) { }

    async selecionarTodos(): Promise<iPedido[]> {
        return await this.repository.selectAll();
    }

    async selecionarPorId(id: number): Promise<iPedido | null> {
        return await this.repository.selectById(id);
    }

    async inserir(id_cliente: number, id_vendedor: number): Promise<number> {
        const pedido = Pedido.criar(id_cliente, id_vendedor);
        const id = await this.repository.insert(
            pedido.IdCliente,
            pedido.IdVendedor
        );
        return id;
    }

    async atualizar(id: number, id_cliente?: number, id_vendedor?: number): Promise<ResultSetHeader> {
        const pedidoAtual = await this.repository.selectById(id);

        if (!pedidoAtual) {
            throw new Error("Pedido não encontrado");
        }

        const pedido = Pedido.editar(
            id_cliente ?? pedidoAtual.id_cliente!,
            id_vendedor ?? pedidoAtual.id_vendedor!,
            pedidoAtual.valor_final!,
            id
        );

        const resultado = await this.repository.update(
            pedido.Id!,
            pedido.IdCliente,
            pedido.IdVendedor,
            pedido.ValorFinal
        );

        return resultado;
    }

    async deletar(id: number): Promise<ResultSetHeader> {

        const result = await this.repository.delete(id);

        if (result.affectedRows === 0) {
            throw new Error("Pedido não encontrado");
        }

        return result;
    }
    
}