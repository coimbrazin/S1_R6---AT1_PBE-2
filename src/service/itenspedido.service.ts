import { ItensPedidoRepository } from "../repository/itenspedido.repository";
import { PedidoRepository } from "../repository/pedido.repository";
import { ProdutoRepository } from "../repository/produto.repository";
import { ResultSetHeader } from "mysql2";
import { ItemPedido } from "../models/itenspedido.model";

export class ItensPedidoService {

  constructor(
    private repository = new ItensPedidoRepository(),
    private produtoRepo = new ProdutoRepository(),
    private pedidoRepo = new PedidoRepository()
  ) { }

  async listarPorPedido(id_pedido: number) {
    return await this.repository.selectByPedido(id_pedido);
  }

  async inserir(id_pedido: number, id_produto: number, quantidade: number): Promise<number> {
    const pedido = await this.pedidoRepo.selectById(id_pedido);

    if (!pedido) {
      throw new Error("Pedido não encontrado");
    }

    const produto = await this.produtoRepo.selectById(id_produto);

    if (!produto) {
      throw new Error("Produto não encontrado");
    }

    if (produto.preco === undefined) {
      throw new Error("Preço do produto não encontrado");
    }

    const item = ItemPedido.criar(
      id_pedido,
      id_produto,
      quantidade,
      produto.preco
    );

    const id = await this.repository.insert(
      item.IdPedido,
      item.IdProduto,
      item.Quantidade,
      item.PrecoUnitario
    );

    const total = await this.pedidoRepo.calcularValorPedido(id_pedido);
    await this.pedidoRepo.atualizarValorFinal(id_pedido, total);

    return id;
  }

  async atualizar(id: number, quantidade?: number): Promise<ResultSetHeader> {
    const itemAtual = await this.repository.selectById(id);

    if (!itemAtual) {
      throw new Error("Item não encontrado");
    }

    const item = ItemPedido.editar(
      itemAtual.id_pedido!,
      itemAtual.id_produto!,
      quantidade ?? itemAtual.quantidade!,
      itemAtual.preco_unitario!,
      id
    );

    const result = await this.repository.update(
      item.Id!,
      item.Quantidade,
      item.PrecoUnitario
    );

    const total = await this.pedidoRepo.calcularValorPedido(item.IdPedido);
    await this.pedidoRepo.atualizarValorFinal(item.IdPedido, total);

    return result;
  }

  async deletar(
    id_item: number,
    id_pedido: number
  ): Promise<ResultSetHeader> {

    const result = await this.repository.delete(id_item);

    if (result.affectedRows === 0) {
      throw new Error("Item não encontrado");
    }

    const total = await this.pedidoRepo.calcularValorPedido(id_pedido);
    await this.pedidoRepo.atualizarValorFinal(id_pedido, total);

    return result;
  }
}