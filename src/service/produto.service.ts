import { ProdutoRepository } from "../repository/produto.repository";
import { iProduto, Produto } from "../models/produto.model";
import { ResultSetHeader } from "mysql2";

export class ProdutoService {

    constructor(private repository = new ProdutoRepository()) { }

    async selecionarTodos(): Promise<iProduto[]> {
        return await this.repository.selectAll();
    }

    async selecionarPorId(id: number): Promise<iProduto | null> {
        return await this.repository.selectById(id);
    }

    async inserir(nome: string, preco: number, id_categoria: number, vinculo_imagem: string): Promise<number> {
        const produto = Produto.criar(nome, preco, id_categoria, vinculo_imagem)
        const id = await this.repository.insert(
            produto.Nome,
            produto.Preco,
            produto.IdCategoria,
            produto.VinculoImagem);

        return id;
    }

    async atualizar(id: number, nome: string, preco: number, id_categoria: number): Promise<ResultSetHeader> {
        const produtoAtual = await this.repository.selectById(id);

        if (!produtoAtual) {
            throw new Error("Produto não encontrado");
        }

        const produto = Produto.editar(
            nome ?? produtoAtual.nome,
            preco ?? produtoAtual.preco,
            id_categoria ?? produtoAtual.id_categoria,
            id
        )

        const resultado = await this.repository.update(produto.Id!, produto.Nome, produto.Preco, produto.IdCategoria);
        return resultado;
    }

    async deletar(id: number): Promise<ResultSetHeader> {

        const result = await this.repository.delete(id);

        if (result.affectedRows === 0) {
            throw new Error("Produto não encontrado");
        }

        return result;
    }

}